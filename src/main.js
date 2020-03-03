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
import firebase from 'firebase'
Vue.prototype.$axios = axios;
Vue.prototype.$path = "http://206.189.206.157:8000/api/v1/";
firebase.initializeApp({
    apiKey: "AIzaSyDH3dwz1qkwMuU3Ol78H1XqAoE9BYGxYEM",
    authDomain: "congreso-57921.firebaseapp.com",
    databaseURL: "https://congreso-57921.firebaseio.com",
    projectId: "congreso-57921",
    storageBucket: "congreso-57921.appspot.com",
    messagingSenderId: "889114227047",
    appId: "1:889114227047:web:d9a1a28f4e04d6cebf7fc2",
    measurementId: "G-G7B5SM9B5E"
});
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
