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
    ],
    users: [
      {
        username: "Jelena",
        password: "jelena",
        isActive: false,
        id: 1
      },
      {
        username: "Dunja",
        password: "dunja",
        isActive: false,
        id: 2
      }
    ]
  },
  getters: {
    getInvoicesNumbers(state){
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
    },
    NEW_USER( state, user){
      const id = state.users.length +1;
      user.id = id;
      state.users.push(user);
    },
    EDIT_USER_STATE( state, username1){
      console.log(username1);
      const indexOfUser = state.users.findIndex( u => u.username == username1);
      console.log(indexOfUser);
      state.users[indexOfUser].isActive = !state.users[indexOfUser].isActive;
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
    },
    addNewUser({commit}, user ){
      commit('NEW_USER', user);
    },
    editUserActivation({commit}, username1){
      commit('EDIT_USER_STATE', username1);
    }
  },
  modules: {}
});
