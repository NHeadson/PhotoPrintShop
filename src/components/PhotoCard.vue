<script>
const photos = [
  { title: 'Kevin 1', src: './img/Kevin-1.jpg', flex: 3 },
  { title: 'Kevin 2', src: './img/Kevin-2.jpg', flex: 3 },
  { title: 'Kevin 3', src: './img/Kevin-3.jpg', flex: 3 },
  { title: 'Kevin 4', src: './img/Kevin-4.jpg', flex: 3 },
  { title: 'Kevin 5', src: './img/Kevin-5.jpg', flex: 3 },
  { title: 'Kevin 6', src: './img/Kevin-6.jpg', flex: 3 },
  { title: 'Kevin 7', src: './img/Kevin-7.jpg', flex: 3 },
  { title: 'Kevin 8', src: './img/Kevin-8.jpg', flex: 3 },
]

export default {
  name: 'PhotoCard',
  components: {

  },
  props: {

  },
  data() {
    return {
      title: 'PhotoCard',
    };
  },
  methods: {

  }
}
</script>

<template>
  <v-container>
    <v-responsive :aspect-ratio="4 / 4" class="border pa-4">
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        src="Kevin-1.jpg"
        width="300"
        cover
      ></v-img>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
