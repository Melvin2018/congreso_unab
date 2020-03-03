<template>
  <v-dialog v-model="modal" persistent max-width="625">
    <v-card>
      <v-toolbar dark height="50" color="primary">
        <v-col cols="12" lg="11">
          <v-layout justify-center row>
            <img
              src="https://cdn3.iconfinder.com/data/icons/academy-5/64/time_and_date-schedule-administration-date-calendars-organization-calendar-interface-time-512.png"
              height="40px"
              width="40px"
            />
            <h2 class="display-1 white--text font-weight-light">Exportar</h2>
          </v-layout>
        </v-col>
        <v-btn text icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          v-model="correos"
          item-key="id"
          :headers="columnas"
          :items="personal"
          show-select
          :items-per-page="10"
          loading-text="Cargando..."
          no-data-text="no hay datos"
          hide-default-footer
        ></v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn color="primary" @click="enviarCorreos">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  props: {
    collection: {
      type: Array,
      default: [],
      required: true
    }
  },
  computed: {
    congreso() {
      return this.$store.state.congreso;
    },
    modal() {
      const modal = this.$store.state.estudiante.modalExportar;
      if (modal & (this.personal.length == 0)) {
        this.listarPersonas();
      }
      return modal;
    }
  },
  watch: {
    correos: function(x) {
      console.log(x);
    }
  },
  data: () => ({
    personal: [],
    correos: [],
    columnas: [
      { text: "Nombre", align: "center", value: "nombre" },
      { text: "Codigo", align: "center", value: "email" },
      { text: "Tipo", align: "center", value: "tipo" }
    ]
  }),
  methods: {
    close() {
      this.$store.state.estudiante.modalExportar = false;
    },
    async enviarCorreos() {
    this.exportPDF();
    },
    async listarPersonas() {
      const URL = this.$path + "personal/" + this.congreso.id;
      await this.$axios
        .get(URL)
        .then(response => {
          this.completo(response.data.personal);
        })
        .catch(e =>
          this.$router.push({
            name: "error",
            params: {
              tipo: false
            }
          })
        );
    },
    completo(lista) {
      this.personal = [];
      lista.forEach(x => {
        let est = x.personal;
        const obj = {
          id:x.id,
          email: est.email,
          nombre: est.nombre,
          tipo: est.tipo.nombre
        };
        this.personal.push(obj);
      });
    },
    exportPDF() {
      let doc = new jsPDF().setProperties({ title: "Reporte" });
      let isPersonal = false;
      let height = 0;
      this.collection.forEach(lista => {
        if (lista.nombre === "titulo") {
          doc.setFontSize(18);
          height += 15;
          doc.text("Reporte del " + lista.datos[0].nombre, 100, height, {
            maxWidth: "150",
            align: "center"
          });
          doc.setFontSize(12);
          height += 17;
          doc.text("Fecha: " + lista.datos[0].fecha, 10, height);
          isPersonal = lista.datos[0].regional === undefined;
          height += 8;
          if (!isPersonal) {
            doc.text("Regional: " + lista.datos[0].regional, 10, height);
          } else {
            doc.text("Tipo: " + lista.datos[0].tipo, 10, height);
          }
        } else {
          let columns = [];
          for (let x of Object.keys(lista.datos[0])) {
            columns.push({
              title: x.toUpperCase(),
              dataKey: x
            });
          }
          let styles = {};
          if (lista.nombre === "resumen") {
            styles = { cellWidth: 20 };
          } else {
            styles = { cellWidth: "auto" };
          }
          height += 5;
          doc.autoTable({
            styles,
            headStyles: { fontSize: 5 },
            bodyStyles: { fontSize: 5 },
            margin: { top: height },
            body: lista.datos,
            columns: columns
          });
        }
      });
      let letra = isPersonal ? "-Personal" : "-Estudiantes";
      doc.save(this.congreso.nombre.concat(letra).concat(".pdf"));
    }
  }
};
</script>
