class CartItemModel {
  constructor(id, userId, photoId, chosenOptions, itemPrice) {
    if (!id || !userId || !photoId || itemPrice === undefined || !chosenOptions) {
      throw new Error('Cart item ID, user ID, photo ID, item price, quantity, and chosen options are required.');
    }
    this.id = id;
    this.userId = userId;
    this.photoId = photoId;
    this.chosenOptions = chosenOptions;
    this.itemPrice = parseFloat(itemPrice);
  }
  getTotal() {
    return this.itemPrice * (this.chosenOptions.quantity || 1); // Quantity should be in options
  }
}

export default CartItemModel;
