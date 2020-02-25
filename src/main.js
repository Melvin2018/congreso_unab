import Vue from "vue";
import Vuex from "vuex";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "@/plugins/vuetify";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.prototype.$axios = axios;
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.prototype.$path = "http://localhost:8000/api/v1/";
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2, options);
Vue.use(BootstrapVue);
Vue.use(vuetify);
Vue.use(Vuex);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
