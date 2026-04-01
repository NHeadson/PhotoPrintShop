<script>
import createCartItemModel from "@/factories/CartItemFactory.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";
import { useNotifications } from "@/stores/notificationStore";

export default {
  name: "AddToCartBtn",
  props: {
    photo: { type: Object, required: true },
    chosenOptions: { type: Object, required: true },
  },
  methods: {
    async addToCart() {
      const userStore = useUserStore();
      const notifications = useNotifications();
      const userId = userStore.userUID;

      if (!userId) {
        notifications.warning("You must be logged in to add items to the cart.", {
          title: "Login Required",
          variant: "modal",
        });
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

        notifications.success("Item added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        notifications.error("Failed to add item to cart.");
      }
    },
  },
};
</script>
