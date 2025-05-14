<script>
export default {
  name: "OrderSummary",
  props: {
    orderDetails: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <v-container class="bg-light pa-5">
    <h1>Order Confirmation</h1>
    <p>Thank you for your order, {{ orderDetails.userName }}!</p>
    <p><strong>Order ID:</strong> {{ orderDetails.orderId }}</p>
    <p><strong>Order Date:</strong> {{ new Date(orderDetails.orderDate).toLocaleString() }}</p>
    <p><strong>Total Amount:</strong> ${{ orderDetails.totalAmount.toFixed(2) }}</p>
    <p><strong>Shipping Address:</strong> {{ orderDetails.shippingAddress }}</p>
    <h3>Items:</h3>
    <v-table>
      <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in orderDetails.items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.price.toFixed(2) }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
.bg-light {
  background-color: var(--light);
}
</style>
