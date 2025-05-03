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
  <v-app-bar color="var(--primary)" scroll-behavior="hide" scroll-threshold="1">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="ml-4 nav-link"
      >
        <v-icon
          color="var(--dark)"
          icon="mdi-camera"
          size="x-large"
        ></v-icon>
      </v-app-bar-nav-icon>
    </template>
    <v-app-bar-title
      class="text-dark text-md-h5"
    >
      <strong>Nick's Pic Prints</strong>
    </v-app-bar-title>
    <v-btn class="nav-link mr-2" to="/">Home</v-btn>
    <v-btn class="nav-link mr-2" to="/gallery">Gallery</v-btn>
    <v-btn class="nav-link mr-2" to="/checkout">Cart</v-btn>
    <v-btn class="nav-link mr-2" to="/account">Account</v-btn>
  </v-app-bar>
</template>

<style scoped>

.nav-link:hover {
  background-color: var(--link);
}

</style>
