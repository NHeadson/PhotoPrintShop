export default class PhotoModel {
  constructor({ id, title, imageUrl, description }) {
    if (!id || !title || !imageUrl || !description) {
      throw new Error("Photo ID, title, image URL, and description are required.");
    }
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}
