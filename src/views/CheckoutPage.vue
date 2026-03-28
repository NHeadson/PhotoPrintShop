<script>
import Cart from "@/components/Cart.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CheckoutPage",
  components: {
    Cart,
    CheckoutForm,
  },
  data() {
    return {
      showCheckoutForm: false,
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    cartItems() {
      return this.userStore.cartItems;
    },
  },
  async created() {
    await this.userStore.fetchCartItems();
  },
  methods: {
    async removeCartItem(itemId) {
      const userId = this.userStore.userUID;

      if (userId) {
        try {
          await deleteDoc(doc(db, "users", userId, "cart", itemId));
          this.userStore.cartItems = this.userStore.cartItems.filter((item) => item.id !== itemId);
          alert("Item removed successfully!");
        } catch (error) {
          console.error("Error removing item:", error);
          alert("Failed to remove item.");
        }
      }
    },
    async updateCartItemQuantity({ itemId, newQuantity }) {
      const userId = this.userStore.userUID;
      const quantity = Math.max(1, parseInt(newQuantity, 10) || 1);

      if (!userId) return;

      try {
        const cartItemRef = doc(db, "users", userId, "cart", itemId);
        await updateDoc(cartItemRef, {
          quantity,
          "options.quantity": quantity,
          "chosenOptions.quantity": quantity,
        });

        this.userStore.cartItems = this.userStore.cartItems.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            quantity,
            options: { ...(item.options || {}), quantity },
            chosenOptions: { ...(item.chosenOptions || {}), quantity },
          };
        });
      } catch (error) {
        console.error("Error updating item quantity:", error);
        alert("Failed to update item quantity.");
      }
    },
    proceedToCheckout() {
      this.showCheckoutForm = true;
    },
  },
};
</script>

<template>
  <v-container>
    <h1>Your Cart</h1>
    <template v-if="!showCheckoutForm">
      <Cart :cartItems="cartItems" :photos="$root.$data.photos" @remove-item="removeCartItem"
        @update-quantity="updateCartItemQuantity" />
      <div class="text-right mt-2" v-if="cartItems.length > 0">
        <v-btn class="mt-0 mr-10" color="var(--link)" large @click="proceedToCheckout">
          Proceed to Checkout
        </v-btn>
      </div>
    </template>
    <template v-else>
      <CheckoutForm :cartItems="cartItems" />
    </template>
  </v-container>
</template>
