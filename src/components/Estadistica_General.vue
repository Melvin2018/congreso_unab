<template>
  <v-layout justify-space-between>
    <v-flex md3>
      <v-col cols="12" lg="11">
        <v-card>
          <v-data-table
            :headers="columnas"
            :items="datos"
            hide-default-footer
            item-key="id"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-flex>
    <v-flex md9>
      <grafica :datos="datos" v-if="datos" />
    </v-flex>
  </v-layout>
</template>
<script>
import Grafica from "./Grafica.vue";
export default {
  nombre: "Estadistica_estudiante",
  components: {
    Grafica
  },
  data: () => ({
    datos: []
  }),
  computed: {
    store() {
      return this.$store.state.estadisticas;
    },
    estudiante() {
      return this.store.estudiantes;
    },
    personal() {
      return this.store.personal;
    },
    columnas() {
      return this.store.columnas;
    }
  },
  methods: {
    datos1() {
      const personal = Array.from(this.personal);
      const estudiante = Array.from(this.estudiante);
      estudiante.forEach(x => {
        let cantidad =
          x.cantidad + personal.find(p => p.name === x.name).cantidad;
        this.datos.push({ name: x.name, cantidad });
      });
    }
  },
  mounted() {
    this.datos1();
  }
};
</script>


