<script setup>
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { useFirestore } from "vuefire";

//dependencia para mostrar el mapa
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

//collection es la tabla y addDoc es para que genere un id auto
import { collection, addDoc } from "firebase/firestore";

import { validationSchema, imageSchema } from "@/validations/propiedadSchema";
import useImage from "../../composables/useImage";
import useLocationMap from "../../composables/useLocationMap"



const db = useFirestore();
const router = useRouter();

const { url, uploadImage, image } = useImage();
const {zoom, center, pin} = useLocationMap()

const items = [1, 2, 3, 4, 5];


const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const titulo = useField("titulo");
const imagen = useField("imagen");
const precio = useField("precio");
const wc = useField("wc");
const habitaciones = useField("habitaciones");
const estacionamiento = useField("estacionamiento");
const descripcion = useField("descripcion");

const alberca = useField("alberca", null, {
  initialValue: false,
});

const submit = handleSubmit(async (values) => {
  try {
    const { imagen, ...propiedad } = values;

    const docRef = await addDoc(collection(db, "propiedades"), {
      ...propiedad,
      imagen: url.value,
      ubicacion: center.value
    });

    if (docRef.id) {
      router.push({ name: "admin-propiedades" });
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nueva propiedad
    </v-card-title>

    <v-card-subtitle class="text-h6" tag="h6">
      crea una nueva propiedad llenando el siguiente formulario
    </v-card-subtitle>

    <!-- formulario -->
    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Título de la propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />

      <v-file-input
        accept="image/jpeg"
        label="Fotografía"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad</p>
        <img :src="image" alt="imagen propiedad" class="w-50" />
      </div>

      <v-text-field
        type="number"
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="m-5"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Baños"
            class="m-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Lugares de estacionamiento"
            class="m-5"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Descripción de la propiedad"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      />

      <v-checkbox
        label="Alberca"
        v-model="alberca.value.value"
        :error-messages="alberca.errorMessage.value"
      />

      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>

      <div class="mb-5">
        <div style="height: 500px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          > 
            <LMarker
              :lat-lng="center"
              :draggable="true"
              @moveend="pin"
            />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Agregar propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>
