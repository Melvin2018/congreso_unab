<template>
  <v-dialog v-model="modal" persistent max-width="1000">
    <v-card>
      <v-toolbar dark height="50" color="primary">
        <v-col cols="12" lg="11">
          <v-layout justify-center row>
            <v-img
              :src="require('@/assets/file-directory.png')"
              aspect-ratio="1"
              max-width="30"
            />
            <span class="title">Importación de Estudiantes</span>
          </v-layout>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn text icon @click="close" color="black">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
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
          <xlsx-read :file="file" v-if="file">
            <template #default="{loading}">
              <v-row v-if="loading" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
              <xlsx-json v-else>
                <template #default="{collection}">
                  <v-col v-if="validar(collection)">
                    <v-label>{{collection.length}} estudiantes</v-label>
                    <v-data-table
                      :headers="columnas"
                      :items="collection"
                      :page.sync="pagina"
                      :items-per-page="7"
                      hide-default-footer
                      class="elevation-1"
                      @page-count="numPagina = $event"
                    >
                      <template v-slot:item.carrera="{ item }">{{ carrera(item.carrera) }}</template>
                      <template v-slot:item.regional="{ item }">{{ regional(item.regional) }}</template>
                    </v-data-table>
                    <div class="text-center pt-2">
                      <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
                    </div>
                    <v-spacer>
                      <v-col></v-col>
                    </v-spacer>
                    <v-row align="center" justify="center">
                      <v-btn color="primary" @click="importar()" :loading="load">
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
  </v-dialog>
</template>
<script>
import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js";
export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  computed: {
    modal() {
      return this.$store.state.estudiante.modalImportar;
    },
    congreso() {
      return this.$store.state.congreso.id;
    }
  },
  data: () => ({
    load: false,
    file: null,
    pagina: 1,
    valido: false,
    mensaje: "",
    carreras: [],
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
      const URL = this.$path + "estudiantes/" + this.congreso;
      const lista = this.convertir();
      await this.$axios.post(URL, lista).catch(e => console.log(e));
      this.load = false;
      this.close();
      this.$router.go();
    },
    close() {
      this.$store.state.estudiante.modalImportar = false;
    },
    convertir() {
      const lista = [];
      this.datos.forEach(x => {
        lista.push({
          abono: x.abono,
          estudiante: {
            nombre: x.nombre,
            codigo: x.codigo,
            carrera: x.carrera,
            regional: x.regional
          },
          congreso: this.congreso
        });
      });
      return lista;
    },
    regional(texto) {
      switch (texto) {
        case 1:
          return "San Salvador";
        case 2:
          return "San Miguel";
        case 3:
          return "Chalatenango";
        case 4:
          return "Sonsonate";
        default:
          return texto;
      }
    },
    carrera(id) {
      return this.carreras.find(x => x.id === id).nombre;
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
              .concat(arrayResultados.find(x => x.r).n)
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
    },
    listarCarrera() {
      this.$axios
        .get(this.$path + "carreras")
        .then(response => {
          this.carreras = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.listarCarrera();
  }
};
</script>
