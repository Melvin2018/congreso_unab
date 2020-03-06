<template>
  <v-app>
    <v-app-bar :clipped-left="true" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-layout justify-center>
        <v-toolbar-title>
          <h2>Administración de Congresos UNAB</h2>
        </v-toolbar-title>
      </v-layout>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :clipped="true" app width="14%" color="titulo">
      <v-list square>
        <v-subheader>
          <h1>MENÚ</h1>
        </v-subheader>
        <v-layout justify-center>
          <v-avatar class="img-circle" size="125">
            <v-img src="https://portal.unab.edu.sv/assets/img/logo_unab.png"></v-img>
          </v-avatar>
        </v-layout>
        <v-divider></v-divider>
        <v-list-item-group v-model="opcion">
          <v-list dark nav>
            <v-list-item link v-for="opc in opciones" :key="opc.ruta" :href="opc.ruta">
              <v-list-item-icon>
                <v-img max-width="40" :src="opc.img"></v-img>
              </v-list-item-icon>
              <v-list-item-content>{{ opc.titulo }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <template>
      <v-footer padless dark absolute>
        <v-layout justify-center>
          {{ new Date().getFullYear() }} —
          <strong>UNAB</strong>
        </v-layout>
      </v-footer>
    </template>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    opcion: 0,
    opciones: [
      {
        ruta: "/",
        titulo: "Inicio",
        img:
          "https://cdn3.iconfinder.com/data/icons/education-vol-1-outline-1/96/Artboard_41-512.png"
      },
      {
        ruta: "/evento/vista",
        titulo: "Congresos",
        img:
          "https://cdn3.iconfinder.com/data/icons/election-world-1/64/senate-congress-government-senator-political-512.png"
      },
      {
        ruta: "/estadisticas",
        titulo: "Estadisticas",
        img:
          "https://cdn2.iconfinder.com/data/icons/essential-web-1-1/50/lesson-presentation-keynote-report-statistics-512.png"
      }
    ]
  })
};
</script>

