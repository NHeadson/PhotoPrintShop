<script>
export default {
  name: 'HomeCarousel',
  components: {},
  props: {
    photos: {
      type: Array,
      required: true,
    }
  },
  computed: {
    filteredPhotos() {
      return this.photos.filter(photo => !photo.width.endsWith('-wide'));
    },
  },
  data() {
    return {
      title: 'HomeCarousel'
    };
  },
  methods: {},
};
</script>

<template>

  <v-container
    class="pa-0 ma-0"
    width="100vw"
    fluid
  >
    <v-carousel
      class="pa-0 ma-0"
      height="100%"
      :show-arrows="false"
      hide-delimiters
      cycle
      interval="15000"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="photo in filteredPhotos"
        :key="photo.title"
        width="100%"
      >
        <v-img
          width="100%"
          :aspect-ratio="16 / 9"
          class="ma-0"
          :src="photo.src"
          position="50% 45%"
          cover
          eager
        >

        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style scoped>

</style>
