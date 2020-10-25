<template>
  <div>
    <addInvoice></addInvoice>
    <v-card class="mx-auto my-12 invoice-list" >
        <v-list dense>
            <v-list-item
            v-for="(invoice, i) in invoices"
            :key="i"
            >
                <v-list-item-content>
                    {{ invoice }}
                    <div class="mx-2">
                        <v-btn
                            color="primary"
                            depressed
                        >
                            <v-icon left>
                            {{ icons.mdiDelete }}
                            </v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addInvoice from "@/components/addInvoice.vue";
import { mdiDelete } from '@mdi/js';

export default {
  components: {
    addInvoice
  },
  data(){
      return{
        icons: {
            mdiDelete,
        }
        //  list: [ 'jelena', 'marija', 'nikola']
      }
  },
  computed: {
      ...mapState({
          invoices: 'invoices'
      })
  }
};
</script>
<style scoped>
    .invoice-list{
        height: 400px;
        width: 500px;
    }
</style>
