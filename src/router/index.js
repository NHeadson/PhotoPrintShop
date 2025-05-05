import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import GalleryPage from '@/views/GalleryPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import AccountPage from '@/views/AccountPage.vue';

const routes = [
  {path: '/', name: 'HomePage', component: HomePage},
  {path: '/gallery', name: 'GalleryPage', component: GalleryPage},
  {path: '/checkout', name: 'CheckoutPage', component: CheckoutPage},
  {path: '/account', name: 'AccountPage', component: AccountPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
