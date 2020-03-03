import Vue from "vue";
import Vuex from "vuex";
import estudiante from './estudiante.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalEvento: false,
    congreso:{}
  },
  mutations: {},
  actions: {},
  modules: {
    estudiante
  }
});
