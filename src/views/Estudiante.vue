<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn fab absolute color="primary" @click="agregar()"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-spacer></v-spacer>
        <span class="text--darken-1 h3 text-justify">estudiantes</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="busqueda"
          outlined
          light
          color="secondary"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="columnas"
        :items="estudiantes"
        :search="search"
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
    search: "",
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
