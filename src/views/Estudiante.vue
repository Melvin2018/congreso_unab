<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center">
          <v-row justify="center" align="center">
            <Importar
              class="button"
              :dialog="importar"
              :idcongreso="parseInt(this.$route.params.congreso, 10)"
              @click="agregar()"
            ></Importar>
            <Exportar
              class="exportar"
              nombre="Estudiantes"
              :collection="collection"
            ></Exportar>
          </v-row>
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
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="columnas"
          :items="estudiantes"
          :search="busqueda"
          :page.sync="pagina"
          :loading="load"
          loading-text="cargando estudiantes"
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
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import Importar_Estudiante from "../components/Importar_Estudiante";
import Exportar from "../components/Exportar";
export default {
  components: {
    Importar: Importar_Estudiante,
    Exportar
  },
  data: () => ({
    load: true,
    pagina: 1,
    numPagina: 0,
    estudiantes: [],
    collection: [],
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Regional", align: "center", value: "regional" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    agregar() {
      this.importar = !this.importar;
    },
    async listar(congreso) {
      const URL =
        this.$path + "estudiantes_congreso?tipo=1&idCongreso=" + congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.llenar(response.data);
        })
        .catch(e => console.log(e));
      this.load = false;
    },
    listaExtra() {
      this.$axios
        .get(this.$path + "carreras")
        .then(response => {
          this.$store.commit("carreras", response.data);
        })
        .catch(e => console.log(e));
      this.$axios
        .get(this.$path.concat("regionales"))
        .then(response => {
          this.$store.commit("regionales", response.data);
        })
        .catch(e => console.log(e));
    },
    llenar(lista) {
      Array.from(lista).forEach(x => {
        this.collection.push({
          codigo: x.estudiante.codigo,
          nombre: x.estudiante.nombre,
          carrera: x.estudiante.carrera.nombre,
          regional: x.estudiante.regional.nombre,
          abono: x.abono
        });
        this.estudiantes.push({
          id: x.estudiante.id,
          codigo: x.estudiante.codigo,
          nombre: x.estudiante.nombre,
          carrera: x.estudiante.carrera.nombre,
          regional: x.estudiante.regional.nombre
        });
      });
    }
  },
  mounted() {
    this.listar(this.$route.params.congreso);
    this.listaExtra();
  }
};
</script>
