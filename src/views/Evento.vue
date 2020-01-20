<template>
  <v-container>
    <v-card>
      <v-card-title class="blue lighten-1 justify-center">
        <v-row justify="center">
          <v-col>
            <v-btn fab color="secondary" @click="onClick"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-row align="center" justify="center">
            <img
              src="https://cdn2.iconfinder.com/data/icons/unigrid-phantom-layout-vol-3/60/021_112_layout_wireframe_grid_search_list-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">
              Congresos
            </h2>
          </v-row>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="busqueda"
            label="busqueda"
            outlined
            dark
            color="secondary"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
      </v-card-title>
      <v-card>
        <v-card-title class="gray lighten-1">
          <v-tabs fixed-tabs v-model="tabs" centered>
            <v-tab>Activos</v-tab>
            <v-tab>inactivos</v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-container fluid>
                <v-row dense>
                  <v-col v-for="evento in activos" :key="evento.id" :cols="12">
                    <v-card class="mx-auto width">
                      <v-img
                        class="white--text align-end"
                        :src="evento.fondo"
                        height="250px"
                      >
                        <v-card-title
                          ><h3>{{ evento.nombre }}</h3>
                          <v-spacer></v-spacer>
                          <h3>{{ evento.fecha }}</h3>
                        </v-card-title>
                      </v-img>

                      <v-card-actions>
                        <h2>{{ evento.nombre }}</h2>
                        <v-spacer></v-spacer>
                        <v-btn rounded>
                          <v-icon>mdi-file-export</v-icon>
                          estudiantes
                        </v-btn>
                        <v-btn rounded>
                          <v-icon>mdi-clipboard-list</v-icon>
                          personal
                        </v-btn>
                        <v-btn rounded>
                          <v-icon>mdi-graph</v-icon>
                          estadisticas
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container fluid>
                <v-row dense>
                  <v-col
                    v-for="evento in inactivos"
                    :key="evento.id"
                    :cols="12"
                  >
                    <v-card class="mx-auto" max-width="1000">
                      <v-img :src="evento.fondo" height="200px">
                        <v-container fill-height fluid pa-2>
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                              <span
                                class="headline white--text"
                                v-text="evento.nombre"
                              ></span>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-img>

                      <v-card-actions>
                        <v-btn color="secondary" rounded>
                          <v-icon>mdi-file-export</v-icon>
                          exportar
                        </v-btn>
                        <v-btn color="secondary" rounded>
                          <v-icon>mdi-clipboard-list</v-icon>
                          listar
                        </v-btn>
                        <v-spacer></v-spacer>
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
  </v-container>
</template>
<script>
export default {
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
    numPagina: 0,
    eventos: [],
    busqueda: ""
  }),
  methods: {
    onClick() {
      this.$router.push("/evento/nuevo");
    },
    async listar() {
      const URL = this.$path + "/api/congresos";
      await this.$axios
        .get(URL)
        .then(response => {
          this.eventos = response.data;
        })
        .catch(e => console.log(e));
    },
    listarEstudiante(estudiante) {
      this.$router.push({
        name: "estudianteCongreso",
        params: {
          id: estudiante
        }
      });
    }
  },
  mounted() {
    this.listar();
  }
};
</script>

<style>
.width {
  width: 80%;
}
</style>
