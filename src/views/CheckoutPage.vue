<script>
import CheckoutForm from "@/components/CheckoutForm.vue";
import OrderSummary from "@/components/OrderSummary.vue";

export default {
  name: "CheckoutPage",
  components: { CheckoutForm, OrderSummary },
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <v-container>
    <OrderSummary :cartItems="cartItems" />
    <CheckoutForm :cartItems="cartItems" />
  </v-container>
</template>
