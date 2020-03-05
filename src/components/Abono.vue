<template>
  <v-dialog v-model="modal" persistent max-width="625">
    <v-form ref="form" v-model="valido">
      <v-card>
        <v-toolbar color="green" height="50">
          <v-col cols="12" lg="11">
            <v-layout justify-center row>
            <v-img
              src="https://cdn4.iconfinder.com/data/icons/finance-and-banking-free/64/Finance_loan_money-512.png"
              aspect-ratio="1"
              max-width="30"
            />
            <h3>. . . </h3>
              <span class="display-1 white--text font-weight-light">Abono</span>
            </v-layout>
          </v-col>
          <v-btn text icon @click="close" color="black">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field color="green"
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
export default {
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