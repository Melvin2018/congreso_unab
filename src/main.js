import Vue from "vue";
import Vuex from "vuex";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "@/plugins/vuetify";
Vue.prototype.$axios = axios;
Vue.prototype.$path = "http://206.189.206.157:8000/api/v1/";
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(vuetify);
Vue.use(Vuex);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
