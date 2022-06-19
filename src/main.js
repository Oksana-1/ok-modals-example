import Vue from "vue";
import App from "./App.vue";
import ModalPlugin from "ok-modals";
Vue.use(ModalPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
