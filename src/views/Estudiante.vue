<template>
  <v-content>
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
          :items-per-page="2"
          hide-default-footer
          class="elevation-1"
          @page-count="numPagina = $event"
        >
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
        </div>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    load: true,
    pagina: 1,
    numPagina: 0,
    estudiantes: [
      { nombre: "melvin", dui: "98736256378" },
      { nombre: "gaby", dui: "43598384985" },
      { nombre: "nadie", dui: "rew545325" }
    ],
    search: "",
    columnas: [
      { text: "Foto", value: "foto" },
      { text: "Nombre", value: "nombre" },
      { text: "Dui", value: "dui" },
      { text: "Edad", value: "edad" },
      { text: "Lugar", value: "lugar" },
      { text: "Posicion", value: "posicion" },
      { text: "Opciones", value: "opciones" }
    ]
  })
};
</script>

<style></style>
