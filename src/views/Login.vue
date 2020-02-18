<template>
<v-hover>
<template v-slot="{ hover }">
  <v-app>
    <v-div class="box" class_1="mx-auto mt-5" flex="1" >
    <v-card width = "400" height = "400" class = "mx-auto mt-5" :elevation="hover ? 24 : 6"
          class_1="mx-auto pa-6" >
      <v-card-title class = "mx-auto mt-5"> 
        <img
           width = "90" height = "90"
          src="https://lh3.googleusercontent.com/WA91TbjRlhH8mg9Qh2dTr8tNCuWNQRkXpp15DSjdXGFqN3IzCkgSw1hFwwAuum288KI"
        />
        <h1> Iniciar sesión </h1> 
      </v-card-title> 
      <v-spacer></v-spacer>
      <v-card-text> 
        <v-form> 
          <v-text-field 
            label = "Nombre de usuario" 
            prepend-icon = "mdi-account-circle" 
          /> 
          <v-text-field 
            :type = "showPassword? 'text': 'password'" 
            label = "Password" 
            prepend-icon = "mdi-lock" 
            :append-icon = "showPassword? 'mdi-eye ':' mdi-eye-off '" 
            @click: append =" showPassword =! showPassword " 
          />
        </v-form> 
      </v-card-text> 
      <v-divider> </v-divider> 
      <v-card-actions>
        <v-btn color = "info" class = "mx-auto mt-5"> Iniciar sesión </v-btn> 
      </v-card-actions> 
    </v-card> 
    </v-div>
  </v-app>
</template>
</v-hover>
</template>

<style>
.box{
  margin: 50px auto;
  width: 460px;
  height: 478px;
  border-top: 20px solid #3ACFD5;
  border-bottom: 20px solid #3a4ed5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-position: 0 0, 100% 0;
  background-repeat: no-repeat;
  -webkit-background-size: 20px 100%;
  -moz-background-size: 20px 100%;
  background-size: 20px 100%;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzYWNmZDUiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNhNGVkNSIgc3RvcC1vcGFjaXR5PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzYWNmZDUiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNhNGVkNSIgc3RvcC1vcGFjaXR5PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=);
  background-image: -webkit-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%), -webkit-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  background-image: -moz-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%), -moz-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  background-image: -o-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%), -o-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  background-image: linear-gradient(to bottom, #3acfd5 0%, #3a4ed5 100%), linear-gradient(to bottom, #3acfd5 0%, #3a4ed5 100%);
}

</style>

