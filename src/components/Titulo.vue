<template>
  <v-layout row justify-center align-center>
    <v-img :src="imagen" aspect-ratio="1" max-width="40"></v-img>
    <span class="h1">{{titulo}}</span>
  </v-layout>
</template>
<script>
export default {
  name: "titulo",
  props: {
    imagen: {
      type: String,
      required: false,
      default: ""
    },
    titulo: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>
<style scoped>
span{
   margin-left: 5%;
   font-size: 180%;
}
</style>