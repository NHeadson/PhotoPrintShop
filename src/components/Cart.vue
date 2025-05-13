<script>
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
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
        }));
      }
    },
    async removeItem(itemId) {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (userId) {
        const itemRef = doc(db, "users", userId, "cart", itemId);
        await deleteDoc(itemRef);
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      }
    },
  },
};
</script>

<template>
  <v-container>
    <v-row v-for="item in cartItems" :key="item.id">
      <v-col>{{ item.photoId }}</v-col>
      <v-col>{{ item.options.dimensions }}</v-col>
      <v-col>{{ item.price }}</v-col>
      <v-btn color="red" @click="removeItem(item.id)">Remove</v-btn>
    </v-row>
  </v-container>
</template>
