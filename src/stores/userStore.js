import { defineStore } from 'pinia';
import { auth, db } from '@/main';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userUID: null,
    profile: null,
    user: null,
    role: null,
    cartItems: [],
  }),
  actions: {
    async fetchUserProfile(uid) {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        this.profile = userDoc.data();
      }
    },
    async updateUserProfile(updates) {
      if (!this.userUID) return;
      await updateDoc(doc(db, 'users', this.userUID), updates);
      this.profile = { ...this.profile, ...updates };
    },
    async logout() {
      await signOut(auth);
      this.isLoggedIn = false;
      this.userUID = null;
      this.profile = null;
    },
    async fetchCartItems() {
      if (!this.userUID) return;
      const cartRef = collection(db, "users", this.userUID, "cart");
      const querySnapshot = await getDocs(cartRef);
      this.cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    async monitorAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.userUID = user.uid;
          await this.fetchUserProfile(user.uid);
          await this.fetchCartItems();
        } else {
          this.isLoggedIn = false;
          this.userUID = null;
          this.profile = null;
          this.cartItems = [];
        }
      });
    },
  },
});
