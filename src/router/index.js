import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from '@/views/NotFound.vue'
import Home from '@/views/Inicio.vue'
import Estudiante from '@/views/Estudiante.vue'
import Personal from '@/views/Personal.vue'
import Evento from '@/views/Evento.vue'
Vue.use(VueRouter);
const routes = [{
    path: "/",
    name: "inicio",
    component: Home
},
{
    path: "/estudiante/vista/:congreso",
    name: "estudiante",
    component: Estudiante
},
{
    path: "/personal/vista/:congreso",
    name: "personal",
    component: Personal
},
{
    path: "/congreso/vista",
    name: "congresos",
    component: Evento
},

{
    path: "/error/:tipo",
    name:'error',
    component: NotFound
},
{
    path: "*",
    component: NotFound
}
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;