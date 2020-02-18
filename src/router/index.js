import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from '@/views/NotFound.vue'
import Home from '@/views/Inicio.vue'
import Estudiante from '@/views/Estudiante.vue'
import Personal from '@/views/Personal.vue'
import Evento from '@/views/Evento.vue'
Vue.use(VueRouter);
const routes = [{
        path: "/inicio/vista",
        name: "inicio",
        component: () =>
            import ("../views/Inicio.vue")
    },
    {
        path: "/login/vista",
        name: "login",
        component: () =>
            import ("../views/Login.vue")
    },
    {
        path: "/prueba/vista",
        name: "prueba",
        component: () =>
            import ("../views/Prueba.vue")
    },
    {
        path: "/estudiante/vista/:congreso",
        name: "estudiante",
        component: () =>
            import ("../views/Estudiante.vue")
    },
    {
        path: "/personal/vista/:congreso",
        name: "personal",
        component: () =>
            import ("../views/Personal.vue")
    },
    {
        path: "/evento/vista",
        name: "evento",
        component: () =>
            import ("../views/Evento.vue")
    },
    {
        path: "/evento/nuevo",
        name: "nuevoEvento",
        component: () =>
            import ("../views/Nuevo_Evento.vue")
    },
    {
        path: "/estadisticas/vista",
        name: "estadisticas",
        component: () =>
            import ("../views/Estadisticas.vue")
    }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;