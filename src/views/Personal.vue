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
              :nombre="titulo"
              :collection="excel"
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
          :items="personal"
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
import Exportar from "../components/ExportarPDF";
export default {
  components: {
    Importar: Importar_Estudiante,
    Exportar
  },
  data: () => ({
    load: true,
    pagina: 1,
    numPagina: 0,
    personal: [],
    excel: [],
    congreso: "",
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Funcion", align: "center", value: "funcion" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    agregar() {
      this.importar = !this.importar;
    },
    async listar(congreso) {
      const URL = this.$path + "personal_congreso?idCongreso=" + congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.llenar(response.data);
        })
        .catch(e => console.log(e));
      this.load = false;
    },
    llenar(lista) {
      if (lista.length > 0) {
        this.congreso = lista[0].nombre;
      }
      Array.from(lista).forEach(x => {
        this.personal.push({
          nombre: x.personal.nombre,
          abono: x.personal.funcion
        });
      });
    },
    exportacion() {
      this.excel.push({
        nombre: "resumen_personal",
        datos: [
          { detalle: "esperados", cantidad: 12 },
          { detalle: "registrados", cantidad: 12 }
        ]
      });
      this.excel.push({
        nombre: "personal",
        datos: this.personal
      });
    }
  },
  mounted() {
    this.listar(this.$route.params.congreso);
    this.exportacion();
    this.listaExtra();
  }
};
</script>
