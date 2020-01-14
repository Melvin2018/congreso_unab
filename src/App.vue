<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      style="font-size:20px"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item link href="/">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn4.iconfinder.com/data/icons/election-world-color/64/senate-congress-government-senator-political-512.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Congreso</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dark
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Action Goal
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>
