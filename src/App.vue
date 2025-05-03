<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      photos: [
        { title: 'Husky Landscape', src: new URL('@/img/Kevin-6.jpg', import.meta.url).href },
        { title: 'Husky Looking up', src: new URL('@/img/Kevin-1.jpg', import.meta.url).href },
        { title: 'Husky Closeup', src: new URL('@/img/Kevin-4.jpg', import.meta.url).href },
        { title: 'Husky Winter', src: new URL('@/img/Kevin-5.jpg', import.meta.url).href },
        { title: 'Husky Dramatic Closeup', src: new URL('@/img/Kevin-7.jpg', import.meta.url).href },
        { title: 'Husky Nature Breath', src: new URL('@/img/Kevin-8.jpg', import.meta.url).href },
      ],
    };
  }
};
</script>


<!-- HTML -->
<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <v-container
        class="pb-10 pa-0 ma-0"
        fluid
      >
        <router-view :photos="photos" />
      </v-container>
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<!-- STYLES -->
<style scoped></style>
