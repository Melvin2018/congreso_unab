<template>
  <div>
    <v-btn fab @click="exportPDF">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  props: {
    nombre: {
      type: String,
      default: "",
      required: true
    },
    collection: {
      type: Array,
      default: [],
      required: true
    }
  },
  methods: {
    exportPDF() {
      let doc = new jsPDF().setProperties({ title: "Reporte" });
      this.collection.forEach(lista => {
        if (lista.nombre === "titulo") {
          doc.setFontSize(18);
          doc.text(
            "Reporte del " +
              lista.datos[0].nombre +
              " de octavo ciclo, semestre 2, cuarta region al norte.",
            100,
            10,
            {
              maxWidth: "150",
              align: "center"
            }
          );
          doc.setFontSize(12);
          doc.text("Fecha: " + lista.datos[0].fecha, 10, 27);
          doc.text("Regional: " + lista.datos[0].regional, 10, 35);
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
          doc.autoTable({
            styles,
            headStyles: { fontSize: 5 },
            bodyStyles: { fontSize: 5 },
            margin: { top: 40 },
            body: lista.datos,
            columns: columns
          });
        }
      });

      doc.save(this.nombre + ".pdf");
    }
  }
};
</script>

<style></style>
