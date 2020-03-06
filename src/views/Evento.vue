<template>
  <v-container class="flex-small-windows">
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary" height="80">
            <v-layout align-center justify-space-around>
              <v-flex md2>
                <v-btn small fab dark color="success" @click="modal()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-flex>
              <v-flex md6>
                <titulo titulo="Congresos" />
              </v-flex>
              <v-spacer></v-spacer>
              <v-layout row align-center justify-end>
                <v-text-field
                  v-model="busqueda"
                  label="Búsqueda"
                  dark
                  filled
                  dense
                  color="#E0F7FA"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-layout>
            </v-layout>
          </v-toolbar>
          <v-card>
            <v-toolbar>
              <v-tabs fixed-tabs v-model="tabs" centered>
                <v-tab>
                  <h3>Activos</h3>
                </v-tab>
                <v-tab>
                  <h3>inactivos</h3>
                </v-tab>
              </v-tabs>
            </v-toolbar>
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
                          <v-img
                            aspect-ratio="1"
                            :src="evento.fondo"
                            height="260px"
                            gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          >
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-row>
                            </template>
                            <v-layout class="my-4 mx-4 text-center" column>
                              <v-layout row align-start justify-space-around>
                                <h1 class="sombreado">{{ evento.nombre }}</h1>
                                <h1 class="sombreado">{{evento.lugar.nombre}}</h1>
                              </v-layout>
                            </v-layout>
                          </v-img>
                          <v-card-actions>
                            <div class="ml-5">
                              <h2 dark>{{ evento.fecha }}</h2>
                            </div>
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
                  <v-layout justify-center row>
                    <v-col cols="12" md="8" v-for="evento in inactivos" :key="evento.id">
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          class="mx-auto width"
                          :elevation="hover ? 24 : 4"
                          :class="{ 'on-hover': hover }"
                        >
                          <v-img class="black--text align-start" :src="evento.fondo" height="260px">
                            <v-layout
                              class="my-4 mx-4 text-center"
                              style="background-color: transparent;"
                              column
                            >
                              <v-layout row align-start justify-space-around>
                                <h1 class="sombreado">{{ evento.nombre }}</h1>
                                <h1 class="sombreado">{{evento.lugar.nombre}}</h1>
                              </v-layout>
                            </v-layout>
                          </v-img>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <h2>{{ evento.fecha }}</h2>
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
              </v-tabs-items>
            </v-card-text>
          </v-card>
          <nuevo @evento="nuevoCongreso" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Nuevo from "@/components/Nuevo_Evento.vue";
import Titulo from "@/components/Titulo.vue";
import Swal from "sweetalert2";
export default {
  components: {
    Nuevo,
    Titulo
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
    numPagina: 0,
    eventos: [],
    todos: [],
    busqueda: ""
  }),
  methods: {
    nuevoCongreso(e) {
      this.eventos.push(e);
    },
    modal() {
      this.$store.state.modalEvento = true;
    },
    async eliminar(congreso) {
      const URL = this.$path + "congresos";
      await this.$axios
        .delete(this.$path.concat("congresos/").concat(congreso.id))
        .then(x => {
          if (x.data.respuesta) {
            this.eventos.splice(this.eventos.indexOf(congreso), 1);
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "no es posible eliminar este congreso",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(e => console.log(e));
    },
    async listarEventos() {
      this.load = true;
      await this.$axios
        .get(this.$path.concat("congresos"))
        .then(response => {
          this.todos = response.data.congresos;
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
      this.$store.state.congreso = congreso;
    }
  },
  watch: {
    busqueda: function(x) {
      console.log(
        (this.eventos = this.todos.filter(function(el) {
          return el.nombre.toLowerCase().indexOf(x.toLowerCase()) > -1;
        }))
      );
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
.sombreado {
  color: white;
  text-shadow: black 0.1em 0.1em 0.4em;
}
.h1 {
  line-height: 200px;
}
</style>

