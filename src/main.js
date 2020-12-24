import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import invoiceList from "@/components/invoiceList.vue";
import vuetify from "./plugins/vuetify";

Vue.component("invoice-list", invoiceList);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

