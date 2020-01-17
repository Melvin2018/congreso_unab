import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "@/plugins/vuetify";
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(vuetify);
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");