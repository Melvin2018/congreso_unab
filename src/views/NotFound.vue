<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xl6 sm6 xs6 md6 lg6>
        <v-card>
          <v-toolbar dark color="error">
            <v-toolbar-title>{{error}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout justify-center>
              <v-alert>{{mensaje}}</v-alert>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <a href="/">Inicio</a>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tipo: true
  }),
  mounted() {
    let router = this.$route.params.tipo;
    if (router != null) {
      this.tipo = router;
    }
  },
  computed: {
    error() {
      if (this.tipo) {
        return "Error 404";
      }
      return "Error de conexión";
    },
    mensaje() {
      if (this.tipo) {
        return "no se ha encontrado la pagina solicitada";
      }
      return "no se ha establecido la conexión correcta, por lo tanto no se puede mostrar la pagina solicitada";
    }
  }
};
</script>
<style>
</style>