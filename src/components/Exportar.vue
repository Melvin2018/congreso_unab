<template>
  <v-row v-if="collection.length>0" style="margin-left:5%">
    <xlsx-workbook>
      <xlsx-sheet :collection="collection" :sheet-name="nombre"/>
      <xlsx-download>
        <v-btn fab><v-icon>mdi-export</v-icon></v-btn>
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
  props: {
    nombre: {
      type: String,
      default: "mi excel",
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
