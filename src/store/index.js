import Vue from "vue";
import Vuex from "vuex";
import estudiante from './estudiante.js';
import personal from './personal.js';
import estadisticas from './estadisticas.js';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modalEvento: false,
        modalCarrera: false,
        exportar: false,
        congreso: {}
    },
    mutations: {},
    actions: {},
    modules: {
        estudiante,
        personal,
        estadisticas
    }
});