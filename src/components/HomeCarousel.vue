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
        :key="photo.title"
      >
        <v-img
          class="ma-auto"
          :src="photo.src"
          height="100%"
          position="50% 45%"
          cover
        >

        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style scoped>

</style>
