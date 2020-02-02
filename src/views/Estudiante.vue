<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center">
          <v-row justify="center" align="center">
            <Importar
              :dialog="importar"
              :idcongreso="parseInt(this.$route.params.congreso, 10)"
              @click="agregar()"
            ></Importar>
            <Exportar
              :nombre="congreso"
              :collection="excel"
              v-if="estudiantes.length > 0"
            ></Exportar>
          </v-row>
          <v-spacer></v-spacer>
          <v-row align="center" justify="center">
            <img
              src="https://cdn1.iconfinder.com/data/icons/streaming-services-2/256/TV_Schedule-512.png"
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
          :items="estudiantes"
          :search="busqueda"
          :page.sync="pagina"
          :loading="load"
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
    estudiantes: [],
    excel: [],
    congreso: "",
    importar: false,
    busqueda: "",
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "codigo" },
      { text: "Carrera", align: "center", value: "carrera" },
      { text: "Regional", align: "center", value: "regional" },
      { text: "Opcion", align: "center", value: "opciones" }
    ]
  }),
  methods: {
    agregar() {
      this.importar = !this.importar;
    },
    async listar(congreso) {
      const URL =
        this.$path + "estudiantes_congreso?tipo=1&idCongreso=" + congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.llenar(response.data);
        })
        .catch(e => console.log(e));
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
      this.load = false;
    },
    completo(listado) {
      listado.forEach(x => {
        const est = x.estudiante;
        const ac = x.accion;
        const estudiante = {
          codigo: est.codigo,
          nombre: est.nombre,
          carrera: est.carrera.nombre,
          regional: est.regional.alias,
          asistio: ac.registro === 1 ? "si" : "no",
          break_am: ac.break_am === 1 ? "si" : "no",
          almuerzo: ac.almuerzo === 1 ? "si" : "no",
          break_pm: ac.break_pm === 1 ? "si" : "no",
          abono: x.abono
        };
        this.estudiantes.push(estudiante);
      });
      this.excel.push({
        nombre: "estudiantes",
        datos: this.estudiantes
      });
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
        descripcion,
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
      this.excel.push({
        nombre: "resumen",
        datos: resumen
      });
    },
    titulo(listado) {
      this.excel.push({
        nombre: "titulo",
        datos: [
          {
            nombre: listado[0].congreso.nombre,
            fecha: listado[0].congreso.fecha
          }
        ]
      });
    }
  },
  mounted() {
    this.listar(this.$route.params.congreso);
    this.listaExtra();
  }
};
</script>
