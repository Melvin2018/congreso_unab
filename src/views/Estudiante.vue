<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center">
          <v-col>
            <v-btn fab color="secondary" @click="agregar()"
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
              Lista de estudiantes
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
        :items="estudiantes"
        :search="busqueda"
        :page.sync="pagina"
        :items-per-page="10"
        hide-default-footer
        class="elevation-1"
        @page-count="numPagina = $event"
      >
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
    estudiantes: [
      {
        id: 1,
        nombre: "melvin",
        codigo: "98736256378",
        carrera: "ingenieria en sistemas",
        regional: "sm"
      },
      {
        id: 2,
        nombre: "gaby",
        codigo: "43598384985",
        carrera: "ingenieria en sistemas",
        regional: "ch"
      },
      {
        id: 3,
        nombre: "nadie",
        codigo: "rew545325",
        carrera: "ingenieria en sistemas",
        regional: "ss"
      }
    ],
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Reginal", align: "center", value: "reginal" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    agregar() {
      this.$router.push("/estudiante/importacion");
    }
  }
};
</script>
<style></style>
