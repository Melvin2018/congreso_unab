<template>
  <v-dialog v-model="dialogo" persistent max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab style="margin-left:7%">
        <v-icon>mdi-import</v-icon>
      </v-btn>
    </template>
    <v-col>
      <v-card>
        <v-card-title class="blue lighten-1 justify-center">
          <v-row align="center" justify="center">
            <img
              src="https://cdn4.iconfinder.com/data/icons/jetflat-2-multimedia-vol-6/60/0043_076_upload_import_mac_app_application_window-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">Importación de estudiantes</h2>
          </v-row>
          <v-spacer></v-spacer>
          <v-btn text icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-col>
            <v-file-input
              label="Archivo a importar"
              filled
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              prepend-icon="mdi-file"
              v-model="file"
              show-size
              counter
            ></v-file-input>
            <xlsx-read :file="file">
              <template #default="{loading}">
                <v-row v-if="loading" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
                <xlsx-json v-else>
                  <template #default="{collection}">
                    <v-col v-if="validar(collection)">
                      <v-data-table
                        :headers="columnas"
                        :items="collection"
                        :page.sync="pagina"
                        :items-per-page="7"
                        hide-default-footer
                        class="elevation-1"
                        @page-count="numPagina = $event"
                      >
                        <template v-slot:item.regional="{ item }">{{ regional(item.regional) }}</template>
                      </v-data-table>
                      <div class="text-center pt-2">
                        <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
                      </div>
                      <v-row align="center" justify="center">
                        <v-spacer></v-spacer>
                        <v-btn dark @click="importar()" :loading="load">
                          <v-icon>mdi-location-enter</v-icon>importar
                        </v-btn>
                      </v-row>
                    </v-col>
                    <v-alert prominent type="error" v-else-if="collection">
                      <v-row align="center">
                        <v-col class="grow">{{ mensaje }}</v-col>
                      </v-row>
                    </v-alert>
                  </template>
                </xlsx-json>
              </template>
            </xlsx-read>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
  </v-dialog>
</template>
<script>
import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js";
export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false
    },
    idcongreso: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    dialog: x => (this.dialogo = x)
  },
  data: () => ({
    dialogo: false,
    load: false,
    file: null,
    pagina: 1,
    carreras: [],
    regionales: [],
    valido: false,
    mensaje: "",
    datos: [],
    numPagina: 0,
    columnas: [
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Regional", align: "center", value: "regional" },
      { text: "Abono($)", align: "center", value: "abono" }
    ]
  }),
  methods: {
    async importar() {
      this.load = true;
      const URL = this.$path + "estudiantes_congreso";
      const lista = this.convertir();
      await this.$axios.post(URL, lista).catch(e => console.log(e));
      this.load = false;
      this.dialogo = false;
    },
    close() {
      this.dialogo = false;
  
    },
    async convertir() {
      const lista = [];
      let cambio = this.validarCarrera();
      if (cambio) {
        this.refrescar();
      }
      this.datos.forEach(x => {
        lista.push({
          abono: x.abono,
          estudiante: {
            nombre: x.nombre,
            codigo: x.codigo,
            carrera: carreras.find(c => c.nombre == x.carrera).id,
            regional: regionales.find(c => c.alias === x.regional).id
          },
          congreso: this.idcongreso
        });
      });
      return lista;
    },
    async refrescar() {
      const URL = this.$path + "carreras";
      await this.$axios
        .get(URL)
        .then(response => {
          this.carreras = response.data;
        })
        .catch(e => console.log(e));
    },
    validarCarrera() {
      let cambio = false;
      this.datos.forEach(x => {
        if (this.carreras.find(c => c.nombre == x.carrera) === undefined) {
          this.agregar(x.carrera, "carreras");
          cambio = true;
        }
      });
      return cambio;
    },
    async agregar(nombre) {
      await this.$axios
        .post(this.$path + "carreras", { nombre: nombre })
        .then(response => {
          return response.data;
        })
        .catch(e => console.log(e));
    },
    regional(texto) {
      switch (texto) {
        case "SS":
          return "San Salvador";
        case "CH":
          return "Chalatenango";
        case "SM":
          return "San Miguel";
        case "SO":
          return "Sonsonate";
        default:
          return text;
      }
    },
    validar(collection) {
      if (collection) {
        let arrayResultados = [];
        const obj = collection[0];
        arrayResultados.push({
          n: "codigo",
          r: obj.codigo === undefined
        });
        arrayResultados.push({
          n: "nombre",
          r: obj.nombre === undefined
        });
        arrayResultados.push({
          n: "carrera",
          r: obj.carrera === undefined
        });
        arrayResultados.push({
          n: "regional",
          r: obj.regional === undefined
        });
        arrayResultados.push({
          n: "abono",
          r: obj.abono === undefined
        });
        const ArrayRelativo = arrayResultados.filter(x => x.r);
        let num = ArrayRelativo.length;
        if (num == arrayResultados.length) {
          this.mensaje = "archivo incorrecto";
        } else if ((num > 0) & (num < arrayResultados.length)) {
          if (num == 1) {
            this.mensaje = "error al encontar columna "
              .concat(arrayResultados.find(x => x.r))
              .concat(" hace falta");
          } else {
            let texto = "error al encontar las columnas [";
            for (let x of ArrayRelativo) {
              if (x.n == ArrayRelativo[0].n) {
                texto += x.n;
              } else {
                texto += ", ".concat(x.n);
              }
            }
            texto += "] hacen falta";
            this.mensaje = texto;
          }
        } else {
          this.datos = collection;
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.carreras = Array.from(this.$store.state.carreras);
    this.regionales = Array.from(this.$store.state.regionales);
  }
};
</script>
