<template>
  <v-layout justify-space-between>
    <v-flex md3>
      <v-col cols="12" lg="11">
        <v-select :items="tipos" filled dense label="Tipo" v-model="tipo"></v-select>
        <v-card>
          <v-data-table
            :headers="columnas"
            :items="personal"
            hide-default-footer
            item-key="id"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-flex>
    <v-flex md9>
      <grafica :datos="personal" />
    </v-flex>
  </v-layout>
</template>
<script>
import Grafica from "./Grafica.vue";
export default {
  nombre: "Estadistica_personal",
  components: {
    Grafica
  },
  data: () => ({
    tipos: ["todos"],
    tipo: "",
    personal: []
  }),
  watch: {
    tipo: function(x) {
      this.personal1();
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
    personal1() {
      if (this.data) {
        const personal = this.data[1].personal;
        this.personal =
          this.tipo == "todos"
            ? this.todos(personal)
            : this.tipo_personal(personal);
      }
    },
    todos(personal) {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };

      obj.total += personal.Autoridad.total;
      obj.total += personal.Invitado.total;
      obj.total += personal.Docente.total;
      obj.total += personal.Ponente.total;
      obj.total += personal.Equipo.total;
      obj.registrados += personal.Autoridad.registrados;
      obj.registrados += personal.Invitado.registrados;
      obj.registrados += personal.Docente.registrados;
      obj.registrados += personal.Ponente.registrados;
      obj.registrados += personal.Equipo.registrados;
      obj.break_am += personal.Autoridad.break_am;
      obj.break_am += personal.Invitado.break_am;
      obj.break_am += personal.Docente.break_am;
      obj.break_am += personal.Ponente.break_am;
      obj.break_am += personal.Equipo.break_am;
      obj.almuerzo += personal.Autoridad.almuerzo;
      obj.almuerzo += personal.Invitado.almuerzo;
      obj.almuerzo += personal.Docente.almuerzo;
      obj.almuerzo += personal.Ponente.almuerzo;
      obj.almuerzo += personal.Equipo.almuerzo;
      obj.break_pm += personal.Autoridad.break_pm;
      obj.break_pm += personal.Invitado.break_pm;
      obj.break_pm += personal.Docente.break_pm;
      obj.break_pm += personal.Ponente.break_pm;
      obj.break_pm += personal.Equipo.break_pm;
      const lista = this.lista(obj);
      this.$store.state.estadisticas.personal = lista;
      return lista;
    },
    tipo_personal(personal) {
      const tipo = this.tipo;
      switch (tipo) {
        case "Autoridad":
          return this.tipo_cantidad(personal.Autoridad);
        case "Invitado":
          return this.tipo_cantidad(personal.Invitado);
        case "Docente":
          return this.tipo_cantidad(personal.Docente);
        case "Ponente":
          return this.tipo_cantidad(personal.Ponente);
        case "Equipo":
          return this.tipo_cantidad(personal.Equipo);
        default:
          return [];
      }
    },
    tipo_cantidad(tipo) {
      let obj = {
        total: 0,
        registrados: 0,
        break_am: 0,
        almuerzo: 0,
        break_pm: 0
      };
      obj.total += tipo.total;
      obj.registrados += tipo.registrados;
      obj.break_am += tipo.break_am;
      obj.almuerzo += tipo.almuerzo;
      obj.break_pm += tipo.break_pm;
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
    async listartipo() {
      await this.$axios
        .get(this.$path.concat("tipos"))
        .then(response => {
          Array.from(response.data).forEach(x => {
            this.tipos.push(x.nombre);
          });
        })
        .catch(e => console.log(e));
      this.tipo = this.tipos[0];
    }
  },
  mounted() {
    this.listartipo();
  }
};
</script>


