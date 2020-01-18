import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [{
        path: "/estudiante/vista",
        name: "estudiante",
        component: () =>
            import ("../views/Estudiante.vue")
    },
    {
        path: "/evento/vista",
        name: "evento",
        component: () =>
            import ("../views/Evento.vue")
    },
    {
        path: "/estudiante/importacion",
        name: "importacion",
        component: () =>
            import ("../components/Extractor_Estudiante.vue")
    },
    {
        path: "/evento/nuevo",
        name: "nuevoEvento",
        component: () =>
            import ("../components/Nuevo_Evento.vue")
    }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;