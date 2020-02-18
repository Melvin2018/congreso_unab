<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark height="50">
          <v-layout justify-center row>
            <img
              src="https://cdn4.iconfinder.com/data/icons/ikooni-outline-project-planning/128/planning-15-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">Nuevo estudiante</h2>
          </v-layout>
        </v-toolbar>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
                id="nombre"
                label="Nombre"
                v-model="est.nombre"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
                id="codigo"
                label="codigo"
                v-model="est.codigo"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-select v-model="evento.carrera" label="carrera" :items="carreras">
                <template slot="selection" slot-scope="data">
                  <span>{{data.item.nombre}}</span>
                </template>
                <template slot="item" slot-scope="data">{{data.item.nombre}}</template>
              </v-select>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8 xs8>
              <v-text-field
                v-model.number="est.abono"
                type="number"
                :counter="3"
                prepend-icon="mdi-cash-multiple"
                label="abono"
                required
              ></v-text-field>
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
    est: {
      codigo: "",
      nombre: "",
      carrera: 0,
      regional: 0,
      abono: 0
    }
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "congresos";
        await this.$axios.post(URL, this.evento).catch(e => console.log(e));
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
      this.evento.lugar = lu ? lu[0] : {};
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
