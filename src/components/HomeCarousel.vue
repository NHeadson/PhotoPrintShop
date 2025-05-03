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
  computed: {},
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
    class="pa-0"
    fluid
  >
    <v-carousel
      height="820"
      :show-arrows="false"
      hide-delimiters
      cycle
      interval="15000"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="photo in photos"
        :key="photo.title"
      >
        <v-img
          class="ma-auto"
          :src="photo.src"
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
