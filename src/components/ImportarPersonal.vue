<template>
  <v-dialog v-model="modal" persistent max-width="1000">
    <v-card>
      <v-toolbar dark color="primary" height="50">
        <v-col cols="12" lg="11">
          <titulo titulo="Importar personal" />
        </v-col>
        <v-spacer></v-spacer>
        <v-btn text icon @click="close" color="black">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-col>
          <v-file-input
            color="green"
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
                    <v-data-table
                      :headers="columnas"
                      :items="collection"
                      :page.sync="pagina"
                      :items-per-page="7"
                      hide-default-footer
                      class="elevation-1"
                      @page-count="numPagina = $event"
                    ></v-data-table>
                    <div class="text-center pt-2">
                      <v-pagination v-model="pagina" :length="numPagina"></v-pagination>
                    </div>
                    <v-row align="center" justify="center">
                      <v-spacer>
                        <v-col></v-col>
                      </v-spacer>
                      <v-btn color="red" @click="importar()" :loading="load">
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
import Titulo from "@/components/Titulo.vue";
export default {
  components: {
    XlsxRead,
    XlsxJson,
    Titulo
  },
  computed: {
    modal() {
      return this.$store.state.personal.modalImportar;
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
    tipos: [],
    datos: [],
    numPagina: 0,
    columnas: [
      { text: "Correo", align: "center", value: "correo" },
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Tipo", align: "center", value: "tipo" },
      { text: "Cargo", align: "center", value: "cargo" }
    ]
  }),
  methods: {
    async importar() {
      this.load = true;
      const URL = this.$path + "personal/" + this.congreso;
      const lista = this.convertir();
      await this.$axios.post(URL, lista).catch(e => console.log(e));
      this.load = false;
      this.close();
      this.$router.go();
    },
    close() {
      this.$store.state.personal.modalImportar = false;
    },
    convertir() {
      const lista = [];
      this.datos.forEach(x => {
        lista.push({
          personal: {
            nombre: x.nombre,
            email: x.correo,
            tipo: x.tipo,
            funcion: x.cargo
          },
          congreso: this.congreso
        });
      });
      return lista;
    },
    validar(collection) {
      if (collection) {
        let arrayResultados = [];
        const obj = collection[0];
        arrayResultados.push({
          n: "correo",
          r: obj.correo === undefined
        });
        arrayResultados.push({
          n: "nombre",
          r: obj.nombre === undefined
        });
        arrayResultados.push({
          n: "tipo",
          r: obj.tipo === undefined
        });
        arrayResultados.push({
          n: "cargo",
          r: obj.cargo === undefined
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
    },
    async tipo() {
      await this.$axios
        .get(this.$path + "tipos")
        .then(response => {
          this.tipos = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.tipo();
  }
};
</script>
