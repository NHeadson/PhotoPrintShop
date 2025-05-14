import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import GalleryPage from '@/views/GalleryPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import OrderSummary from "@/components/OrderSummary.vue";

const routes = [
  {path: '/', name: 'HomePage', component: HomePage},
  {path: '/gallery', name: 'GalleryPage', component: GalleryPage},
  {path: '/checkout', name: 'CheckoutPage', component: CheckoutPage},
  {path: '/account', name: 'AccountPage', component: AccountPage},
  {
    path: "/order-summary",
    name: "OrderSummary",
    component: OrderSummary,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
