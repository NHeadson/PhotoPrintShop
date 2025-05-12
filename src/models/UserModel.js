class UserModel {
  constructor(id, email, role, firstName = '', lastName = '', shippingAddress = null) {
    if (!id || !email || !role) {
      throw new Error('User ID, email, and role are required.');
    }
    this.id = id;
    this.email = email;
    this.role = role;   // 'customer' or 'employee'
    this.firstName = firstName;
    this.lastName = lastName;
    this.shippingAddress = shippingAddress;
  }
  isEmployee() {
    return this.role === 'employee';
  }
  isCustomer() {
    return this.role === 'customer';
  }
}

export default UserModel;
