<template>
  <v-row style="margin-left:5%">
    <xlsx-workbook>
      <xlsx-sheet
        :collection="col.datos"
        :sheet-name="col.nombre"
        v-for="col in collection"
        :key="col.nombre"
      />
      <xlsx-download disable-wrapper-click :filename="titulo">
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
      default: "",
      required: true
    },
    collection: {
      type: Array,
      default: [],
      required: true
    }
  }
};
</script>
