<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();

</script>

<template>
  <v-col elevation="3" class="mx-auto" md="4" lg="6">
    <!-- el v-layout es necesario para renderizar los demas componentes -->
    <v-layout>
      <v-app-bar color="blue-darken-1" >
       
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }"> Bienes Raíces vue </v-btn>
        </template>

        <template v-slot:append>

          <div v-if="auth.isAuth" >
            <v-btn :to="{ name: 'admin-propiedades' }"> Admin </v-btn>
            <v-btn @click="auth.logout"> Cerrar sesión </v-btn>
          </div>

          <div v-else >
            <v-btn :to="{ name: 'home' }"> Inicio </v-btn>
            <v-btn :to="{ name: 'login' }"> Iniciar sesión </v-btn>
          </div>
          
        </template>

      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-col>
</template>

