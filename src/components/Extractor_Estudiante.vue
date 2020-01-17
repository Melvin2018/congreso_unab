<template>
  <v-container>
    <v-col>
      <v-card>
        <v-card-title class="blue lighten-1 justify-center">
          <v-row align="center" justify="center">
            <img
              src="https://cdn4.iconfinder.com/data/icons/jetflat-2-multimedia-vol-6/60/0043_076_upload_import_mac_app_application_window-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">
              Importación de estudiantes
            </h2>
          </v-row>
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
                <span v-if="loading">Loading...</span>
                <xlsx-json v-else>
                  <template #default="{collection}">
                    <v-col v-if="validar(collection)">
                      <v-data-table
                        :headers="columnas"
                        :items="collection"
                        :page.sync="pagina"
                        :items-per-page="10"
                        hide-default-footer
                        class="elevation-1"
                        @page-count="numPagina = $event"
                      >
                        <template v-slot:item.regional="{ item }">
                          {{ regional(item.regional) }}
                        </template>
                      </v-data-table>
                      <div class="text-center pt-2">
                        <v-pagination
                          v-model="pagina"
                          :length="numPagina"
                        ></v-pagination>
                      </div>
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
  </v-container>
</template>
<script>
import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js";
export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  data: () => ({
    file: null,
    pagina: 1,
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
    onClick(json) {
      this.datos = json;
      console.log(this.datos[0]);
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
          return true;
        }
      }
      return false;
    }
  }
};
</script>
