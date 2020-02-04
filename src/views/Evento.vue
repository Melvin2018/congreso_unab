<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
    <v-card >
      <v-card-title id="exp" class="light-blue accent-3 justify-center">
        <v-row justify="center">
          <v-col>
            <v-btn class="mx-2" fab dark color="success" @click="onClick"
              ><v-icon dark>mdi-domain</v-icon></v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-row align="center" justify="center">
            
            <v-spacer></v-spacer>
            <h3 class="display-1 white--text font-weight-light">
              Congresos
            </h3>
          </v-row>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="busqueda"
            label="Busqueda"
            outlined
            dark
            color="#E0F7FA"
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
          <div class="text-center" v-if="load">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
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
                        <v-btn rounded @click="listar(evento, 'estudiante')" color="light-green darken-1">
                          <v-icon>mdi-file-export</v-icon>
                          estudiantes
                        </v-btn>
                        <v-btn rounded @click="listar(evento, 'personal')" color="blue">
                          <v-icon>mdi-clipboard-list</v-icon>
                          personal
                        </v-btn>
                        <v-btn rounded @click="listar(evento, 'estadistica')" color="orange">
                          <v-icon>mdi-graph</v-icon>
                          estadisticas
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn rounded @click="eliminar(evento)" color="red">
                          <v-icon>mdi-delete</v-icon>
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
                        <v-btn rounded @click="listar(evento, 'estudiante')" color="light-green darken-1">
                          <v-icon>mdi-file-export</v-icon>
                          estudiantes
                        </v-btn>
                        <v-btn rounded @click="listar(evento, 'personal')" color="blue">
                          <v-icon>mdi-clipboard-list</v-icon>
                          personal
                        </v-btn>
                        <v-btn rounded @click="listar(evento, 'estadistica')" color="orange">
                          <v-icon>mdi-graph</v-icon>
                          estadisticas
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
    async eliminar(congreso) {
      const URL = this.$path + "congresos";
      await this.$axios
        .delete(this.$path.concat("congresos?id=").concat(congreso.id))
        .catch(e => console.log(e));
      this.eventos.splice(this.eventos.indexOf(congreso), 1);
    },
    async listarEventos() {
      this.load = true;
      const URL = this.$path + "congresos";
      await this.$axios
        .get(this.$path.concat("congresos"))
        .then(response => {
          this.eventos = response.data;
        })
        .catch(e => console.log(e));
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
<style>
.width {
  width: 100%;
}
</style>
<style scoped>
#exp {
  margin: 1%;
}
</style>
