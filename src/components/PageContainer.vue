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
  props: {},
  data() {
    return {
      title: 'PageContainer',
      photos: [
        {title: 'Kevin 1', src: '@/assets/img/Kevin-1.jpg' },
        {title: 'Kevin 2', src: '@/assets/img/Kevin-2.jpg' },
        {title: 'Kevin 3', src: '@/assets/img/Kevin-3.jpg' },
        {title: 'Kevin 4', src: '@/assets/img/Kevin-4.jpg' },
        {title: 'Kevin 5', src: '@/assets/img/Kevin-5.jpg' },
        {title: 'Kevin 6', src: '@/assets/img/Kevin-6.jpg' },
        {title: 'Kevin 7', src: '@/assets/img/Kevin-7.jpg' },
        {title: 'Kevin 8', src: '@/assets/img/Kevin-8.jpg' },
      ]
    };
  },
  methods: {}
}
</script>

<template>
  <GalleryGrid :photos="photos" />
</template>

<style scoped>

</style>
