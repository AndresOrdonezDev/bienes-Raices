<script setup>
import usePropiedades from '@/composables/usePropiedades';
import { propertyPrice } from '@/helpers';
const {propiedadesCollection, deleteItem} = usePropiedades()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
  <v-btn color="blue" :to="{ name: 'nueva-propiedad' }">
    Nueva propiedad
  </v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <v-row class="flex-column flex-md-row align-center">
          <v-col cols="12" md="4" class="text-center">
            <v-list-item-media>
              <img width="180" :src="propiedad.imagen" alt="imagen propiedad">
            </v-list-item-media>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
            <v-list-item-title>{{ propertyPrice(propiedad.precio) }}</v-list-item-title>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <v-btn color="info" flat class="mr-2" :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }">
              Editar
            </v-btn>
            <v-btn color="red-darken-3" flat @click="deleteItem(propiedad.id, propiedad.imagen)">
              Eliminar
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>
