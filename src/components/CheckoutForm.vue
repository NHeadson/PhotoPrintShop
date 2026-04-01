<script>
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from "@/stores/userStore";
import { useNotifications } from "@/stores/notificationStore";
import { redirectAfterModal } from "@/utils/redirectAfterModal";

const TEST_CARD = Object.freeze({
  number: "3333333333333333",
  expiration: "03/33",
  cvv: "333",
});

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
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      creditCard: {
        number: "",
        expiration: "",
        cvv: "",
      },
      rules: {
        required: (value) => !!value || "This field is required.",
        cardNumber: (value) => /^\d{16}$/.test((value || "").replace(/\s+/g, "")) || "Card number must be 16 digits.",
        cardNumberExact: (value) => (value || "").replace(/\s+/g, "") === TEST_CARD.number || "Only the test card number is accepted.",
        expiration: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test((value || "").trim()) || "Use MM/YY format.",
        expirationExact: (value) => (value || "").trim() === TEST_CARD.expiration || "Use the required test expiration.",
        cvv: (value) => /^\d{3}$/.test((value || "").trim()) || "CVV must be 3 digits.",
        cvvExact: (value) => (value || "").trim() === TEST_CARD.cvv || "Use the required test CVV.",
      },
    };
  },
  computed: {
    fullAddress() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.profile) {
      const { firstName, lastName, email, shippingAddress } = userStore.profile;
      this.user.firstName = firstName || "";
      this.user.lastName = lastName || "";
      this.user.email = email || "";
      if (shippingAddress) {
        if (typeof shippingAddress === "string") {
          const [street, city, state, zipCode] = shippingAddress.split(", ");
          this.address.street = street || "";
          this.address.city = city || "";
          this.address.state = state || "";
          this.address.zipCode = zipCode || "";
        } else {
          this.address.street = shippingAddress.street || "";
          this.address.city = shippingAddress.city || "";
          this.address.state = shippingAddress.state || "";
          this.address.zipCode = shippingAddress.zip || shippingAddress.zipCode || "";
        }
      }
    }
  },
  methods: {
    isAddressEmpty(address) {
      if (!address) return true;
      if (typeof address === "string") {
        return !address.trim();
      }
      return (
        !address.street?.trim() &&
        !address.city?.trim() &&
        !address.state?.trim() &&
        !(address.zip || address.zipCode)?.toString().trim()
      );
    },
    normalizeCreditCard() {
      return {
        number: (this.creditCard.number || "").replace(/\s+/g, ""),
        expiration: (this.creditCard.expiration || "").trim(),
        cvv: (this.creditCard.cvv || "").trim(),
      };
    },
    async saveOrder(userId, orderData) {
      try {
        const userOrdersRef = collection(db, "users", userId, "orders");
        await addDoc(userOrdersRef, orderData);
        return;
      } catch (error) {
        if (error?.code !== "permission-denied") {
          throw error;
        }
      }

      // Fallback for stricter rule sets that only allow writes to the user document.
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        orders: arrayUnion({
          ...orderData,
          id: crypto?.randomUUID ? crypto.randomUUID() : `order-${Date.now()}`,
        }),
      });
    },
    async clearCart(userId, userStore) {
      const cartRef = collection(db, "users", userId, "cart");
      const cartSnapshot = await getDocs(cartRef);
      const deletePromises = cartSnapshot.docs.map((docSnapshot) => deleteDoc(docSnapshot.ref));
      await Promise.all(deletePromises);
      userStore.cartItems = [];
    },
    async placeOrder() {
      const userStore = useUserStore();
      const notifications = useNotifications();
      const userId = userStore.userUID;

      if (!userId) {
        notifications.warning("You must be logged in to place an order.", {
          title: "Login Required",
          variant: "modal",
        });
        return;
      }

      if (
        !this.address.street.trim() ||
        !this.address.city.trim() ||
        !this.address.state.trim() ||
        !this.address.zipCode.trim()
      ) {
        notifications.warning("Complete shipping address is required.", {
          title: "Missing Information",
          variant: "modal",
        });
        return;
      }

      if (!this.validateCreditCard()) {
        notifications.warning("Invalid credit card details.", {
          title: "Invalid Payment Details",
          variant: "modal",
        });
        return;
      }

      const card = this.normalizeCreditCard();

      const orderData = {
        userId,
        items: this.cartItems,
        orderDate: new Date().toISOString(),
        totalAmount: this.calculateTotal(),
        shippingAddress: {
          street: this.address.street.trim(),
          city: this.address.city.trim(),
          state: this.address.state.trim(),
          zip: this.address.zipCode.trim(),
        },
        status: "Pending",
        payment: { last4: card.number.slice(-4), method: "test-card" },
      };

      try {
        await this.saveOrder(userId, orderData);

        // Save address to user profile if they don't have one
        if (this.isAddressEmpty(userStore.profile?.shippingAddress)) {
          await userStore.updateUserProfile({
            shippingAddress: {
              street: this.address.street.trim(),
              city: this.address.city.trim(),
              state: this.address.state.trim(),
              zip: this.address.zipCode.trim(),
            },
          });
        }

        let cartClearFailed = false;
        try {
          await this.clearCart(userId, userStore);
        } catch (cartError) {
          cartClearFailed = true;
          console.error("Order saved but cart clear failed:", cartError);
        }

        if (cartClearFailed) {
          await redirectAfterModal(
            this.$router,
            { name: "AccountPage" },
            "Order placed, but your cart could not be cleared due to Firestore permissions.",
            {
              title: "Order Placed",
              duration: 4200,
            }
          );
        } else {
          notifications.success("Order placed successfully!");
          this.$router.push({
            name: "AccountPage",
          });
        }
      } catch (error) {
        console.error("Error placing order:", error);
        notifications.error(`Failed to place order (${error?.code || "unknown-error"}).`, {
          title: "Order Failed",
          variant: "modal",
        });
      }
    },
    validateCreditCard() {
      const { number, expiration, cvv } = this.normalizeCreditCard();
      return (
        number === TEST_CARD.number &&
        expiration === TEST_CARD.expiration &&
        cvv === TEST_CARD.cvv
      );
    },
    calculateTotal() {
      return this.cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      );
    },
  },
}
</script>

<template>
  <v-container class="bg-light" fluid>
    <h2>Checkout Form</h2>
    <v-row class="mt-5">
      <v-col cols="4">
        <v-text-field v-model="user.firstName" label="First Name" outlined readonly
          :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="user.lastName" label="Last Name" outlined readonly
          :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="user.email" label="Email" outlined readonly :rules="[rules.required]"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="address.street" label="Street Address" outlined :rules="[rules.required]"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="address.city" label="City" outlined :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="address.state" label="State" outlined :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="address.zipCode" label="Zip Code" outlined :rules="[rules.required]"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="creditCard.number" label="Credit Card Number" outlined maxlength="16"
          :rules="[rules.required, rules.cardNumber, rules.cardNumberExact]"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model.trim="creditCard.expiration" label="Expiration (MM/YY)" outlined maxlength="5"
          :rules="[rules.required, rules.expiration, rules.expirationExact]"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model.trim="creditCard.cvv" label="CVV" outlined maxlength="3"
          :rules="[rules.required, rules.cvv, rules.cvvExact]"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="mt-10 float-right" color="var(--link)" @click="placeOrder">Place Order</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.bg-light {
  background-color: var(--light);
}
</style>
