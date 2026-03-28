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
    this.itemQty = parseInt(chosenOptions.quantity) || 1; // Default to 1 if quantity is not provided
  }
  getTotal() {
    return this.itemPrice * this.itemQty;
  }
}

export default CartItemModel;
