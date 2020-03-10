<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark color="primary" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Nueva Carrera" />
          </v-col>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex md11 d-flex>
              <v-text-field
                label="Nombre"
                v-model="nombre"
                prepend-icon="mdi-script"
                clearable
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
import Titulo from "@/components/Titulo.vue";
export default {
  components: {
    Titulo
  },
  computed: {
    modal() {
      return this.$store.state.modalCarrera;
    }
  },
  data: () => ({
    valido: true,
    tipos: [],
    nombre: ""
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "carreras";
        await this.$axios.post(URL, this.nombre).catch(e => console.log(e));
        this.close();
      }
    },
    close() {
      this.$store.state.modalCarrera = false;
    },
    async reset() {
      await this.$refs.form.reset();
    }
  }
};
</script>
