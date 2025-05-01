<script>

export default {
  name: 'AppHeader',
  components: {

  },
  props: {

  },
  data() {
    return {
      title: 'AppHeader',
    };
  },
  methods: {

  }
}

</script>



<template>
  <v-app-bar color="secondary" scroll-behavior="hide" scroll-threshold="100">
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <v-icon
          color="blue-grey-darken-2"
          icon="mdi-camera"
          size="large"
        ></v-icon>
      </v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Nick's Pic Prints</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>

</style>
