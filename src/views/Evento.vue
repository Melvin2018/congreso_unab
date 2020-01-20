<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center">
          <v-col>
            <v-btn fab color="secondary" @click="onClick"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-row align="center" justify="center">
            <img
              src="https://cdn2.iconfinder.com/data/icons/unigrid-phantom-layout-vol-3/60/021_112_layout_wireframe_grid_search_list-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">
              Eventos actuales
            </h2>
          </v-row>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="busqueda"
            label="busqueda"
            outlined
            dark
            color="secondary"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="columnas"
        :items="eventos"
        :search="busqueda"
        :page.sync="pagina"
        :items-per-page="10"
        hide-default-footer
        class="elevation-1"
        @page-count="numPagina = $event"
      >
        <template v-slot:item.est="{ item }">
          <v-btn @click="listarEstudiante(item.id)" rounded>
          
              <v-img
                src="https://cdn1.iconfinder.com/data/icons/delivery-logistics/512/shopping_list-256.png"
                height="30"
                width="30"
              /></v-btn>
        </template>
        <template v-slot:item.opciones="{ item }">
          <v-row align="center" justify="center">
            <v-btn fab @click="editar(item.id)">
              <v-icon>mdi-sync</v-icon></v-btn
            >
            <v-btn fab @click="eliminar(item.id)" style="margin-left:2%">
              <v-icon>mdi-delete</v-icon></v-btn
            >
          </v-row>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    load: true,
    pagina: 1,
    numPagina: 0,
    eventos: [
      {
        id: 1,
        nombre: "congreso enfermeria",
        fecha: "2020-10-13",
        precio: 50,
        asistencia: 20
      }
    ],
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "fecha", align: "center", value: "fecha" },
      { text: "estudiantes", align: "center", value: "est" },
      { text: "N. Asistencia", align: "center", value: "asistencia" },
      { text: "Precio", align: "center", value: "precio" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    onClick() {
      this.$router.push("/evento/nuevo");
    },
    listarEstudiante(estudiante) {
      this.$router.push({
        name: "estudianteCongreso",
        params: {
          id: estudiante
        }
      });
    }
  }
};
</script>

<style></style>
