<script>

export default {
  name: 'NavBar',
  components: {

  },
  props: {

  },
  data() {
    return {
      title: 'NavBar',
    };
  },
  methods: {

  }
}

</script>



<template>
  <v-app-bar color="primary" scroll-behavior="hide" scroll-threshold="100">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Nick's Pic Prints</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>


</template>

<style scoped>

</style>
