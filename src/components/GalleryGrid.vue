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
  data() {
    return {
      title: 'GalleryGrid',
    };
  },
  methods: {}
}
</script>

<template>
  <v-container
  fluid
  >
    <v-row>
      <v-col
        v-for="photo in photos"
        :key="photo.width"
        :cols="photo.width.endsWith('-wide') ? 12 : photo.width.includes('double') ? 6 : 3"
      >
        <PhotoCard :photo="photo"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
