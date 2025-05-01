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
  methods: {

  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="photo in photos"
        :key="photo.title"
        cols="12"
        sm="6"
        md="4"
      >
        <PhotoCard :photo="photo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
