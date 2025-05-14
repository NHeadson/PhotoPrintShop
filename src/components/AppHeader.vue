<script>
import {useUserStore} from '@/stores/userStore';

export default {
  name: 'AppHeader',
  data() {
    return {
      title: 'AppHeader',
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    isLoggedIn() {
      return this.userStore.isLoggedIn;
    },
    userName() {
      const profile = this.userStore.profile;
      return profile ? profile.firstName || 'User' : '';
    },
    cartItemCount() {
      return this.userStore.cartItems.length || 0;
    },
  },
  methods: {
    logout() {
      this.userStore.logout();
    },
  },
};
</script>

<template>
  <template v-if="!isLoggedIn">
    <v-app-bar color="var(--primary)" scroll-behavior="hide" scroll-threshold="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          class="ml-4 nav-link"
          to="/"
        >
          <v-icon
            color="var(--dark)"
            icon="mdi-camera"
            size="large"
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
      <v-btn class="nav-link mr-2" to="/account">Register/Login</v-btn>
    </v-app-bar>
  </template>
  <template v-else>
    <v-app-bar color="var(--primary)" scroll-behavior="hide" scroll-threshold="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon class="ml-4 nav-link" to="/">
          <v-icon color="var(--dark)" icon="mdi-camera" size="large"></v-icon>
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="text-dark text-md-h5">
        <strong>Nick's Pic Prints</strong>
      </v-app-bar-title>
      <v-btn class="nav-link mr-2" to="/">Home</v-btn>
      <v-btn class="nav-link mr-2" to="/gallery">Gallery</v-btn>
      <v-badge
        v-if="cartItemCount > 0"
        :content="cartItemCount"
        color="var(--link)"
        overlap
      >
        <v-btn class="nav-link mr-2" to="/checkout">Cart</v-btn>
      </v-badge>
      <v-btn v-else class="nav-link mr-2" to="/checkout">Cart</v-btn>
      <v-btn v-if="!isLoggedIn" class="nav-link mr-2" to="/account">Register/Login</v-btn>
      <template v-else>
        <v-btn class="px-3" disabled>|</v-btn>
        <v-btn class="nav-link mr-2" to="/account">Welcome, {{ userName }}</v-btn>
        <v-btn class="nav-link mr-2 pa-1" @click="logout">Logout</v-btn>
      </template>
    </v-app-bar>
  </template>
</template>

<style scoped>

.nav-link:hover {
  background-color: var(--link);
}

</style>
