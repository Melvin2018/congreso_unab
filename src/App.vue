<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list rounded>
        <v-subheader>MENU</v-subheader>
        <v-list-item-group v-model="opc" color="primary">
          <v-list-item
            link
            v-for="opc in opciones"
            :key="opc.ruta"
            :href="opc.ruta"
          >
            <v-list-item-icon>
              <v-img height="40px" width="40px" :src="opc.img"></v-img>
            </v-list-item-icon>
            <v-list-item-content>{{ opc.titulo }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dark
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Congreso UNAB
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    opc: 0,
    opciones: [
      {
        ruta: "/",
        titulo: "Congreso",
        img:
          "https://cdn4.iconfinder.com/data/icons/election-world-color/64/senate-congress-government-senator-political-512.png"
      },
      {
        ruta: "/",
        titulo: "Estudiante",
        img:
          "https://cdn3.iconfinder.com/data/icons/education-179/64/x-04-512.png"
      },
      {
        ruta: "/",
        titulo: "Evento",
        img:
          "https://cdn2.iconfinder.com/data/icons/seo-and-web-optimization-vol-5-2/512/events_calendar-512.png"
      },
      {
        ruta: "/",
        titulo: "Estadisticas",
        img:
          "https://cdn0.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo2-39-512.png"
      }
    ]
  })
};
</script>
