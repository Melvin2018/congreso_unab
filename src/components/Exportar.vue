<template>
  <v-row v-if="datos" style="margin-left:5%">
    <xlsx-workbook @change="creado = !creado">
      <xlsx-sheet
        :collection="dato.datos"
        v-for="dato in datos"
        :key="dato.nombre"
        :sheet-name="dato.nombre"
      />

      <xlsx-download disable-wrapper-click :filename="titulo" v-if="creado">
        <template #default="{download}">
          <v-btn fab @click="download"><v-icon>mdi-export</v-icon></v-btn>
        </template>
      </xlsx-download>
    </xlsx-workbook>
  </v-row>
</template>
<script>
import {
  XlsxWorkbook,
  XlsxSheet,
  XlsxDownload
} from "vue-xlsx/dist/vue-xlsx.es.js";
export default {
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  computed: {
    titulo() {
      return this.nombre.concat(".xlsx");
    }
  },
  props: {
    nombre: {
      type: String,
      default: "mi excel",
      required: true
    },
    datos: {
      type: Array,
      default: [],
      required: true
    }
  },
  data: () => ({
    creado: false
  })
};
</script>
