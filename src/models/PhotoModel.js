class PhotoModel {
  constructor(id, title, imageUrl, description, basePrice, availableOptions = []) {
    if (!id || !title || !imageUrl || !description || basePrice === undefined) {
      throw new Error('Photo ID, title, image URL, description, and base price are required.');
    }
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.basePrice = basePrice;
    this.availableOptions = availableOptions;
  }
  getPrice(chosenOptions) {
    let price = this.basePrice;
    // TODO: Logic for add-on price changes here

    return price;
  }
}

export default PhotoModel;
