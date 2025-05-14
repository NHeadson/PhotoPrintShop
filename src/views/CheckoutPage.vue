<script>
import Cart from "@/components/Cart.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import {db} from "@/main.js";
import {useUserStore} from "@/stores/userStore";

export default {
  name: "CheckoutPage",
  components: {
    Cart,
    CheckoutForm,
  },
  data() {
    return {
      cartItems: [],
      showCheckoutForm: false,
    };
  },
  async created() {
    await this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (userId) {
        const cartRef = collection(db, "users", userId, "cart");
        const querySnapshot = await getDocs(cartRef);
        this.cartItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          quantity: 1,
        }));
      }
    },
    async removeCartItem(itemId) {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (userId) {
        try {
          await deleteDoc(doc(db, "users", userId, "cart", itemId));
          this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
          alert("Item removed successfully!");
        } catch (error) {
          console.error("Error removing item:", error);
          alert("Failed to remove item.");
        }
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
      <Cart :cartItems="cartItems" :photos="$root.$data.photos" @remove-item="removeCartItem" />
      <div class="text-right mt-2" v-if="cartItems.length > 0">
        <v-btn
          class="mt-0 mr-10"
          color="var(--link)"
          large
          @click="proceedToCheckout"
        >
          Proceed to Checkout
        </v-btn>
      </div>
    </template>
    <template v-else>
      <CheckoutForm :cartItems="cartItems"/>
    </template>
  </v-container>
</template>
