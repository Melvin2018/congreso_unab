<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark height="50">
          <v-layout justify-center row>
            <img
              src="https://cdn3.iconfinder.com/data/icons/academy-5/64/time_and_date-schedule-administration-date-calendars-organization-calendar-interface-time-512.png"
              height="40px"
              width="40px"
            />
<<<<<<< HEAD:src/components/Nuevo_Evento.vue
            <h2 class="display-1 white--text font-weight-light">Nuevo congreso</h2>
          </v-layout>
        </v-toolbar>
=======
            <v-card-title class="headline white--text font-weight-light">
              <h3>
              Nuevo Congreso
            </h3>
            </v-card-title>
            
          </v-row>
        </v-card-title>
>>>>>>> 9521af83ae6e1dedc40b2d66bf5f0d5c9edfddb8:src/views/Nuevo_Evento.vue
        <v-card-text>
          <v-layout row justify-center>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
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
              <v-file-input
                v-model="file"
                label="foto"
                accept="image/*"
                prepend-icon="mdi-file"
                counter
              />
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
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
              <v-select v-model="evento.lugar" label="Lugar" :items="lugares">
                <template slot="selection" slot-scope="data">
                  <span>{{data.item.nombre}}</span>
                </template>
                <template slot="item" slot-scope="data">{{data.item.nombre}}</template>
              </v-select>
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
export default {
  props: {
    modal: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => ({
    valido: true,
    menu: false,
    file: null,
    lugares: [],
    evento: {
      nombre: "",
      fecha: new Date().toISOString().substr(0, 10),
      precio: 65,
      fondo: "",
      lugar: {}
    },
    nombreRol: [v => !!v || "Nombre obligatorio"],
    precioRol: [
      v => !!v || "Precio obligatorio",
      v => (v && v < 1000) || "Sobrepaso de caracteres",
      v => (v && v > 0) || "debe escribir un numero positivo"
    ]
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "congresos";
        await this.$axios.post(URL, this.evento).catch(e => console.log(e));
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
        .catch(e => console.log(e));
      const lu = this.lugares;
      //   this.evento.lugar = lu ? lu[0] : {};
      // .catch(e =>
      //   this.$router.push({
      //     name: "error",
      //     params: {
      //       tipo: false
      //     }
      //   })
      // );
    }
  },
  created() {
    this.listarLugares();
  }
};
</script>
<style></style>
