<script>
import GalleryGrid from "@/components/GalleryGrid.vue";

export default {
  name: "GalleryPage",
  components: {
    GalleryGrid,
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
  <v-container>
    <GalleryGrid :photos="photos" />
  </v-container>
</template>

<style scoped>

</style>
