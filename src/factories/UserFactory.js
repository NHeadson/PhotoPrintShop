import UserModel from "@/models/UserModel";

const normalizeShippingAddress = (shippingAddress) => {
  if (!shippingAddress) {
    return { street: "", city: "", state: "", zip: "" };
  }

  if (typeof shippingAddress === "string") {
    const [street = "", city = "", state = "", zip = ""] =
      shippingAddress.split(", ");
    return { street, city, state, zip };
  }

  return {
    street: shippingAddress.street || "",
    city: shippingAddress.city || "",
    state: shippingAddress.state || "",
    zip: shippingAddress.zip || shippingAddress.zipCode || "",
  };
};

const createUserModel = (firebaseUser, firestoreData = {}) => {
  if (!firebaseUser) {
    return null;
  }
  const { uid, email } = firebaseUser;

  const userData = {
    id: uid,
    email: email,
    firstName: firestoreData.firstName || "",
    lastName: firestoreData.lastName || "",
    shippingAddress: normalizeShippingAddress(firestoreData.shippingAddress),
  };
  return new UserModel(
    userData.id,
    userData.email,
    userData.firstName,
    userData.lastName,
    userData.shippingAddress,
  );
};

export default createUserModel;
