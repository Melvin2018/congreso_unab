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
                        <v-col cols="12" md="8" v-for="evento in estdudiante" :key="evento.id"></v-col>
                      </v-layout>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
              <v-tab-item v-model="tabs">
                <v-tab-item>
                  <v-container fluid>
                    <v-layout justify-center row>
                      <v-col cols="12" md="8" v-for="evento in personal" :key="evento.id"></v-col>
                      <v-card class="mx-auto width"></v-card>
                    </v-layout>
                  </v-container>
                </v-tab-item>
              </v-tab-item>
              <v-col></v-col>
              <v-card>
                <v-data-table
                  dense
                  :headers="headers"
                  :items="desserts"
                  item-key="name"
                  class="elevation-1"
                ></v-data-table>
              </v-card>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    desserts: [
      {
        name: "San Salvador",
        esperados: 30.0,
        registrados: 24,
        faltantes: 4.0,
        breakam: 6.0,
        faltantesdebreakam: 5.0,
        almuerzo: 8.0,
        faltantesdealmuerzo: 9.0,
        breakpm: 5.0,
        faltantesdebreakpm: 8.0
      },
      {
        name: "San Miguel",
        esperados: 30.0,
        registrados: 24,
        faltantes: 4.0,
        breakam: 6.0,
        faltantesdebreakam: 5.0,
        almuerzo: 8.0,
        faltantesdealmuerzo: 9.0,
        breakpm: 5.0,
        faltantesdebreakpm: 8.0
      },
      {
        name: "Chalatenango",
        esperados: 30.0,
        registrados: 24,
        faltantes: 4.0,
        breakam: 6.0,
        faltantesdebreakam: 5.0,
        almuerzo: 8.0,
        faltantesdealmuerzo: 9.0,
        breakpm: 5.0,
        faltantesdebreakpm: 8.0
      },
      {
        name: "Sonsonate",
        esperados: 30.0,
        registrados: 24,
        faltantes: 4.0,
        breakam: 6.0,
        faltantesdebreakam: 5.0,
        almuerzo: 8.0,
        faltantesdealmuerzo: 9.0,
        breakpm: 5.0,
        faltantesdebreakpm: 8.0
      },
      {
        name: "Total",
        esperados: 30.0,
        registrados: 24,
        faltantes: 4.0,
        breakam: 6.0,
        faltantesdebreakam: 5.0,
        almuerzo: 8.0,
        faltantesdealmuerzo: 9.0,
        breakpm: 5.0,
        faltantesdebreakpm: 8.0
      }
    ],
    headers: [
      {
        text: "Departamento",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: " Esperados", value: "esperados" },
      { text: "Registrados", value: "registrados" },
      { text: "Faltantes", value: "faltantes" },
      { text: "BreakAm", value: "breakam" },
      { text: "FaltantesDeBreakAm", value: "faltantesdebreakam" },
      { text: "Almuerzo", value: "almuerzo" },
      { text: "FaltantesDeAlmuerzo", value: "faltantesdealmuerzo" },
      { text: "BreakPm", value: "breakpm" },
      { text: "FaltantesDeBreakPm", value: "faltantesdebreakpm" }
    ]
  })
};
</script>
