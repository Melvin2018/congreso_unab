<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar color="green" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Nuevo congreso" />
          </v-col>
          <v-spacer></v-spacer>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
                color="green"
                id="nombre"
                label="Nombre del evento"
                v-model="evento.nombre"
                prepend-icon="mdi-script"
                :rules="nombreRol"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    color="green"
                    v-model="evento.fecha"
                    label="fecha del evento"
                    prepend-icon="mdi-calendar-range"
                    readonly
                    required
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="evento.fecha" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
                color="green"
                v-model.number="evento.precio"
                type="number"
                :counter="3"
                prepend-icon="mdi-cash-multiple"
                :rules="precioRol"
                label="Precio"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-select
                color="green"
                v-model="evento.lugar"
                label="Lugar"
                item-value="id"
                item-text="nombre"
                :items="lugares"
              ></v-select>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-select
                color="green"
                v-model="categoria"
                label="Categoria"
                item-text="nombre"
                :items="categorias"
              ></v-select>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-radio-group v-model="evento.fondo" label="Fondo">
                <v-row justify="center">
                  <v-col v-for="fondo in fondosCategoria" :key="fondo.id" cols="4">
                    <v-radio :value="fondo.url"></v-radio>
                    <v-img
                      :src="fondo.url"
                      lazy-src="https://lh6.googleusercontent.com/-k2rwhrJfhT4/U0LXvlh92tI/AAAAAAAAENE/pg1CcMxOhiY/s480/universidad-andres-bello-chalatenango.jpg"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      height="100"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valido" color="success" class="mr-4" @click="onClick">Guardar</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">Limpiar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import Titulo from "@/components/Titulo.vue";
export default {
  components: {
    Titulo
  },
  computed: {
    fondosCategoria() {
      const lista = this.fondos.filter(
        y => this.categoria === y.categoria.nombre
      );
      this.evento.fondo = lista.length > 0 ? lista[0].url : "";
      return lista;
    },
    modal() {
      return this.$store.state.modalEvento;
    }
  },
  data: () => ({
    categoria: "",
    categorias: [],
    fondos: [],
    valido: true,
    menu: false,
    lugares: [],
    evento: {
      nombre: "",
      fecha: new Date().toISOString().substr(0, 10),
      precio: 65,
      estado: 1,
      fondo: "",
      lugar: 0
    },
    nombreRol: [v => !!v || "Nombre obligatorio"],
    precioRol: [
      v => !!v || "Precio obligatorio",
      v => (v && v < 1000) || "Sobrepaso de caracteres",
      v => (v && v > 0) || "debe escribir un numero positivo"
    ]
  }),
  methods: {
    close() {
      this.$store.state.modalEvento = false;
    },
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "congresos";
        await this.$axios.post(URL, this.evento).catch(e => console.log(e));
        this.$emit("evento", this.evento);
        this.close();
        this.$router.go();
      }
    },
    async reset() {
      await this.$refs.form.reset();
      this.evento.fecha = new Date().toISOString().substr(0, 10);
    },
    async listarLugares() {
      await this.$axios
        .get(this.$path.concat("lugares"))
        .then(response => {
          this.lugares = response.data;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
      const lu = this.lugares;
      this.evento.lugar = lu.length > 0 ? lu[0].id : "";
    },
    async listarCategorias() {
      await this.$axios
        .get(this.$path.concat("categorias"))
        .then(response => {
          this.categorias = response.data;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
      const lu = this.categorias;
      this.categoria = lu.length > 0 ? lu[0].nombre : "";
    },
    async listarFondos() {
      await this.$axios
        .get(this.$path.concat("fondos"))
        .then(response => {
          this.fondos = response.data;
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
    }
  },
  created() {
    this.listarLugares();
    this.listarCategorias();
    this.listarFondos();
  }
};
</script>
<style></style>
