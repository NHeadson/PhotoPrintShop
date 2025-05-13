<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "CartPreview",
  data() {
    return {
      cartItems: [],
    };
  },
  async created() {
    const userStore = useUserStore();
    const userId = userStore.userUID;

    if (userId) {
      const cartRef = collection(db, "users", userId, "cart");
      const querySnapshot = await getDocs(cartRef);
      this.cartItems = querySnapshot.docs.map((doc) => doc.data());
    }
  },
};
</script>
