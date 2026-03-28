<script>
export default {
  name: "Cart",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
  }, computed: {
    cartItemsWithImages() {
      return this.cartItems.map((item) => {
        const photo = this.photos.find((p) => p.id === item.photoId);
        const quantity = Math.max(
          1,
          parseInt(
            item.quantity ?? item.options?.quantity ?? item.chosenOptions?.quantity ?? item.itemQty,
            10
          ) || 1
        );

        return {
          ...item,
          options: item.options || item.chosenOptions || {},
          price: item.price ?? item.itemPrice ?? 0,
          quantity,
          photoUrl: photo ? photo.src : null,
        };
      });
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toFixed(2);
    },
  },
  methods: {
    removeItem(itemId) {
      this.$emit("remove-item", itemId);
    },
    updateQuantity(itemId, newQuantity) {
      const quantity = Math.max(1, parseInt(newQuantity, 10) || 1);
      this.$emit("update-quantity", { itemId, newQuantity: quantity });
    },
  },
};
</script>

<template>
  <v-container>
    <v-row v-if="cartItems.length">
      <v-col cols="12">
        <v-table class="text-center bg-light">
          <thead>
            <tr>
              <th class="text-center">Photo</th>
              <th class="text-center">Dimensions</th>
              <th class="text-center">Medium</th>
              <th class="text-center">Finish</th>
              <th class="text-center">Frame</th>
              <th class="text-center">Price</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItemsWithImages" :key="item.id">
              <td>
                <v-img :src="item.photoUrl" alt="Photo Thumbnail" height="100%" class="rounded"></v-img>
              </td>
              <td class="text-center">{{ item.options.dimensions }}</td>
              <td class="text-center">{{ item.options.medium || "N/A" }}</td>
              <td class="text-center">{{ item.options.finish || "N/A" }}</td>
              <td class="text-center">{{ item.options.frame || "N/A" }}</td>
              <td class="text-center">${{ item.price.toFixed(2) }}</td>
              <td>
                <v-text-field v-model.number="item.quantity" type="number" min="1" step="1"
                  class="text-dark mx-auto my-3 pt-3" @change="updateQuantity(item.id, item.quantity)" outlined dense
                  style="max-width: 65px;"></v-text-field>
              </td>
              <td>
                <v-btn color="error" icon @click="removeItem(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="pr-10 bg-light text-right">
          <h3>Total: ${{ totalPrice }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row v-else class="justify-center mt-6">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-sheet class="empty-cart-panel pa-8 text-center" rounded="lg">
          <v-icon size="56" color="var(--link)">mdi-cart-off</v-icon>
          <h2 class="mt-3 mb-2">Your cart is empty</h2>
          <p class="empty-cart-subtext mb-6">
            Add prints from the gallery to see them here and continue to checkout.
          </p>
          <v-btn color="var(--link)" size="large" :to="{ name: 'GalleryPage' }">
            Browse Gallery
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-right {
  text-align: right;
}

.bg-light {
  background-color: var(--light);
}

.empty-cart-panel {
  background: linear-gradient(180deg, var(--light) 0%, #ffffff 100%);
  border: 1px solid #d8d8d8;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.empty-cart-subtext {
  color: #4a4a4a;
  max-width: 34ch;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 768px) {
  .empty-cart-panel {
    padding: 1.5rem !important;
  }
}
</style>
