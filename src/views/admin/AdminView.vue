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
            <v-list-item
                v-for="propiedad in propiedadesCollection"
                :key="propiedad.id"
               
            >
                <template v-slot:prepend>
                    <v-list-item-media class="mr-5">
                        <img width="180" :src="propiedad.imagen" alt="imagen propiedad">
                    </v-list-item-media>
                </template>

                <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
                <v-list-item-title>{{ propertyPrice(propiedad.precio) }}</v-list-item-title>
                
                <template v-slot:append>
                    <v-btn
                        color="info"
                        flat
                        class="mr-2"
                        :to="{name:'editar-propiedad', params:{id: propiedad.id}}"
                    >
                        Editar
                    </v-btn>
                    <v-btn
                        color="red-darken-3"
                        flat
                        @click="deleteItem(propiedad.id, propiedad.imagen)"
                    >
                        Eliminar
                    </v-btn>
                </template>

            </v-list-item>
        </v-list>
    </v-card>

</template>



