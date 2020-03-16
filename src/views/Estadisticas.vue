<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary" height="80">
            <v-layout align-center justify-space-around>
              <v-flex md11>
                <titulo titulo="Estadisticas" />
              </v-flex>
              <v-btn class="ma-6" outlined color="secundary" grow @click="actulizar">
                <v-icon>mdi-history</v-icon>
              </v-btn>
            </v-layout>
          </v-toolbar>
          <v-card>
            <v-toolbar>
              <v-tabs fixed-tabs v-model="tabs" centered>
                <v-tab>
                  <h3>Estudiante</h3>
                </v-tab>
                <v-tab>
                  <h3>Personal</h3>
                </v-tab>
                <v-tab :disabled="estudiante.length==0">
                  <h3>General</h3>
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <v-card-text>
              <v-tabs-items v-model="tabs" v-if="!load">
                <v-tab-item>
                  <estudiante />
                </v-tab-item>
                <v-tab-item>
                  <personal />
                </v-tab-item>
                <v-tab-item>
                  <general />
                </v-tab-item>
              </v-tabs-items>
              <div class="text-center" v-else>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Titulo from "@/components/Titulo.vue";
import Estadistica_Estudiante from "../components/Estadistica_Estudiante";
import Estadistica_Personal from "../components/Estadistica_Personal";
import General from "../components/Estadistica_General";
export default {
  nombre: "Estadistica",
  components: {
    Titulo,
    estudiante: Estadistica_Estudiante,
    personal: Estadistica_Personal,
    General
  },
  data() {
    return {
      tabs: 1,
      load: true,
      datos: []
    };
  },
  computed: {
    estudiante() {
      return this.$store.state.estadisticas.estudiantes;
    }
  },
  methods: {
    async listar() {
      const URL = this.$path + "estadisticas/" + this.$route.params.congreso;
      await this.$axios
        .get(URL)
        .then(response => {
          this.datos = response.data.estadisticas;
          this.$store.state.estadisticas.congreso = response.data.congreso;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
      this.$store.state.estadisticas.data = this.datos;
      this.load = false;
    },
    columnas() {
      this.$store.state.estadisticas.columnas = [
        { text: "Resumen", align: "center", value: "name" },
        { text: "Cantidad", align: "center", value: "cantidad" }
      ];
    },
    actulizar() {
      this.$router.go();
    },
    personal() {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };
      const personal = this.datos[1].personal;
      obj.total += personal.Autoridad.total;
      obj.total += personal.Invitado.total;
      obj.total += personal.Docente.total;
      obj.total += personal.Ponente.total;
      obj.total += personal.Equipo.total;
      obj.registrados += personal.Autoridad.registrados;
      obj.registrados += personal.Invitado.registrados;
      obj.registrados += personal.Docente.registrados;
      obj.registrados += personal.Ponente.registrados;
      obj.registrados += personal.Equipo.registrados;
      obj.break_am += personal.Autoridad.break_am;
      obj.break_am += personal.Invitado.break_am;
      obj.break_am += personal.Docente.break_am;
      obj.break_am += personal.Ponente.break_am;
      obj.break_am += personal.Equipo.break_am;
      obj.almuerzo += personal.Autoridad.almuerzo;
      obj.almuerzo += personal.Invitado.almuerzo;
      obj.almuerzo += personal.Docente.almuerzo;
      obj.almuerzo += personal.Ponente.almuerzo;
      obj.almuerzo += personal.Equipo.almuerzo;
      obj.break_pm += personal.Autoridad.break_pm;
      obj.break_pm += personal.Invitado.break_pm;
      obj.break_pm += personal.Docente.break_pm;
      obj.break_pm += personal.Ponente.break_pm;
      obj.break_pm += personal.Equipo.break_pm;
      const lista = this.lista(obj);
      this.$store.state.estadisticas.personal = lista;
      return lista;
    },
    estudiantes() {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };
      console.log(this.datos);
      const estudiantes = this.datos[0].estudiantes;
      obj.total += estudiantes.SS.total;
      obj.total += estudiantes.CH.total;
      obj.total += estudiantes.SM.total;
      obj.total += estudiantes.SO.total;
      obj.registrados += estudiantes.SS.registrados;
      obj.registrados += estudiantes.CH.registrados;
      obj.registrados += estudiantes.SM.registrados;
      obj.registrados += estudiantes.SO.registrados;
      obj.break_am += estudiantes.SS.break_am;
      obj.break_am += estudiantes.CH.break_am;
      obj.break_am += estudiantes.SM.break_am;
      obj.break_am += estudiantes.SO.break_am;
      obj.almuerzo += estudiantes.SS.almuerzo;
      obj.almuerzo += estudiantes.CH.almuerzo;
      obj.almuerzo += estudiantes.SM.almuerzo;
      obj.almuerzo += estudiantes.SO.almuerzo;
      obj.break_pm += estudiantes.SS.break_pm;
      obj.break_pm += estudiantes.CH.break_pm;
      obj.break_pm += estudiantes.SM.break_pm;
      obj.break_pm += estudiantes.SO.break_pm;
      const lista = this.lista(obj);
      this.$store.state.estadisticas.estudiantes = lista;
      return lista;
    },
    lista(obj) {
      let lista = [];
      lista.push({ name: "Total", cantidad: obj.total });
      lista.push({ name: "Registrados", cantidad: obj.registrados });
      lista.push({ name: "Break AM", cantidad: obj.break_am });
      lista.push({ name: "Almuerzo", cantidad: obj.almuerzo });
      lista.push({ name: "Break PM", cantidad: obj.break_pm });
      return lista;
    }
  },
  mounted() {
    this.listar();
    this.columnas();
    this.estudiantes();
    this.personal();
  }
};
</script>




