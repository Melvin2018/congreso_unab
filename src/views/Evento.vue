<template>
  <v-container class="flex-small-windows">
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar-title dense class="light-blue darken-2 justify-center">
            <v-row justify="center">
              <v-col>
                <v-btn class="mx-2" fab dark color="success" @click="modal=!modal">
                  <v-icon size="x-large" dark>mdi-plus</v-icon>
                </v-btn>
                <nuevo :modal="modal" />
              </v-col>
              <v-spacer></v-spacer>
              <v-row align="center" justify="center">
                <v-spacer></v-spacer>
                <h2 class="display-1 white--text font-weight-light">Congresos</h2>
              </v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  class="mx-8"
                  v-model="busqueda"
                  label="Busqueda"
                  filled
                  dense
                  color="#E0F7FA"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar-title>
          <v-card>
            <v-card-title class="blue lighten-3">
              <v-tabs fixed-tabs v-model="tabs" centered background-color="blue lighten-5">
                <v-tab>
                  <h3>Activos</h3>
                </v-tab>
                <v-tab>
                  <h3>inactivos</h3>
                </v-tab>
              </v-tabs>
            </v-card-title>
            <v-card-text>
              <div class="text-center" v-if="load">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <v-layout justify-center row>
                    <v-col cols="12" md="8" v-for="evento in activos" :key="evento.id">
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          class="mx-auto width"
                          :elevation="hover ? 24 : 4"
                          :class="{ 'on-hover': hover }"
                        >
                          <v-img class="black--text align-start" :src="evento.fondo" height="260px">
                            <v-card-title
                              class="my-4 mx-4 text-center"
                              style="background-color: transparent;"
                            >
                              <h3>{{ evento.nombre }}</h3>
                              <v-spacer></v-spacer>
                              <h3>{{ evento.fecha }}</h3>
                              <v-spacer></v-spacer>
                              <h3>{{evento.lugar.nombre}}</h3>
                            </v-card-title>
                          </v-img>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              outlined
                              @click="listar(evento, 'estudiante')"
                              color="light-green darken-1"
                            >
                              <v-icon>mdi-file-export</v-icon>estudiantes
                            </v-btn>
                            <v-btn outlined @click="listar(evento, 'personal')" color="blue">
                              <v-icon>mdi-clipboard-list</v-icon>personal
                            </v-btn>
                            <v-btn outlined @click="listar(evento, 'estadistica')" color="orange">
                              <v-icon>mdi-graph</v-icon>estadisticas
                            </v-btn>
                            <v-btn outlined @click="eliminar(evento)" color="red">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-container fluid>
                    <v-row dense>
                      <v-col v-for="evento in inactivos" :key="evento.id" :cols="12">
                        <v-card class="mx-auto width">
                          <v-img class="black--text align-end" :src="evento.fondo" height="260px">
                            <v-card-title>
                              <h3>{{ evento.nombre }}</h3>
                              <v-spacer></v-spacer>
                              <h3>{{ evento.fecha }}</h3>
                              <v-spacer></v-spacer>
                              <h3>{{evento.lugar.nombre}}</h3>
                            </v-card-title>
                          </v-img>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              outlined
                              @click="listar(evento, 'estudiante')"
                              color="light-green darken-1"
                            >
                              <v-icon>mdi-file-export</v-icon>estudiantes
                            </v-btn>
                            <v-btn outlined @click="listar(evento, 'personal')" color="blue">
                              <v-icon>mdi-clipboard-list</v-icon>personal
                            </v-btn>
                            <v-btn outlined @click="listar(evento, 'estadistica')" color="orange">
                              <v-icon>mdi-graph</v-icon>estadisticas
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Nuevo from "@/components/Nuevo_Evento.vue";
export default {
  components: {
    Nuevo
  },
  computed: {
    activos() {
      return this.eventos.filter(x => x.estado === 1);
    },
    inactivos() {
      return this.eventos.filter(x => x.estado === 0);
    }
  },
  data: () => ({
    load: true,
    tabs: null,
    pagina: 1,
    modal: false,
    numPagina: 0,
    eventos: [],
    busqueda: ""
  }),
  methods: {
    async eliminar(congreso) {
      const URL = this.$path + "congresos";
      await this.$axios
        .delete(this.$path.concat("congresos?id=").concat(congreso.id))
        .catch(e => console.log(e));
      this.eventos.splice(this.eventos.indexOf(congreso), 1);
    },
    async listarEventos() {
      this.load = true;
      await this.$axios
        .get(this.$path.concat("congresos"))
        .then(response => {
          this.eventos = response.data.congresos;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
      this.load = false;
    },
    listar(congreso, nombre) {
      this.$router.push({
        name: nombre,
        params: {
          congreso: congreso.id
        }
      });
    }
  },
  mounted() {
    this.listarEventos();
  }
};
</script>
<style scope>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.9;
}
</style>

