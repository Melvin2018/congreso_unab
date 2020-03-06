<template>
  <div>
    <v-card v-if="chartData">
      <GChart
        :settings="{packages: ['bar']}"
        :resizeDebounce="500"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        @ready="onChartReady"
      />
    </v-card>
    <div class="text-center" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { GChart } from "vue-google-charts";
export default {
  props: {
    datos: {
      type: Array,
      required: true,
      default: []
    }
  },
  components: {
    GChart
  },
  data: () => ({
    chartsLib: null,
    chartData: []
  }),
  computed: {
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: "Congreso de enfermeria",
          subtitle: "Esperados y registrados, durante el congreso"
        },
        bars: "vertical",
        hAxis: { format: "decimal" },
        height: 500,

        colors: ["#9C27B0", "#1DE9B6"]
      });
    }
  },
  watch: {
    datos: function(x) {
      this.datos1();
    }
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },
    datos1() {
      this.chartData = [];
      this.chartData.push(["Resumen", "Esperados", "Registrados"]);
      let datos = Array.from(this.datos);
      datos.forEach(x => {
        if (x.name != "Total") {
          if (x.name == "Registrados") {
            this.chartData.push([
              x.name,
              datos.find(y => y.name == "Total").cantidad,
              x.cantidad
            ]);
          } else if (x.name == "Break AM") {
            this.chartData.push([
              x.name,
              datos.find(y => y.name == "Registrados").cantidad,
              x.cantidad
            ]);
          } else if (x.name == "Almuerzo") {
            this.chartData.push([
              x.name,
              datos.find(y => y.name == "Registrados").cantidad,
              x.cantidad
            ]);
          } else if (x.name == "Break PM") {
            this.chartData.push([
              x.name,
              datos.find(y => y.name == "Registrados").cantidad,
              x.cantidad
            ]);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>