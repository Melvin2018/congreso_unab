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
                <v-flex md3 d-flex v-if="personal.length > 0">
                  <v-btn light fab small @click="exportar">
                    <v-icon>mdi-export</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex md3 d-flex v-if="personal.length > 0">
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
              <v-flex md6 d-flex>
                <titulo titulo="Personal" />
              </v-flex>
              <v-flex md4 d-flex>
                <v-layout row align-center justify-center>
                  <v-flex md6 d-flex class="pa-3">
                    <v-select
                      dark
                      filled
                      dense
                      color="#E0F7FA"
                      label="tipo"
                      v-model="tipo"
                      :items="tipos"
                    ></v-select>
                  </v-flex>
                  <v-flex md6 d-flex>
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
                <v-btn fab small @click="eliminar(item)" style="margin-left:2%">
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
      <importar />
      <exportar :collection="excel" />
      <nuevo />
    </v-layout>
  </v-container>
</template>
<script>
import Importar from "../components/ImportarPersonal.vue";
import Exportar from "../components/ExportarPDF.vue";
import Nuevo from "../components/Nuevo_Personal.vue";
import Titulo from "../components/Titulo.vue";
export default {
  components: {
    Importar,
    Exportar,
    Titulo,
    Nuevo
  },
  computed: {
    personal1() {
      return this.$store.state.personal.personal;
    }
  },
  watch: {
    tipo: function(x) {
      let lista =
        x === "Todos"
          ? this.listaCompleta
          : this.listaCompleta.filter(r => r.personal.tipo.nombre == x);
      this.excel.find(x => x.nombre === "titulo").datos[0].tipo = this.tipo;
      this.completo(lista);
    }
  },
  data: () => ({
    load: true,
    tipo: "Todos",
    tipos: ["Todos"],
    pagina: 1,
    numPagina: 0,
    listaCompleta: [],
    personal: [],
    excel: [
      { nombre: "titulo", datos: [] },
      { nombre: "resumen", datos: [] },
      { nombre: "personal", datos: [] }
    ],
    congreso: {},
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Email", align: "center", value: "email" },
      { text: "Tipo", align: "center", value: "tipo" },
      { text: "Función", align: "center", value: "funcion" },
      { text: "Break Am", align: "center", value: "break_am" },
      { text: "Almuerzo", align: "center", value: "almuerzo" },
      { text: "Break Pm", align: "center", value: "break_pm" },
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
      this.$store.state.personal.modalNuevo = true;
    },
    importar() {
      this.$store.state.personal.modalImportar = true;
    },
    personalVuex(item) {
      const est = this.listaCompleta.find(x => x.personal.email === item.email);
      this.$store.state.personal.personal = est;
    },
    async listar() {
      const URL = this.$path + "personal/" + this.$route.params.congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.listaCompleta = response.data.personal;
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
    listaTipo() {
      this.$axios
        .get(this.$path + "tipos")
        .then(response => {
          response.data.forEach(x => {
            this.tipos.push(x.nombre);
          });
        })
        .catch(e => console.log(e));
    },
    completo(lista) {
      this.personal = [];
      let num = 0;
      lista.forEach(x => {
        num++;
        let est = x.personal;
        let ac = x.accion;
        const obj = {
          N: num,
          email: est.email,
          nombre: est.nombre,
          tipo: est.tipo.nombre,
          funcion: est.funcion,
          asistio: ac.registro === 1 ? "si" : "no",
          break_am: ac.break_am === 1 ? "si" : "no",
          almuerzo: ac.almuerzo === 1 ? "si" : "no",
          break_pm: ac.break_pm === 1 ? "si" : "no"
        };
        this.personal.push(obj);
      });
      this.excel.find(x => x.nombre === "personal").datos = this.personal;
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
          tipo: this.tipo
        }
      ];
      this.congresoVuew();
    },
    async eliminar(p) {
      this.personalVuex(p);
      const id=this.personal1.id;
      console.log(id);
      await this.$axios
        .delete(this.$path.concat("personal_delete?id=").concat(id))
        .then(x => {
          if (x.data.respuesta) {
            this.personal.splice(this.personal.indexOf(p), 1);
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "No es posible eliminar este personal",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.listar();
    this.listaTipo();
  }
};
</script>
<style scoped>
#exp {
  margin-left: 2%;
}
</style>