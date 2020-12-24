<template>
  <div>
    <addInvoice></addInvoice>
    <v-card class="mx-auto my-12 invoice-list">
        <v-text-field
            label="Search"
            v-model="search"
            @keydown="searchForInvoice()"
        ></v-text-field>
        <v-list dense v-if="!matchExists"
        style="max-height: 400px"
        class="overflow-y-auto"
        >
            <v-list-item
            v-for="(invoice, i) in invoices"
            :key="i"
            >
                <v-card v-if="deleteAlert" class="alertClass" outlined>
                    <p>Are you sure you want to delete invoice?</p>
                    <v-btn class="alertBtn" v-on:click="deleteInvoice(i)">Yes</v-btn>
                    <v-btn v-on:click="deleteAlert = !deleteAlert" class="alertBtn"> No </v-btn>
                </v-card>
                <v-list-item-content>
                   number: {{ invoice.number }} description: {{ invoice.description }}
                    <div class="mx-2">
                        <v-btn
                            color="primary"
                            depressed
                            small
                            v-on:click="deleteAlert = !deleteAlert"
                        >
                            <v-icon>
                            {{ icons.mdiDelete }}
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="primary"
                            @click="duplicateInvoice(i)"
                        >
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-card v-else>
            number: {{ this.matchedInvoice[0].number }} description: {{ this.matchedInvoice[0].description }}
        </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import addInvoice from "@/components/addInvoice.vue";
import { mdiDelete } from '@mdi/js';
import _ from 'lodash';

export default {
  components: {
    addInvoice
  },
  data(){
      return{
        duplicateId: 0,
        search: '',
        matchExists: false,
        matchedInvoice: [],
        deleteAlert: false,
        icons: {
            mdiDelete,
        }
      }
  },
  computed: {
      ...mapState({
          invoices: 'invoices'
      }),
       ...mapGetters(["getInvoicesNumbers"])
  },
  methods: {
        deleteInvoice( invoiceItem ){
          this.$store.dispatch('deleteInvoiceItem', invoiceItem );
          this.deleteAlert = !this.deleteAlert;
        },
        duplicateInvoice(i){
            this.duplicateId = this.invoices.length;
            while( this.getInvoicesNumbers.filter( p => p.number === this.duplicateId ).length !== 0 ){
                this.duplicateId += 1;
            }
            const duplicate = {...this.invoices[i]};
            duplicate.number = this.duplicateId;
            this.$store.dispatch('duplicateInvoiceItem', duplicate );
        },
        searchForInvoice: _.debounce( function() {
            const searchMatch = this.getInvoicesNumbers.filter( i => i.number == this.search);
            if( searchMatch.length ){
                this.matchExists = true;
                this.matchedInvoice = searchMatch;
            }else if( this.search == ''){
                this.matchExists = false;
            }
        },2000)
      
    }
};
</script>
<style scoped>
    .invoice-list{
        height: 500px;
        width: 500px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .alertClass{
        z-index: 500;
        width: 400px;
        height: 250px;
        position: fixed;
        bottom: 300px;
        left:200px;
        padding-left: 30px;
        padding-top: 60px;
        font-size: 20px;
        box-shadow: 0px 0px 10px #FF0000, 0px 0px 10px #0000FF;
    }
    .alertBtn{
        margin-left: 45px;
        margin-top: 25px;
        color: rgb(0, 0, 0);
    }
</style>
