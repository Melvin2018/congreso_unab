<template>
  <v-container>
    <v-card>
      <v-toolbar class="primary" dark>
        <v-col cols="12" sm="2">
          <v-row align="center">
            <Importar :dialog="importar" :idcongreso="parse" @click="agregar()" :cambio="listar()"></Importar>
            <Exportar id="exp" :nombre="congreso" :collection="excel" v-if="personal.length > 0"></Exportar>
          </v-row>
        </v-col>
        <v-col cols="12" sm="4">
          <v-row justify="center">
            <v-toolbar-title>Personal</v-toolbar-title>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="busqueda" dark append-icon="mdi-magnify"></v-text-field>
        </v-col>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          :headers="columnas"
          :items="personal"
          :search="busqueda"
          :page.sync="pagina"
          :loading="load"
          :items-per-page="10"
          loading-text="Cargando..."
          no-data-text="no hay datos"
          hide-default-footer
          class="elevation-1"
          @page-count="numPagina = $event"
        >
          <template v-slot:item.opciones="{ item }">
            <v-btn fab small @click="eliminar(item.id)" style="margin-left:2%">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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
import ImportarExcel from "../components/ImportarExcel";
import Exportar from "../components/ExportarPDF";
export default {
  components: {
    Importar: ImportarExcel,
    Exportar
  },
  computed: {
    parse() {
      return parseInt(this.$route.params.congreso, 10);
    }
  },
  data: () => ({
    load: true,
    pagina: 1,
    numPagina: 0,
    listaCompleta: [],
    personal: [],
    excel: [
      { nombre: "titulo", datos: [] },
      { nombre: "resumen", datos: [] },
      { nombre: "personal", datos: [] }
    ],
    congreso: "",
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "email" },
      { text: "Break Am", align: "center", value: "break_am" },
      { text: "Almuerzo", align: "center", value: "almuerzo" },
      { text: "Break Pm", align: "center", value: "break_pm" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    imprimir() {
      console.log(this.personal[0].nombre);
    },
    agregar() {
      this.importar = !this.importar;
    },
    async listar() {
      const URL =
        this.$path +
        "personal_congreso?tipo=1&idCongreso=" +
        this.$route.params.congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.listaCompleta = response.data;
        })
        .catch(e => console.log(e));
      this.llenar(this.listaCompleta);
      this.load = false;
    },

    llenar(lista) {
      const listado = Array.from(lista);
      if (listado.length > 0) {
        this.congreso = listado[0].congreso.nombre;
        this.titulo(listado);
        this.resumen(listado);
        this.completo(listado);
      }
    },
    completo(listado) {
      this.personal = [];
      let num = 0;
      listado.forEach(x => {
        num++;
        let est = x.personal;
        let ac = x.accion;
        const obj = {
          N: num,
          email: est.email,
          nombre: est.nombre,
          asistio: ac.registro === 1 ? "si" : "no",
          break_am: ac.break_am === 1 ? "si" : "no",
          almuerzo: ac.almuerzo === 1 ? "si" : "no",
          break_pm: ac.break_pm === 1 ? "si" : "no"
        };
        this.personal.push(obj);
      });
      this.excel.find(x => x.nombre === "personal").datos = this.personal;
    },
    num(descripcion, listado) {
      let cantidad = 0;
      const li = Array.from(listado);
      switch (descripcion) {
        case "esperados":
          cantidad = li.length;
          break;
        case "registrados":
          cantidad = li
            .filter(x => x.accion.registro === 1)
            .reduce((x, y) => x + 1, 0);
          break;
        case "break_am":
          cantidad = li
            .filter(x => x.accion.break_am === 1)
            .reduce((x, y) => x + 1, 0);
          break;
        case "almuerzo":
          cantidad = li
            .filter(x => x.accion.almuerzo === 1)
            .reduce((x, y) => x + 1, 0);
          break;
        case "break_pm":
          cantidad = li
            .filter(x => x.accion.break_pm === 1)
            .reduce((x, y) => x + 1, 0);
          break;
        default:
          cantidad = 0;
          break;
      }
      return {
        resumen: descripcion,
        cantidad
      };
    },
    resumen(listado) {
      let resumen = [];
      const descripciones = [
        "esperados",
        "registados",
        "break_am",
        "almuerzo",
        "break_pm"
      ];
      descripciones.forEach(x => {
        resumen.push(this.num(x, listado));
      });
      this.excel.find(x => x.nombre === "resumen").datos = resumen;
    },
    titulo(listado) {
      this.excel.find(x => x.nombre === "titulo").datos = [
        {
          nombre: listado[0].congreso.nombre,
          fecha: listado[0].congreso.fecha
        }
      ];
    }
  },
  mounted() {
    this.listar();
  }
};
</script>
<style scoped>
#exp {
  margin-left: 2%;
}
</style>