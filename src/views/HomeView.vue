<script setup>
import usePropiedades from '../composables/usePropiedades'
import Propiedad from '../components/Propiedad.vue'
import { propertyPrice } from '../helpers';
const {filterItems, alberca} = usePropiedades()
</script>

<template>
    <h1 class="text-center text-h4 lg:text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>
    <v-card class="lg:text-h5">
      Búsqueda:
      <v-checkbox label="Alberca" v-model="alberca"/>
    </v-card>
    <v-card flat class="py-10">
      <v-row>
        <Propiedad
          v-for="propiedad in filterItems"
          :key="propiedad.id"
          :propiedad="propiedad"
          :price="propertyPrice"
        />
      </v-row>
    </v-card>
  </template>
  

  

  