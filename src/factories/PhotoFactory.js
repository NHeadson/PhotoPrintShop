import PhotoModel from "@/models/PhotoModel.js";

const createPhotoModel = (data, id) => {
  if (!data) return null;

  const photoId = id || data.id;

  return new PhotoModel(
    photoId,
    data.title,
    data.imageUrl,
    data.description,
    data.basePrice,
    data.availableOptions
  );
};

export default createPhotoModel;
