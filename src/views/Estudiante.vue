<template>
  <v-container fluid>
    <v-layout row justify-center align-center>
      <v-col cols="12" lg="11">
        <v-card>
          <v-toolbar dark height="80" color="primary">
            <v-layout justify-center align-center>
              <v-flex md2 d-flex>
                <v-flex md3 d-flex>
                  <v-btn light fab small @click="importar">
                    <v-icon>mdi-import</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex md3 d-flex v-if="estudiantes.length > 0">
                  <v-btn light fab small @click="exportar">
                    <v-icon>mdi-export</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex md3 d-flex v-if="estudiantes.length > 0">
                  <v-btn light fab small>
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex md3 d-flex>
                  <v-btn light fab small @click="agregar">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-flex>
              <v-flex md4 d-flex>
                <titulo titulo="Estudiante" />
              </v-flex>
              <v-flex md6 d-flex>
                <v-layout row align-center justify-center>
                  <v-flex md4 d-flex>
                    <v-select
                      multiple
                      dark
                      filled
                      dense
                      color="#E0F7FA"
                      v-model="filtro"
                      :items="filtros"
                      label="Filtro"
                      clearable
                    ></v-select>
                  </v-flex>
                  <v-flex md4 d-flex class="pa-3">
                    <v-select
                      dark
                      filled
                      dense
                      color="#E0F7FA"
                      v-model="regional"
                      label="Regional"
                      :items="regionales"
                    ></v-select>
                  </v-flex>
                  <v-flex md4 d-flex>
                    <v-text-field
                      v-model="busqueda"
                      label="Búsqueda"
                      dark
                      filled
                      dense
                      color="#E0F7FA"
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
                <v-layout justify-center row>
                  <v-btn fab small @click="qr(item)" style="margin-left:2%">
                    <v-icon>mdi-qrcode</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="item.abono<congreso.precio"
                    fab
                    small
                    @click="abonar(item)"
                    style="margin-left:2%"
                  >
                    <v-icon>mdi-cash-usd</v-icon>
                  </v-btn>
                  <v-btn fab small v-if="item.pagado==0" @click="autorizar(item)">
                    <v-icon>mdi-account-lock</v-icon>
                  </v-btn>
                  <v-btn fab small @click="eliminar(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-layout>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <Importar />
      <exportar :collection="excel" />
      <nuevo />
      <qr />
      <abono />
    </v-layout>
  </v-container>
</template>
<script>
import Importar from "../components/ImportarEstudiante.vue";
import Titulo from "../components/Titulo.vue";
import Exportar from "../components/ExportarPDF.vue";
import Nuevo from "../components/Nuevo_Estudiante.vue";
import Qr from "../components/QR.vue";
import Abono from "../components/Abono.vue";
export default {
  components: {
    Importar,
    Exportar,
    Nuevo,
    Titulo,
    Qr,
    Abono
  },
  computed: {
    precio() {
      return parseInt(this.congreso.precio, 10);
    },
    estudiante() {
      return this.$store.state.estudiante.estudiante;
    }
  },
  watch: {
    regional: function(x) {
      let lista =
        x === "Todas"
          ? this.listaCompleta
          : this.listaCompleta.filter(r => r.estudiante.regional.nombre == x);
      this.excel.find(
        x => x.nombre === "titulo"
      ).datos[0].regional = this.regional;
      this.completo(lista);
    },
    filtro: function(x) {
      const todo = x.find(x => x == "todos") === undefined;
      const no_autorizado = x.find(x => x == "autorizados") === undefined;
      const pendiente = x.find(x => x == "solventes") === undefined;
      if (x.length > 1) {
        if (!todo) {
          this.filtro.splice(todo, 1);
        }
      }
      let lista = !todo
        ? this.listaCompleta
        : this.listaCompleta.filter(x => {
            if (no_autorizado & pendiente) {
              return (x.pagado == 0) & (x.abono < this.precio);
            } else if (no_autorizado & !pendiente) {
              return (x.pagado == 0) & (x.abono == this.precio);
            } else if (!no_autorizado & pendiente) {
              return (x.pagado == 1) & (x.abono < this.precio);
            } else if (!no_autorizado & !pendiente) {
              return (x.pagado == 1) & (x.abono === this.precio);
            }
          });
      this.completo(lista);
    }
  },
  data: () => ({
    load: true,
    filtro: ["todos"],
    filtros: ["todos", "autorizados", "solventes"],
    regional: "Todas",
    regionales: ["Todas"],
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
    exportar() {
      this.$store.state.exportar = true;
    },
    congresoVuew() {
      this.$store.state.congreso = this.congreso;
    },
    agregar() {
      this.$store.state.estudiante.modalNuevo = true;
    },
    importar() {
      this.$store.state.estudiante.modalImportar = true;
    },
    abonar(estudiante) {
      this.estudianteVuex(estudiante);
      this.$store.state.estudiante.modalAbonar = true;
    },
    qr(estudiante) {
      this.estudianteVuex(estudiante);
      this.$store.state.estudiante.modalQr = true;
    },
    estudianteVuex(item) {
      const est = this.listaCompleta.find(
        x => x.estudiante.codigo === item.codigo
      );
      this.$store.state.estudiante.estudiante = est;
    },
    async eliminar(estudiante) {
      this.estudianteVuex(estudiante);
      const id = this.estudiante.id;
      await this.$axios
        .delete(this.$path.concat("estudiante/").concat(id))
        .then(x => {
          if (x.data.respuesta) {
            this.estudiantes.splice(this.estudiantes.indexOf(estudiante), 1);
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "No es posible eliminar este estudiante",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(e => console.log(e));
    },
    async autorizar(estudiante) {
      const id = this.listaCompleta.find(
        x => x.estudiante.codigo === estudiante.codigo
      ).id;
      await this.$axios
        .put(this.$path.concat("autorizar/").concat(id))
        .catch(e => console.log(e));
      this.estudiantes.find(x => x.codigo == estudiante.codigo).pagado = 1;
      this.listaCompleta.find(
        x => x.estudiante.codigo === estudiante.codigo
      ).pagado = 1;
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
    regionalListar() {
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
      let numEstudiante = 0;
      lista.forEach(x => {
        numEstudiante++;
        let est = x.estudiante;
        let ac = x.accion;
        const estudiante = {
          N: numEstudiante,
          codigo: est.codigo,
          nombre: est.nombre,
          carrera: est.carrera.nombre,
          regional: est.regional.nombre,
          asistio: ac.registro === 1 ? "si" : "no",
          break_am: ac.break_am === 1 ? "si" : "no",
          almuerzo: ac.almuerzo === 1 ? "si" : "no",
          break_pm: ac.break_pm === 1 ? "si" : "no",
          abono: x.abono,
          pagado: x.pagado
        };
        this.estudiantes.push(estudiante);
      });
      this.excel.find(x => x.nombre === "estudiantes").datos = this.estudiantes;
      this.resumen(lista);
    },
    numEstudiante(descripcion, lista) {
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
        resumen.push(this.numEstudiante(x, lista));
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
      this.congresoVuew();
    }
  },
  mounted() {
    this.listar();
    this.regionalListar();
  }
};
</script>
<style scoped>
button {
  margin-left: 2%;
}
</style>