<template>
  <v-layout justify-space-between>
    <v-flex md3>
      <v-col cols="12" lg="11">
        <v-select :items="regionales" filled dense label="Regional" v-model="regional"></v-select>
        <v-card>
          <v-data-table
            :headers="columnas"
            :items="estudiantes"
            hide-default-footer
            item-key="id"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-flex>
    <v-flex md9>
      <grafica :datos="estudiantes" />
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
    regionales: ["todas"],
    regional: "",
    estudiantes: []
  }),
  watch: {
    regional: function(x) {
      this.estudiantes1();
    }
  },
  computed: {
    store() {
      return this.$store.state.estadisticas;
    },
    data() {
      return this.store.data;
    },
    columnas() {
      return this.store.columnas;
    }
  },
  methods: {
    estudiantes1() {
      if (this.data) {
        const estudiantes = this.data[0].estudiantes;
        this.estudiantes =
          this.regional == "todas"
            ? this.todos(estudiantes)
            : this.regional_estudiante(estudiantes);
      }
    },
    todos(estudiantes) {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };
      obj.total += estudiantes.SS.total;
      obj.total += estudiantes.CH.total;
      obj.total += estudiantes.SM.total;
      obj.total += estudiantes.SO.total;
      obj.registrados += estudiantes.SS.registrados;
      obj.registrados += estudiantes.CH.registrados;
      obj.registrados += estudiantes.SM.registrados;
      obj.registrados += estudiantes.SO.registrados;
      obj.break_am += estudiantes.SS.break_am;
      obj.break_am += estudiantes.CH.break_am;
      obj.break_am += estudiantes.SM.break_am;
      obj.break_am += estudiantes.SO.break_am;
      obj.almuerzo += estudiantes.SS.almuerzo;
      obj.almuerzo += estudiantes.CH.almuerzo;
      obj.almuerzo += estudiantes.SM.almuerzo;
      obj.almuerzo += estudiantes.SO.almuerzo;
      obj.break_pm += estudiantes.SS.break_pm;
      obj.break_pm += estudiantes.CH.break_pm;
      obj.break_pm += estudiantes.SM.break_pm;
      obj.break_pm += estudiantes.SO.break_pm;
      const lista = this.lista(obj);
      this.$store.state.estadisticas.estudiantes = lista;
      return lista;
    },
    regional_estudiante(estudiante) {
      const regional = this.regional;
      switch (regional) {
        case "San Salvador":
          return this.regional_cantidad(estudiante.SS);
        case "San Miguel":
          return this.regional_cantidad(estudiante.SM);
        case "Chalatenango":
          return this.regional_cantidad(estudiante.CH);
        case "Sonsonate":
          return this.regional_cantidad(estudiante.SO);
        default:
          return [];
      }
    },
    regional_cantidad(regional) {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };
      obj.total += regional.total;
      obj.registrados += regional.registrados;
      obj.break_am += regional.break_am;
      obj.almuerzo += regional.almuerzo;
      obj.break_pm += regional.break_pm;
      return this.lista(obj);
    },
    lista(obj) {
      let lista = [];
      lista.push({ name: "Total", cantidad: obj.total });
      lista.push({ name: "Registrados", cantidad: obj.registrados });
      lista.push({ name: "Break AM", cantidad: obj.break_am });
      lista.push({ name: "Almuerzo", cantidad: obj.almuerzo });
      lista.push({ name: "Break PM", cantidad: obj.break_pm });
      return lista;
    },
    async listarRegional() {
      await this.$axios
        .get(this.$path.concat("regionales"))
        .then(response => {
          Array.from(response.data).forEach(x => {
            this.regionales.push(x.nombre);
          });
        })
        .catch(e => console.log(e));
      this.regional = this.regionales[0];
    }
  },
  mounted() {
    this.listarRegional();
  }
};
</script>


