import CartItemModel from "@/models/CartItemModel.js";

const createCartItemModel = (data, userId, photoModel) => {
  if (!data || !userId || !photoModel) return null;

  const id = data.id;

  const itemPrice = parseFloat(photoModel.getPrice(data.chosenOptions));

  return new CartItemModel(
    id,
    userId,
    photoModel.id,
    data.chosenOptions,
    itemPrice
  );
};

export default createCartItemModel;
