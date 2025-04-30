<script>
import AddToCartBtn from "@/components/AddToCartBtn.vue";
import AppHeader from '@/components/AppHeader.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import AppFooter from "@/components/AppFooter.vue";
import CartPage from "@/components/CartPage.vue";
import CartPreview from "@/components/CartPreview.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import Filter from "@/components/Filter.vue";
import GalleryGrid from "@/components/GalleryGrid.vue";
import GallerySlideshow from "@/components/GallerySlideshow.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import OrderSummary from "@/components/OrderSummary.vue";
import PageContainer from "@/components/PageContainer.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import PhotoDetail from "@/components/PhotoDetail.vue";
import PrintOptions from "@/components/PrintOptions.vue";
import SearchBar from "@/components/SearchBar.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import ViewToggle from "@/components/ViewToggle.vue";

export default {
  components: {
    SideDrawer,
    AppHeader,
    AppFooter,
    AddToCartBtn,
    CartPage,
    CartPreview,
    CheckoutForm,
    Filter,
    GalleryGrid,
    GallerySlideshow,
    HomeCarousel,
    OrderSummary,
    PageContainer,
    PhotoCard,
    PhotoDetail,
    PrintOptions,
    SearchBar,
    SkeletonLoader,
    ViewToggle,
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
    <v-main>
      <AppHeader />
      <SideDrawer />

      <!-- cards -->
      <AppFooter />
    </v-main>

  </VApp>
</template>

<!-- STYLES -->
<style scoped></style>
