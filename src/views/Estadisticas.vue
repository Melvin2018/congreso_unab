<template>
  <v-container class="flex-small-windows">
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar-title dense class="light-blue darken-2 justify-center">
            <v-row justify="center">
              <v-row align="center" justify="center">
                <v-spacer></v-spacer>
                <h2 class="display-1 white--text font-weight-light">Estadísticas</h2>
              </v-row>
              <v-spacer></v-spacer>
              <v-btn
                class="ma-6"
                outlined
                color="secundary"
                :value="activeBtn"
                grow
                @click="modal=!modal"
              >
                <span>Actualizar</span>
                <v-icon>mdi-history</v-icon>
              </v-btn>
              <nuevo :modal="modal" />
            </v-row>
          </v-toolbar-title>
          <v-card>
            <v-card-title class="blue lighten-3">
              <v-tabs fixed-tabs v-model="tabs" centered background-color="blue lighten-5">
                <v-tab>
                  <h3>Estudiante</h3>
                </v-tab>
                <v-tab>
                  <h3>Personal</h3>
                </v-tab>
                <v-tab>
                  <h3>General</h3>
                </v-tab>
              </v-tabs>
            </v-card-title>
            <v-card-text>
              <div class="text-center" v-if="load">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              <v-tabs-items v-model="tabs">
                <v-tab-item>   
                  <v-col></v-col>
              <v-layout>
                
              <v-card class="left" width="344" height="295" color="primary" >
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  hide-default-footer
                  item-key="name"
                  class="elevation-2"
                ></v-data-table>
              </v-card>
                    <v-spacer></v-spacer>
                  <v-card class="white--text align-end" width="775">
                    <div>
                    <GChart
                      :settings="{packages: ['bar']}"    
                      :data="chartData"
                      :options="chartOptions"
                      :createChart="(el, google) => new google.charts.Bar(el)"
                      @ready="onChartReady"/>
                     </div>
                  </v-card>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-col></v-col>
              <v-layout>
                
              <v-card class="left" width="344" height="295" color="primary" >
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  hide-default-footer
                  item-key="name"
                  class="elevation-2"
                ></v-data-table>
              </v-card>
                    <v-spacer></v-spacer>
                  <v-card class="white--text align-end" width="775" color="primary">
                    <div>
                    <GChart
                      :settings="{packages: ['bar']}"    
                      :data="chartData"
                      :options="chartOptions"
                      :createChart="(el, google) => new google.charts.Bar(el)"
                      @ready="onChartReady"/>
                     </div>
                  </v-card>
                  </v-layout>

                </v-tab-item>
                <v-tab-item>

                </v-tab-item>
              </v-tabs-items>
              </v-card-text >
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'
  export default {
    name: 'App',
  components: {
    GChart
  },
    data () {
      return {
        tabs:null,
        headers: [
          {
            text: 'Resumen',
            align: 'start',
            value: 'name',
          },
          { text: 'Cantidad', value: 'total' },
        ],
        desserts: [
          {
            name: 'Esperados',
            total: '45',
          },
          {
            name: 'Registados',
            total: '40',
          },
          {
            name: 'Breack_Am',
            total: '13',
          },
          {
            name: 'Almuerzo',
            total: '25',
          },
          {
            name: 'Breack_Pm',
            total: '45',
          },
        ],

        chartsLib: null, 
      chartData: [
        ['Resumen', 'Esperados', 'Registrados'],
        ['Registrados', 45, 40],
        ['Breack_Am', 45, 13],
        ['Almuerzo', 45, 25],
        ['Breack_Pm', 45, 45]
      ]
      }
    },
    computed: {
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Congreso de enfermeria',
          subtitle: 'Esperados y registrados, durante el congreso'
        },
        bars: 'vertical', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        height: 400,
        colors: ['#9C27B0', '#1DE9B6']
      })
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    }
  }
  }
</script>




