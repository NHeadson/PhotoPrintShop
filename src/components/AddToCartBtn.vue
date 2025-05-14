<script>
import createCartItemModel from "@/factories/CartItemFactory.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "AddToCartBtn",
  props: {
    photo: { type: Object, required: true },
    chosenOptions: { type: Object, required: true },
  },
  methods: {
    async addToCart() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (!userId) {
        alert("You must be logged in to add items to the cart.");
        return;
      }

      const cartItem = createCartItemModel(
        { chosenOptions: this.chosenOptions },
        userId,
        this.photo
      );

      try {
        const cartRef = collection(db, "users", userId, "cart");
        await addDoc(cartRef, cartItem);

        // Fetch updated cart items
        await userStore.fetchCartItems();

        alert("Item added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
  },
};
</script>
