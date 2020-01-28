import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [{
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
    }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;