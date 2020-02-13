<template>
  <v-container>
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-card-title class="blue lighten-1 justify-center">
          <v-row align="center" justify="center">
            <img
              src="https://cdn3.iconfinder.com/data/icons/academy-5/64/time_and_date-schedule-administration-date-calendars-organization-calendar-interface-time-512.png"
              height="40px"
              width="40px"
            />
            <v-card-title class="headline white--text font-weight-light">
              <h3>
              Nuevo Congreso
            </h3>
            </v-card-title>
            
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
      precio: 65,
      fondo:
        "http://www.fundacionindex.com/blog_oebe/wp-content/uploads/2018/05/solucion-organizacional-organizational-problem-solving-300x171.jpg"
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
        this.$router.push("/evento/vista");
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
