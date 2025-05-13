<script>
import {db} from "@/main.js";
import {collection, addDoc} from "firebase/firestore";
import {useUserStore} from "@/stores/userStore";

export default {
  name: 'PhotoCard',
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      showModal: false,
      printOptions: {
        dimensions: '',
        medium: '',
        finish: '',
        frame: '',
      },
      basePrice: 20.00,
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  computed: {
    formattedPrice() {
      let price = this.basePrice;

      // Size Options
      if (this.printOptions.dimensions === '16x20 +$15') price += 15.00;
      if (this.printOptions.dimensions === '24x36 +$30') price += 30.00;

      // Print Medium Options
      if (this.printOptions.medium === 'Professional Paper +$15') price += 15.00;
      if (this.printOptions.medium === 'Canvas +$35') price += 35.00;

      // Finish Options
      if (this.printOptions.finish === 'Semi-Gloss +$4.50') price += 4.50;
      if (this.printOptions.finish === 'Matte +$7') price += 7.00;

      if (this.printOptions.frame === 'Black Frame +$20' || this.printOptions.frame === 'White Frame +$20') price += 20.00;

      return `$${price.toFixed(2)}`;
    },
  },
  methods: {
    async handleAddToCart() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (!userId) {
        alert("You must be logged in to add items to the cart.");
        return;
      }

      try {
        const cartItem = {
          photoId: this.photo.id,
          options: this.printOptions,
          price: parseFloat(this.formattedPrice), // Use the computed price
          addedAt: new Date(),
        };
        const cartRef = collection(db, "users", userId, "cart");
        const docRef = await addDoc(cartRef, cartItem);
        console.log("Cart item added with ID: ", docRef.id);
        alert("Item added to cart successfully!");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        alert("Failed to add item to cart.");
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="mx-auto"
      variant="outlined"
      v-bind="props"
    >
      <v-skeleton-loader
        v-if="isLoading"
        type="image"
        height="40vh"
      />

      <v-img
        v-show="!isLoading"
        :src="photo.src"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="40vh"
        cover
      >
      </v-img>
      <v-overlay
        :model-value="!!isHovering"
        class="align-center justify-center overlay"
        scrim="grey"
        @click="showModal = true"
        contained
      >
        <v-btn variant="flat">View Full Image</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>

  <!-- Modal -->
  <v-dialog v-model="showModal" max-width="80vw" class="modal-bg">
    <v-card class="d-flex flex-row card-bg" height="80vh">
      <!-- Full Image -->
      <v-img
        :src="photo.src"
        class="flex-grow-1 px-0 mx-0"
      ></v-img>

      <!-- Print Options Menu -->
      <v-container class="pa-8 align-self-center menu-bg" width="30%">
        <h3>Print Options</h3>
        <v-select
          v-model="printOptions.dimensions"
          :items="['8x10', '16x20 +$15', '24x36 +$30']"
          label="Dimensions"
          :rules="[rules.required]"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.medium"
          :items="['Canvas +$35', 'Standard Paper', 'Professional Paper +$15']"
          label="Select Medium"
          :rules="[rules.required]"
          placeholder="Choose a medium"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.finish"
          :items="['Matte +$7', 'Semi-Gloss +$4.50', 'High-Gloss']"
          label="Select Finish"
          :rules="[rules.required]"
          placeholder="Choose a finish"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.frame"
          :items="['No Frame', 'Black Frame +$20', 'White Frame +$20']"
          label="Select Frame"
          :rules="[rules.required]"
          placeholder="Choose a frame"
          outlined
          :disabled="printOptions.medium === 'Canvas +$35'"
        ></v-select>
        <p class="mt-4"><strong>Price:</strong> {{ formattedPrice }}</p>
        <v-btn color="var(--link)" class="mt-4" @click="handleAddToCart">Add to Cart</v-btn>
      </v-container>
    </v-card>
  </v-dialog>

</template>

<style scoped>

.modal-bg {
  background-color: rgba(0, 0, 0, 0.8);
}

.card-bg {
  background-color: rgb(38, 38, 38);
  border-radius: 10px;
  padding: 1%;
}

.menu-bg {
  background-color: var(--light);
  border-radius: 10px;
  margin: 1%;
}

.overlay:hover {
  cursor: pointer;
}

</style>
