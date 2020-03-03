<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xl6 sm6 xs6 md6 lg6>
        <v-card>
          <v-toolbar dark color="error">
            <v-toolbar-title><h3>{{error}}</h3></v-toolbar-title>
          </v-toolbar>
          
          
          <v-card-text>
            <v-layout justify-center>
              <img
                src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678080-shield-error-512.png"
                height="100px"
                width="100px"
              />
              
              <v-alert><h3>{{mensaje}}</h3></v-alert>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange">
            <a href="/">Inicio</a>
            </v-btn>
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
        return "¡Ooops... Error 404!";
      }
      return "Error de conexión";
    },
    mensaje() {
      if (this.tipo) {
        return "No se ha encontrado la página solicitada, revise que exista conexión a internet.";
      }
      return "No se ha establecido la conexión correcta, por lo tanto no se puede mostrar la pagina solicitada";
    }
  }
};
</script>
<style>
</style>