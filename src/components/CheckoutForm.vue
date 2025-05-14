<script>
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
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
        cardNumber: (value) => /^\d{16}$/.test(value) || "Invalid card number.",
        expiration: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || "Invalid expiration date.",
        cvv: (value) => /^\d{3}$/.test(value) || "Invalid CVV.",
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
      const {firstName, lastName, email, shippingAddress} = userStore.profile;
      this.user.firstName = firstName || "";
      this.user.lastName = lastName || "";
      this.user.email = email || "";
      if (shippingAddress) {
        const [street, city, state, zipCode] = shippingAddress.split(", ");
        this.address.street = street || "";
        this.address.city = city || "";
        this.address.state = state || "";
        this.address.zipCode = zipCode || "";
      }
    }
  },
  methods: {
    async placeOrder() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (!userId) {
        alert("You must be logged in to place an order.");
        return;
      }

      if (!this.fullAddress.trim()) {
        alert("Complete shipping address is required.");
        return;
      }

      if (!this.validateCreditCard()) {
        alert("Invalid credit card details.");
        return;
      }

      const orderData = {
        userId,
        items: this.cartItems,
        orderDate: new Date(),
        totalAmount: this.calculateTotal(),
        shippingAddress: this.fullAddress,
        status: "Pending",
        payment: {
          cardNumber: this.creditCard.number,
          expiration: this.creditCard.expiration,
          cvv: this.creditCard.cvv,
        },
      };

      try {
        const ordersRef = collection(db, "orders");
        const orderDoc = await addDoc(ordersRef, orderData);

        // Clear the cart
        const cartRef = collection(db, "users", userId, "cart");
        const cartSnapshot = await getDocs(cartRef);
        const deletePromises = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        this.$router.push({
          name: "AccountPage",
        });
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
    validateCreditCard() {
      const {number, expiration, cvv} = this.creditCard;
      const cardNumberRegex = /^\d{16}$/;
      const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      return (
        cardNumberRegex.test(number) &&
        expirationRegex.test(expiration) &&
        cvvRegex.test(cvv)
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
        <v-text-field
          v-model="user.firstName"
          label="First Name"
          outlined
          readonly
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="user.lastName"
          label="Last Name"
          outlined
          readonly
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="user.email"
          label="Email"
          outlined
          readonly
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="address.street"
          label="Street Address"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="address.city"
          label="City"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="address.state"
          label="State"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="address.zipCode"
          label="Zip Code"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="creditCard.number"
          label="Credit Card Number"
          outlined
          maxlength="16"
          :rules="[rules.required, rules.cardNumber]"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="creditCard.expiration"
          label="Expiration (MM/YY)"
          outlined
          maxlength="5"
          :rules="[rules.required, rules.expiration]"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="creditCard.cvv"
          label="CVV"
          outlined
          maxlength="3"
          :rules="[rules.required, rules.cvv]"
        ></v-text-field>
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
