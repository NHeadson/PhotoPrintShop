<script>
import {collection, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CheckoutForm",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      shippingAddress: "",
    };
  },
  methods: {
    async placeOrder() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (!userId) {
        alert("You must be logged in to place an order.");
        return;
      }

      if (!this.shippingAddress.trim()) {
        alert("Shipping address is required.");
        return;
      }

      const orderData = {
        userId,
        items: this.cartItems,
        orderDate: new Date(),
        totalAmount: this.calculateTotal(),
        shippingAddress: this.shippingAddress,
        status: "Pending",
      };

      try {
        // Add the order to the Firestore orders collection
        const ordersRef = collection(db, "orders");
        await addDoc(ordersRef, orderData);

        // Remove items from the cart
        const cartRef = collection(db, "users", userId, "cart");
        for (const item of this.cartItems) {
          await deleteDoc(doc(cartRef, item.id));
        }

        // Update the user's shipping address in their profile
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {shippingAddress: this.shippingAddress});

        alert("Order placed successfully!");
        this.$emit("order-placed");
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
    calculateTotal() {
      return this.cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      );
    },
  },
};
</script>

<template>
  <v-container>
    <h2>Checkout Form</h2>
    <v-textarea
      v-model="shippingAddress"
      label="Shipping Address"
      rows="3"
      outlined
    ></v-textarea>
    <v-btn color="primary" @click="placeOrder">Place Order</v-btn>
  </v-container>
</template>
