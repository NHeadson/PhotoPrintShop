<script>
export default {
  name: 'HomeCarousel',
  props: {
    photos: {
      type: Array,
      required: true,
    }
  },
  computed: {
    filteredPhotos() {
      return this.photos.filter(photo => photo.width !== 'full-wide');
    },
  },
};
</script>

<template>

  <v-container
    class="pa-0 ma-0"
    fluid
  >
    <v-carousel
      class="pa-0 ma-0"
      height="85vh"
      :show-arrows="false"
      hide-delimiters
      cycle
      interval="15000"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="photo in filteredPhotos"
        :key="photo.id"
      >
        <v-img
          class="ma-auto"
          :src="photo.src"
          height="100%"
          position="center"
          cover
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style scoped>
v-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

v-carousel {
  flex: 1;
  height: 100%;
}

v-img {
  object-fit: cover;
}
</style>
