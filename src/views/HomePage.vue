<script>
import HomeCarousel from "@/components/HomeCarousel.vue";

export default {
  name: "HomePage",
  components: {
    HomeCarousel,
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
    class="ma-0"
    fluid
  >
    <HomeCarousel :photos="photos" />
  </v-container>
</template>

<style scoped>

</style>
