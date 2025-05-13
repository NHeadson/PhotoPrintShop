import PhotoModel from "@/models/PhotoModel.js";

export async function fetchPhotos() {
  try {
    // Simulate fetching photos from an API or database
    const response = await fetch("https://example.com/api/photos");
    const photos = await response.json();

    // Ensure all required fields are present
    return photos.map((photo) => {
      if (!photo.id || !photo.title || !photo.imageUrl || !photo.description) {
        throw new Error("Photo ID, title, image URL, and description are required.");
      }
      return new PhotoModel(photo);
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}
