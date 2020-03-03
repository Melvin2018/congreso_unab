<template>
  <v-container class="flex-small-windows">
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar-title dense class="light-blue darken-2 justify-center">
            <v-row justify="center">
              <v-row align="center" justify="center">
                <v-spacer></v-spacer>
                <h2 class="display-1 white--text font-weight-light">Estadisticas</h2>
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
                  <v-container fluid>
                    <v-row dense>
                      <v-layout justify-center row>
                        <v-col cols="12" md="8" v-for="estadisticas in estudiante" :key="estadisticas.id"></v-col>
                      </v-layout>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
              <v-tab-item v-model="tabs">
                <v-tab-item>
                  <v-container fluid>
                    <v-layout justify-center row>
                      <v-col cols="12" md="8" v-for="estadisticas in personal" :key="estadisticas.id"></v-col>
                      <v-card class="mx-auto width"></v-card>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-container fluid>
                    <v-layout justify-center row>
                      <v-col cols="12" md="8" v-for="estadisticas in general" :key="estadisticas.id"></v-col>
                      <v-card class="mx-auto width"></v-card>
                    </v-layout>
                  </v-container>
                </v-tab-item>
              </v-tab-item>
              <v-col></v-col>
              
              <v-card>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    item-key="Resumen"
    class="elevation-2"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
  ></v-data-table>
              </v-card>
              
            </v-card-text>
                  <v-card class="mx-auto" max-width="1000">
                    <div>
                    <GChart
                      :settings="{packages: ['bar']}"    
                      :data="chartData"
                      :options="chartOptions"
                      :createChart="(el, google) => new google.charts.Bar(el)"
                      @ready="onChartReady"/>
                     </div>
                  </v-card>
                  
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Category', value: 'category' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
          },
          {
            name: 'Ice cream sandwich',
            category: 'Ice cream',
          },
          {
            name: 'Eclair',
            category: 'Cookie',
          },
          {
            name: 'Cupcake',
            category: 'Pastry',
          },
          {
            name: 'Gingerbread',
            category: 'Cookie',
          },
          {
            name: 'Jelly bean',
            category: 'Candy',
          },
          {
            name: 'Lollipop',
            category: 'Candy',
          },
          {
            name: 'Honeycomb',
            category: 'Toffee',
          },
          {
            name: 'Donut',
            category: 'Pastry',
          },
          {
            name: 'KitKat',
            category: 'Candy',
          },
        ],
      }
    },
  }
</script>



//computed: {
    estudiante() {
      return this.estadisticas.filter(x => x.estado === 1);
    },
    personal() {
      return this.estadisticas.filter(x => x.estado === 0);
    },
    general(){
      return this.estadisticas.filter(x => x.estado === 0);
    },
  },
  data: () => ({
    load: true,
    tabs: null,
    pagina: 1,
    numPagina: 0,
    estadisticas: [],
  }),