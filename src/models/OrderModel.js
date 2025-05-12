class OrderModel {
  constructor(id, userId, items, orderDate, totalAmount, shippingAddress, status = 'pending') {
    if (!id || !userId || !items || !orderDate || totalAmount === undefined || !shippingAddress) {
      throw new Error('Order ID, user ID, items, order date, total amount, and shipping address are required.');
    }
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.orderDate = orderDate;
    this.totalAmount = totalAmount;
    this.shippingAddress = shippingAddress;
    this.status = status;
  }
}

export default OrderModel;
