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
          this.$store.state.estadisticas.congreso=response.data.congreso;
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
    }
  },
  mounted() {
    this.listar();
    this.columnas();
  }
};
</script>




