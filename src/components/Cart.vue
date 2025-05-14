<script>
export default {
  name: "Cart",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  }, computed: {
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
        <v-table>
          <thead>
          <tr>
            <th>Photo</th>
            <th>Dimensions</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.photoId }}</td>
            <td>{{ item.options.dimensions }}</td>
            <td>${{ item.price.toFixed(2) }}</td>
            <td>
              <v-text-field
                v-model="item.quantity"
                type="number"
                min="1"
                @change="updateQuantity(item.id, item.quantity)"
                outlined
                dense
                style="max-width: 60px;"
              ></v-text-field>
            </td>
            <td>
              <v-btn color="error" @click="removeItem(item.id)">Remove</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <div class="text-right mt-4">
          <h3>Total: ${{ totalPrice }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-alert v-else type="info" class="mt-4">
      Your cart is empty.
    </v-alert>
  </v-container>
</template>

<style scoped>
.text-right {
  text-align: right;
}
</style>
