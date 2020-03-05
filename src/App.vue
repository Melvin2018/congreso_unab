<template>
  <v-app>
    <v-app-bar
      :clipped-left="true"
      app
      color="blue-grey lighten-3"
    >
      <template v-slot:img="{ props }">
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" dark></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h2>Administración de Congresos UNAB</h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :clipped="true" app width="14%" color="light-blue darken-2">
      <v-list square>
        <v-subheader>
          <h1>MENÚ</h1>
        </v-subheader>
        <v-card color="blue-grey lighten-3">
          <v-col>
            <v-row justify="space-around">
              <v-avatar class="img-circle" color="white" size="125">
                <v-img right src="https://portal.unab.edu.sv/assets/img/logo_unab.png"></v-img>
              </v-avatar>
            </v-row>
          </v-col>
        </v-card>
         <v-divider></v-divider>
        <v-list-item-group v-model="opc" color="#F9FBE7">
          <v-list dark nav>
          <v-list-item link v-for="opc in opciones" :key="opc.ruta" :href="opc.ruta">
            <v-list-item-icon>
              <v-img height="40px" width="40px" :src="opc.img"></v-img>
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
      <v-footer padless color="amber darken-1" absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>UNAB</strong>
        </v-col>
      </v-footer>
    </template>
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

      //{
       // ruta: "/configuracion",
        //titulo: "Administracion",
        //img:
         // "https://cdn0.iconfinder.com/data/icons/miscellaneous-21-line/128/administration_regime_people_admin-512.png"
      //},
      
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
<style>
.border {
  border: 2px dashed rgba(20, 200, 212, 0.63);
}
.title {
  margin-left: 5%;
}
</style>
