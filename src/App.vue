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
        { id: 1, width: 'full-wide', src: new URL('@/img/Kevin-w-2.jpg', import.meta.url).href },
        { id: 2, width: 'single', src: new URL('@/img/Kevin-6.jpg', import.meta.url).href },
        { id: 3, width: 'single', src: new URL('@/img/Kevin-8.jpg', import.meta.url).href },
        { id: 4, width: 'single', src: new URL('@/img/Landscape-1.jpg', import.meta.url).href },
        { id: 5, width: 'single', src: new URL('@/img/Landscape-2.jpg', import.meta.url).href },
        { id: 6, width: 'full-wide', src: new URL('@/img/Kevin-w-1.jpg', import.meta.url).href },
        { id: 7, width: 'single', src: new URL('@/img/Landscape-3.jpg', import.meta.url).href },
        { id: 8, width: 'single', src: new URL('@/img/Landscape-4.jpg', import.meta.url).href },
        { id: 9, width: 'single', src: new URL('@/img/Landscape-5.jpg', import.meta.url).href },
        { id: 10, width: 'single', src: new URL('@/img/Landscape-6.jpg', import.meta.url).href },
        { id: 11, width: 'single', src: new URL('@/img/Landscape-7.jpg', import.meta.url).href },
        { id: 12, width: 'double', src: new URL('@/img/Macro-1.jpg', import.meta.url).href },
        { id: 13, width: 'single', src: new URL('@/img/Macro-2.jpg', import.meta.url).href },
        { id: 14, width: 'single', src: new URL('@/img/Macro-3.jpg', import.meta.url).href },
        { id: 15, width: 'single', src: new URL('@/img/Macro-4.jpg', import.meta.url).href },
        { id: 16, width: 'single', src: new URL('@/img/Macro-5.jpg', import.meta.url).href },
        { id: 17, width: 'single', src: new URL('@/img/Macro-6.jpg', import.meta.url).href },
        { id: 18, width: 'double', src: new URL('@/img/Macro-7.jpg', import.meta.url).href },
        { id: 19, width: 'double', src: new URL('@/img/Macro-8.jpg', import.meta.url).href },
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
        class="pa-0 ma-0"
        fluid
      >
        <router-view :photos="photos" />
      </v-container>
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<!-- STYLES -->
<style scoped>

v-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

v-main {
  flex: 1;
}

</style>
