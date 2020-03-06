<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark color="primary" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Nuevo Estudiante" />
          </v-col>
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
                v-model="personal.personal.nombre"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-text-field
                color="green"
                id="Email"
                label="Email"
                v-model="personal.personal.email"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-text-field
                color="green"
                id="Funcion"
                label="Funcion"
                v-model="personal.personal.funcion"
                prepend-icon="mdi-script"
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex md11 d-flex>
              <v-select
                color="green"
                v-model="personal.personal.tipo"
                item-text="nombre"
                item-value="id"
                label="Tipo"
                :items="tipos"
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
      return this.$store.state.personal.modalNuevo;
    },
    congreso() {
      return this.$store.state.congreso.id;
    }
  },
  data: () => ({
    valido: true,
    tipos: [],
    personal: {
      personal: {
        nombre: "",
        email: "",
        tipo: 0,
        funcion: ""
      },
      congreso: 0
    }
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "personal/" + this.congreso;
        this.personal.congreso = this.congreso;
        let lista = [this.personal];
        await this.$axios.post(URL, lista).catch(e => console.log(e));
        this.close();
        this.$router.go();
      }
    },
    close() {
      this.$store.state.personal.modalNuevo = false;
    },
    async reset() {
      await this.$refs.form.reset();
    },
    async listarTipos() {
      await this.$axios
        .get(this.$path.concat("tipos"))
        .then(response => {
          this.tipos = response.data;
        })
        .catch(e => console.log(e));
      this.personal.personal.tipo = this.tipos ? this.tipos[0].id : 0;
    }
  },
  created() {
    this.listarTipos();
  }
};
</script>
