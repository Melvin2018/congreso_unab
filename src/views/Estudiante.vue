<template>
  <v-container fluid>
    <v-layout row justify-center align-center>
        <v-col cols="12" lg="11">
        <v-card>
          <v-toolbar dark height="75">
            <v-layout justify-center align-center>
              <v-flex xl3 lg3 md3 sm3 xs3>
                <v-layout align-center justify-start>
                  <v-flex xl4 lg4 md4 sm4 xs4>
                    <Importar :dialog="importar" :idcongreso="parse"></Importar>
                  </v-flex>
                  <v-flex xl4 lg4 md4 sm4 xs4 v-if="estudiantes.length > 0">
                    <Exportar id="exp" :nombre="congreso.nombre" :collection="excel"></Exportar>
                  </v-flex>
                  <v-flex xl4 lg4 md4 sm4 xs4>
                    <v-btn fab small @click="agregar" @estudiante="nuevoEstudiante">
                      <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xl4 lg4 md4 sm4 xs4>
                    <v-btn fab small>
                      <v-icon>mdi-email</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xl4 lg4 md4 sm4 xs4>
                <v-layout justify-center align-center>
                  <v-toolbar-title>Estudiante</v-toolbar-title>
                </v-layout>
              </v-flex>
              <v-flex xl5 lg5 md5 sm5 xs5>
                <v-layout justify-center>
                  <v-flex xl5 lg5 md5 sm5 xs5>
                    <v-select v-model="regional" label="regional" :items="regionales"></v-select>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xl6 lg6 md6 sm6 xs6>
                    <v-text-field
                      v-model="busqueda"
                      label="busqueda"
                      dark
                      append-icon="mdi-magnify"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-toolbar>
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
        </v-col>
      <nuevo :congreso="congreso.id"/>
    </v-layout>
  </v-container>
</template>
<script>
import ImportarExcel from "../components/ImportarEstudiante.vue";
import Exportar from "../components/ExportarPDF.vue";
import Nuevo from "../components/Nuevo_Estudiante.vue";
export default {
  components: {
    Importar: ImportarExcel,
    Exportar,
    Nuevo
  },
  computed: {
    parse() {
      return parseInt(this.$route.params.congreso, 10);
    }
  },
  watch: {
    regional: function(x) {
      let lista =
        x === "todas"
          ? this.listaCompleta
          : this.listaCompleta.filter(r => r.estudiante.regional.nombre == x);

      this.excel.find(
        x => x.nombre === "titulo"
      ).datos[0].regional = this.regional;
      this.completo(lista);
    }
  },
  data: () => ({
    load: true,
    regional: "todas",
    regionales: ["todas"],
    pagina: 1,
    numPagina: 0,
    listaCompleta: [],
    estudiantes: [],
    excel: [
      { nombre: "titulo", datos: [] },
      { nombre: "resumen", datos: [] },
      { nombre: "estudiantes", datos: [] }
    ],
    congreso: {},
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Regional", align: "center", value: "regional" },
      { text: "Break Am", align: "center", value: "break_am" },
      { text: "Almuerzo", align: "center", value: "almuerzo" },
      { text: "Break Pm", align: "center", value: "break_pm" },
      { text: "Abono", align: "center", value: "abono" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    nuevoEstudiante(e) {
      this.estudiantes.push(e);
    },
    agregar(){
      this.$store.state.modalEstudianteNuevo=true;
    },
    async listar() {
      const URL = this.$path + "estudiantes/" + this.$route.params.congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.listaCompleta = response.data.estudiantes;
          this.congreso = response.data.congreso;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
      this.completo(this.listaCompleta);
      this.titulo();
      this.load = false;
    },
    listaRegional() {
      this.$axios
        .get(this.$path + "regionales")
        .then(response => {
          Array.from(response.data).forEach(x => {
            this.regionales.push(x.nombre);
          });
        })
        .catch(e => console.log(e));
    },
    completo(lista) {
      this.estudiantes = [];
      let num = 0;
      lista.forEach(x => {
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
      this.resumen(lista);
    },
    num(descripcion, lista) {
      const li = Array.from(lista);
      let cantidad = 0;
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
    resumen(lista) {
      let resumen = [];
      const descripciones = [
        "esperados",
        "registados",
        "break_am",
        "almuerzo",
        "break_pm"
      ];
      descripciones.forEach(x => {
        resumen.push(this.num(x, lista));
      });
      this.excel.find(x => x.nombre === "resumen").datos = resumen;
    },
    titulo() {
      this.excel.find(x => x.nombre === "titulo").datos = [
        {
          nombre: this.congreso.nombre,
          fecha: this.congreso.fecha,
          regional: this.regional
        }
      ];
    }
  },
  mounted() {
    this.listar();
    this.listaRegional();
  }
};
</script>
<style scoped>
#exp {
  margin-left: 2%;
}
</style>