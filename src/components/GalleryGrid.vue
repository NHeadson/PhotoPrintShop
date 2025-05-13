<script>
import PhotoCard from "@/components/PhotoCard.vue";

export default {
  name: 'GalleryGrid',
  components: {
    PhotoCard,
  },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <v-container
  fluid
  >
    <v-row>
      <v-col
        v-for="photo in photos"
        :key="photo.id"
        :cols="photo.width && typeof photo.width === 'string' && photo.width.endsWith('-wide')
          ? 12
          : photo.width && typeof photo.width === 'string' && photo.width.includes('double')
          ? 6
          : 3"
      >
        <PhotoCard :photo="photo"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
