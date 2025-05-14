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
        return {
          ...item,
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
      this.$emit("update-quantity", {itemId, newQuantity});
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
              <v-img
                :src="item.photoUrl"
                alt="Photo Thumbnail"
                height="100%"
                class="rounded"
              ></v-img>
            </td>
            <td class="text-center">{{ item.options.dimensions }}</td>
            <td class="text-center">{{ item.options.medium || "N/A" }}</td>
            <td class="text-center">{{ item.options.finish || "N/A" }}</td>
            <td class="text-center">{{ item.options.frame || "N/A" }}</td>
            <td class="text-center">${{ item.price.toFixed(2) }}</td>
            <td>
              <v-text-field
                v-model="item.quantity"
                type="number"
                min="1"
                class="mx-auto my-3 pt-3"
                @change="updateQuantity(item.id, item.quantity)"
                outlined
                dense
                style="max-width: 60px;"
              ></v-text-field>
            </td>
            <td>
              <v-btn
                color="error"
                icon
                @click="removeItem(item.id)"
              >
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
    <v-alert v-else type="info" color="var(--link)" class="mt-4 justify-center mx-auto" width="20vw">
      Your cart is empty.
    </v-alert>
  </v-container>
</template>

<style scoped>
.text-right {
  text-align: right;
}

.bg-light {
  background-color: var(--light);
}

</style>
