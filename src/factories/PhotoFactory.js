import PhotoModel from "@/models/PhotoModel.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main.js";

const createPhotoModel = (data, id) => {
  if (!data) return null;

  const photoId = id || data.id;

  return new PhotoModel(
    photoId,
    data.title,
    data.imageUrl,
    data.description,
    data.availableOptions
  );
};

const fetchPhotos = async () => {
  const photos = [];
  const querySnapshot = await getDocs(collection(db, "photos"));
  querySnapshot.forEach(doc => {
    const photoData = doc.data();
    photos.push(createPhotoModel(photoData, doc.id));
  });
  return photos;
};

export { createPhotoModel, fetchPhotos };
