import UserModel from '@/models/UserModel';

const createUserModel = (firebaseUser, firestoreData = {}) => {
  if (!firebaseUser) {
    return null;
  }
  const {uid, email} = firebaseUser;
  const role = firestoreData.role || 'customer';

  const userData = {
    id: uid,
    email: email,
    role: role,
    firstName: firestoreData.firstName || '',
    lastName: firestoreData.lastName || '',
    shippingAddress: firestoreData.shippingAddress || null
  };
  return new UserModel(userData.id, userData.email, userData.role, userData.firstName, userData.lastName, userData.shippingAddress)
};

export default createUserModel;
