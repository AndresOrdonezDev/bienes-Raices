<script setup>


defineProps({
  propiedad: {
    type: Object,
  },
  price: {
    type: Function,
  },
});
</script>
<template>
  <v-col md="4" lg="3">
    <v-card>
      <v-img :src="propiedad.imagen" height="250" cover />
      <v-card-title class="font-weight-bold">
        {{ propiedad.titulo }}
      </v-card-title>

      <v-card-text class="text-truncate">
        {{ propiedad.descripcion }}
      </v-card-text>
      <v-card-text class="text-h5 font-weight-bold">
        {{ price(propiedad.precio) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block=""
          color="info"
          variant="flat"
          :to="{ name: 'propiedad', params: { id: propiedad.id } }"
        >
          Ver Propiedad
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
