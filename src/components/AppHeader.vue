<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      title: 'AppHeader',
    };
  },
};

</script>

<template>
  <v-app-bar color="secondary" scroll-behavior="hide" scroll-threshold="30">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="ml-4"
      >
        <v-icon
          color="blue-grey-darken-2"
          icon="mdi-camera"
          size="x-large"
        ></v-icon>
      </v-app-bar-nav-icon>
    </template>
    <v-app-bar-title
      class="text-blue-grey-darken-2 text-md-h5"
    >
      <strong>Nick's Pic Prints</strong>
    </v-app-bar-title>
    <v-btn to="/">Home</v-btn>
    <v-btn to="/gallery">Gallery</v-btn>
    <v-btn to="/checkout">Cart</v-btn>
    <v-btn to="/account">Account</v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>
