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
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueGoogleCharts from 'vue-google-charts'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.prototype.$axios = axios;
Vue.prototype.$path = "http://192.168.43.43:8000/api/v1/";
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueSweetalert2, options);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleCharts);
Vue.use(BootstrapVue);
Vue.use(vuetify);
Vue.use(Vuex);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
