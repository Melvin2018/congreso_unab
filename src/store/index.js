import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        carreras: [],
        regionales: []
    },

    mutations: {
        carreras: (state, nuevo) => {
            state.carreras = nuevo;
        },
        regionales: (state, nuevo) => {
            state.regionales = nuevo;
        }
    },
    actions: {},
    modules: {}
});