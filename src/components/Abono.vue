<template>
  <v-dialog v-model="modal" persistent max-width="625">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar dark color="primary" height="50">
          <v-col cols="12" lg="11">
            <titulo titulo="Abono" />
          </v-col>
           <v-spacer></v-spacer>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            color="green"
            label="Abono"
            :rules="[
      v =>
       valor(v) || 'Abono sobrepasa el precio'
    ]"
            v-model.number="abono"
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center align-center>
            <v-btn :disabled="!valido" color="success" class="mr-4" @click="abonar">
              <v-icon>mdi-cash-marker</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-form>
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
      return this.$store.state.estudiante.modalAbonar;
    },
    precio() {
      return this.$store.state.congreso.precio;
    },
    estudiante() {
      if (this.modal) {
        return this.$store.state.estudiante.estudiante;
      }
    }
  },
  data: () => ({
    abono: 0,
    valido: false
  }),
  methods: {
    close() {
      this.$store.state.estudiante.modalAbonar = false;
      this.$router.go();
    },
    async abonar() {
      const URL =
        this.$path + "abonar/" + this.estudiante.id + "?abono=" + this.abono;
      await this.$axios.put(URL).catch(e => console.log(e));
      this.close();
    },
    valor(item) {
      const v = item + this.estudiante.abono;
      return v <= this.precio;
    }
  }
};
</script>