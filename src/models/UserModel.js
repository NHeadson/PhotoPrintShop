class UserModel {
  constructor(
    id,
    email,
    firstName = "",
    lastName = "",
    shippingAddress = { street: "", city: "", state: "", zip: "" },
  ) {
    if (!id || !email) {
      throw new Error("User ID and email are required.");
    }
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.shippingAddress = shippingAddress || {
      street: "",
      city: "",
      state: "",
      zip: "",
    };
  }
}

export default UserModel;
