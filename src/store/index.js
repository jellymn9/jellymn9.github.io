import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    invoices: [
      { number: 1,
      description: 'first invoice',
      date: '20.10.2020',
      amount: 5
      }
    ]
  },
  getters: {
    getInvoicesNumbers(state){
      console.log(state.invoices);
      return state.invoices;
    }
  },
  mutations: {
    NEW_INVOICE( state, invoiceItem ){
      state.invoices.push(invoiceItem);
    },
    DELETE_INVOICE( state, invoiceItem){
      state.invoices.splice( invoiceItem, 1 );
    },
    DUPLICATE_INVOICE( state, invoiceItem ){
      state.invoices.push(invoiceItem);
    }
  },
  actions: {
    addNewInvoice({commit}, invoiceItem ){
      commit('NEW_INVOICE', invoiceItem);
    },
    deleteInvoiceItem( {commit}, invoiceItem ){
      commit('DELETE_INVOICE', invoiceItem);
    },
    duplicateInvoiceItem({commit}, invoiceItem ){
      commit('DUPLICATE_INVOICE', invoiceItem );
    }
  },
  modules: {}
});
