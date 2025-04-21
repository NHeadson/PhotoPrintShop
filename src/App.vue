<script>
import ProductCard from '@/components/ProductCard.vue';
import NavBar from '@/components/NavBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';

export default {
  components: {
    SideDrawer,
    ProductCard,
    NavBar,
  },
  data() {
    return {
      title: 'My Vue App',
    };
  },
  methods: {

  }
}


</script>


<!-- HTML -->
<template>
  <VApp>
    <NavBar />
    <v-main>
      <SideDrawer></SideDrawer>

      <!-- cards -->
      <ProductCard />
    </v-main>
  </VApp>
</template>

<!-- STYLES -->
<style scoped></style>
