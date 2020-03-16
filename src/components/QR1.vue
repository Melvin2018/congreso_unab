<template>
  <v-dialog v-model="modal" persistent max-width="625">
    <v-card>
      <v-toolbar dark color="primary" height="50">
        <v-col cols="12" lg="11">
          <titulo titulo="Detalles" />
        </v-col>
        <v-btn text icon @click="close" color="black">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <qrcode v-if="personal" :value="personal.uuid" :options="{ width: 600 }"></qrcode>
      <v-card-actions>
        <v-layout column>
          <v-layout column align-end>
            <v-btn @click="expand()" text>
              mas informacion
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-layout>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                <v-layout justify-center>
                  <h3>Datos</h3>
                </v-layout>
                <v-row>
                  <v-col cols="12" lg="6">
                    <v-layout column>
                      <span>
                        <strong>Nombre:</strong>
                        {{personal.personal.nombre}}
                      </span>
                      <span>
                        <strong>Email:</strong>
                        {{personal.personal.email}}
                      </span>
                      <span>
                        <strong>Tipo:</strong>
                        {{personal.personal.tipo.nombre}}
                      </span>
                    </v-layout>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-col cols="12" lg="5">
                    <v-layout column>
                      <span>
                        <strong>Registrado:</strong>
                        {{personal.accion.registro==0? "no":"si"}}
                      </span>
                      <span>
                        <strong>Break AM:</strong>
                        {{personal.accion.break_am==0? "no":"si"}}
                      </span>
                      <span>
                        <strong>Almuerzo:</strong>
                        {{personal.accion.almuerzo==0? "no":"si"}}
                      </span>
                      <span>
                        <strong>Break PM:</strong>
                        {{personal.accion.break_pm==0? "no":"si"}}
                      </span>
                    </v-layout>
                  </v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Titulo from "@/components/Titulo.vue";
export default {
  components: {
    Titulo
  },
  computed: {
    modal() {
      return this.$store.state.personal.modalQr;
    },
    personal() {
      if (this.modal) {
        console.log(this.$store.state.personal.personal);
        return this.$store.state.personal.personal;
      }
      return { accion: {}, personal: { tipo: {} } };
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    close() {
      this.$store.state.personal.modalQr = false;
    },
    expand() {
      this.show = !this.show;
    }
  }
};
</script> 