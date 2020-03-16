<template>
  <v-dialog v-model="modal" persistent max-width="700">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark color="primary" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Nueva Fondo" />
          </v-col>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex md11 d-flex>
              <v-text-field
                label="Ruta"
                v-model="fondo.url"
                prepend-icon="mdi-script"
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex sm11>
              <v-select
                v-model="fondo.categoria"
                label="Categoria"
                item-value="id"
                item-text="nombre"
                :items="categorias"
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
      return this.$store.state.modalFondo;
    }
  },
  data: () => ({
    valido: true,
    tipos: [],
    categorias: [],
    fondo: {
      url: "",
      categoria: 1
    }
  }),
  methods: {
    async onClick() {
      if (this.$refs.form.validate()) {
        const URL = this.$path + "fondos";
        await this.$axios.post(URL, [this.fondo]).catch(e => console.log(e));
        this.close();
      }
    },
    close() {
      this.$store.state.modalFondo = false;
    },
    async reset() {
      await this.$refs.form.reset();
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
    }
  },
  mounted() {
    this.listarCategorias();
  }
};
</script>
