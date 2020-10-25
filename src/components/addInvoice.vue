<template>
  <v-card :loading="loading" class="mx-auto my-12 card" max-width="500">
    <v-card-title>Add Invoice</v-card-title>
    <v-text-field v-model="invoiceForm.number" label="number"></v-text-field>
    <v-text-field v-model="invoiceForm.description" label="description"></v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="490px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="invoiceForm.date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          class="fields"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="invoiceForm.date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
        align="center"
        class="fields"
      ></v-date-picker>
    </v-menu>
    <v-text-field v-model="invoiceForm.amount" label="amount" class="fields"></v-text-field>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="addInvoice()">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

const invoiceFormEmpty = {
    number: '',
    description: '',
    date: null,
    amount: 0
}

export default {
  data() {
    return{
        menu: false,
        loading: false,
        selection: 1,
        invoiceForm: {
            ...invoiceFormEmpty
        }
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    addInvoice(){
        console.log(this.invoiceForm);
        this.$store.dispatch('addNewInvoice', this.invoiceForm);
        this.invoiceForm = { ...invoiceFormEmpty };
    }
  }
};
</script>

<style>
.card {
  height: 500px;
  background-color: blueviolet;
  margin-block: 10px;
}
.fields{
    margin-block: 10px;
    padding-block: 10px;
}
</style>
