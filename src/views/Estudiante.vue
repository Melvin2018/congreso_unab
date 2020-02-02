<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center" align="center">
          <v-col cols="2">
            <v-row align="center">
              <Importar :dialog="importar" :idcongreso="parse" @click="agregar()"></Importar>
              <Exportar
                id="exp"
                :nombre="congreso"
                :collection="excel"
                v-if="estudiantes.length > 0"
              ></Exportar>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row justify="center">
              <img
                src="https://cdn1.iconfinder.com/data/icons/streaming-services-2/256/TV_Schedule-512.png"
                height="40px"
                width="40px"
              />
              <h2 class="display-1 white--text font-weight-light">Estudiantes</h2>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row justify="center" align="center">
              <v-col cols="5">
                <v-select v-model="regional" :items="regionales" filled label="regional"></v-select>
              </v-col>
              <v-text-field
                v-model="busqueda"
                label="busqueda"
                outlined
                dark
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="columnas"
          :items="estudiantes"
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
import Importar_Estudiante from "../components/Importar_Estudiante";
import Exportar from "../components/ExportarPDF";
export default {
  components: {
    Importar: Importar_Estudiante,
    Exportar
  },
  computed: {
    parse() {
      return parseInt(this.$route.params.congreso, 10);
    }
  },
  watch: {
    regional: function(x) {
      let listaCompleta = Array.from(this.listaCompleta);
      let lista =
        x === "todas"
          ? listaCompleta
          : listaCompleta.filter(r => r.estudiante.regional.nombre == x);
      this.resumen(lista);
      this.completo(lista);
      this.excel.find(
        x => x.nombre === "titulo"
      ).datos[0].regional = this.regional;
    }
  },
  data: () => ({
    load: true,
    lnueva: [],
    regional: "todas",
    regionales: ["todas"],
    paginacion: {},
    pagina: 1,
    numPagina: 0,
    listaCompleta: [],
    estudiantes: [],
    excel: [
      { nombre: "titulo", datos: [] },
      { nombre: "resumen", datos: [] },
      { nombre: "estudiantes", datos: [] }
    ],
    congreso: "",
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Regional", align: "center", value: "regional" },
      { text: "Break Am", align: "center", value: "break_am" },
      { text: "Abono", align: "center", value: "abono" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    imprimir() {
      console.log(this.estudiantes[0].nombre);
    },
    agregar() {
      this.importar = !this.importar;
    },
    async listar(congreso) {
      const URL =
        this.$path + "estudiantes_congreso?tipo=1&idCongreso=" + congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.listaCompleta = response.data;
        })
        .catch(e => console.log(e));
      this.llenar(this.listaCompleta);
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
          response.data.forEach(x => {
            this.regionales.push(x.nombre);
          });
          this.$store.commit("regionales", response.data);
        })
        .catch(e => console.log(e));
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
      this.estudiantes = [];
      let num = 0;
      listado.forEach(x => {
        num++;
        let est = x.estudiante;
        let ac = x.accion;
        const estudiante = {
          N: num,
          codigo: est.codigo,
          nombre: est.nombre,
          carrera: est.carrera.nombre,
          regional: est.regional.nombre,
          asistio: ac.registro === 1 ? "si" : "no",
          break_am: ac.break_am === 1 ? "si" : "no",
          almuerzo: ac.almuerzo === 1 ? "si" : "no",
          break_pm: ac.break_pm === 1 ? "si" : "no",
          abono: x.abono
        };
        this.estudiantes.push(estudiante);
      });
      this.excel.find(x => x.nombre === "estudiantes").datos = this.estudiantes;
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
          fecha: listado[0].congreso.fecha,
          regional: this.regional
        }
      ];
    }
  },
  mounted() {
    this.listar(this.$route.params.congreso);
    this.listaExtra();
  }
};
</script>
<style scoped>
#exp {
  margin-left: 2%;
}
</style>