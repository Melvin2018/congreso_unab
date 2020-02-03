<template>
  <div>
    <v-btn fab @click="exportPDF" icon>
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
      doc.save(this.nombre.concat(letra).concat(".pdf"));
    }
  }
};
</script>

<style></style>
