<script>
import GalleryGrid from "@/components/GalleryGrid.vue";
import { fetchPhotos } from "@/factories/PhotoFactory.js";

export default {
  name: 'GalleryPage',
  components: {
    GalleryGrid,
  },
  data() {
    return {
      photos: [],
    };
  },
  async created() {
    this.photos = await fetchPhotos();
  },
};
</script>

<template>
  <v-container
    fluid
  >
    <GalleryGrid :photos="photos" />
  </v-container>
</template>

<style scoped>

</style>
