<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark color="primary" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Nuevo Estudiante" />
          </v-col>
           <v-spacer></v-spacer>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex md11 d-flex>
              <v-text-field
                color="green"
                id="nombre"
                label="Nombre"
                v-model="est_c.estudiante.nombre"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-text-field
                color="green"
                id="codigo"
                label="Código"
                v-model="est_c.estudiante.codigo"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-text-field
                color="green"
                v-model.number="est_c.abono"
                type="number"
                :counter="3"
                prepend-icon="mdi-cash-multiple"
                label="Abono"
                required
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-select
                color="green"
                v-model="est_c.estudiante.carrera"
                item-text="nombre"
                item-value="id"
                label="Carrera"
                :items="carreras"
              ></v-select>
            </v-flex>
            <v-flex md11 d-flex>
              <v-select
                color="green"
                v-model="est_c.estudiante.regional"
                item-text="nombre"
                item-value="id"
                label="Regional"
                :items="regionales"
              ></v-select>
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
    modal() {
      return this.$store.state.estudiante.modalNuevo;
    },
    congreso() {
      return this.$store.state.congreso.id;
    }
  },
  data: () => ({
    valido: true,
    carreras: [],
    regionales: [],
    est_c: {
      abono: 0,
      congreso: 0,
      estudiante: {
        codigo: "",
        nombre: "",
        carrera: 0,
        regional: 0
      }
    }
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "estudiantes/" + this.congreso;
        this.est_c.congreso = this.congreso;
        let lista = [this.est_c];
        await this.$axios.post(URL, lista).catch(e => console.log(e));
        this.close();
        this.$router.go();
      }
    },
    close() {
      this.$store.state.estudiante.modalNuevo = false;
    },
    async reset() {
      await this.$refs.form.reset();
    },
    async listarCarreras() {
      await this.$axios
        .get(this.$path.concat("carreras"))
        .then(response => {
          this.carreras = response.data;
        })
        .catch(e => console.log(e));
      this.est_c.estudiante.carrera = this.carreras ? this.carreras[0].id : 0;
    },
    async listarRegional() {
      await this.$axios
        .get(this.$path.concat("regionales"))
        .then(response => {
          this.regionales = response.data;
        })
        .catch(e => console.log(e));
      this.est_c.estudiante.regional = this.regionales
        ? this.regionales[0].id
        : 0;
    }
  },
  created() {
    this.listarCarreras();
    this.listarRegional();
  }
};
</script>
