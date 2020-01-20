<template>
  <v-container>
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-card-title class="blue lighten-1 justify-center">
          <v-row align="center" justify="center">
            <img
              src="https://cdn4.iconfinder.com/data/icons/ikooni-outline-project-planning/128/planning-15-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">
              Nuevo evento
            </h2>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                id="nombre"
                label="Nombre del evento"
                v-model="evento.nombre"
                prepend-icon="mdi-script"
                :rules="nombreRol"
                clearable
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
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
                <v-date-picker
                  v-model="evento.fecha"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model.number="evento.precio"
                type="number"
                :counter="3"
                prepend-icon="mdi-cash-multiple"
                :rules="precioRol"
                label="Precio"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valido"
            color="success"
            class="mr-4"
            @click="onClick"
          >
            Guardar
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset">
            Limpiar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valido: true,
    menu: false,
    evento: {
      nombre: "",
      fecha: new Date().toISOString().substr(0, 10),
      precio: 1
    },
    nombreRol: [v => !!v || "Nombre obligatorio"],
    precioRol: [
      v => !!v || "Precio obligatorio",
      v => (v && v < 1000) || "Sobrepaso de caracteres",
      v => (v && v > 0) || "debe escribir un numero positivo"
    ]
  }),
  methods: {
    onClick() {
      if (this.$refs.form.validate()) {
        alert(JSON.stringify(this.evento));
      }
    },
    async reset() {
      await this.$refs.form.reset();
      this.evento.fecha = new Date().toISOString().substr(0, 10);
    }
  }
};
</script>
<style></style>
