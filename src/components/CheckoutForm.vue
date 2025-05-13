<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/main.js";
import createOrderModel from "@/factories/OrderFactory.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CheckoutForm",
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

      const orderData = {
        userId,
        items: this.$props.cartItems,
        orderDate: new Date(),
        totalAmount: this.calculateTotal(),
        shippingAddress: this.shippingAddress,
      };

      const order = createOrderModel(orderData);

      try {
        const ordersRef = collection(db, "orders");
        await addDoc(ordersRef, order);
        alert("Order placed successfully!");
      } catch (error) {
        console.error("Error placing order:", error);
      }
    },
    calculateTotal() {
      return this.$props.cartItems.reduce(
        (total, item) => total + item.itemPrice,
        0
      );
    },
  },
};
</script>
