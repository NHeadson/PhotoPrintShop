<script>
import AddToCartBtn from "@/components/AddToCartBtn.vue";
import AppHeader from '@/components/AppHeader.vue';
import PhotoCard from "@/components/PhotoCard.vue";
import PhotoDetail from "@/components/PhotoDetail.vue";
import PrintOptions from "@/components/PrintOptions.vue";
import SearchBar from "@/components/SearchBar.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import ViewToggle from "@/components/ViewToggle.vue";
import AppFooter from "@/components/AppFooter.vue";
import CartPage from "@/components/CartPage.vue";
import CartPreview from "@/components/CartPreview.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import Filter from "@/components/Filter.vue";
import GalleryGrid from "@/components/GalleryGrid.vue";
import GallerySlideshow from "@/components/GallerySlideshow.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import OrderSummary from "@/components/OrderSummary.vue";
import Kevin1 from '@/img/Kevin-1.jpg';
import Kevin2 from '@/img/Kevin-2.jpg';
import Kevin3 from '@/img/Kevin-3.jpg';
import Kevin4 from '@/img/Kevin-4.jpg';
import Kevin5 from '@/img/Kevin-5.jpg';
import Kevin6 from '@/img/Kevin-6.jpg';
import Kevin7 from '@/img/Kevin-7.jpg';
import Kevin8 from '@/img/Kevin-8.jpg';

export default {
  name: 'PageContainer',
  components: {
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
    PhotoCard,
    PhotoDetail,
    PrintOptions,
    SearchBar,
    SkeletonLoader,
    ViewToggle,
  },
  data() {
    return {
      photos: [
        { title: 'Kevin 1', src: Kevin1 },
        { title: 'Kevin 2', src: Kevin2 },
        { title: 'Kevin 3', src: Kevin3 },
        { title: 'Kevin 4', src: Kevin4 },
        { title: 'Kevin 5', src: Kevin5 },
        { title: 'Kevin 6', src: Kevin6 },
        { title: 'Kevin 7', src: Kevin7 },
        { title: 'Kevin 8', src: Kevin8 },
      ],
    };
  },
};
</script>

<template>
  <GalleryGrid :photos="photos" />
</template>

<style scoped>

</style>
