import { defineStore } from "pinia";
import { auth, db } from "@/main";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const useUserStore = defineStore("user", {
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
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        this.profile = userDoc.data();
      }
    },
    async updateUserProfile(updates) {
      if (!this.userUID) return;
      await updateDoc(doc(db, "users", this.userUID), updates);
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
      this.cartItems = querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        const quantity = Math.max(
          1,
          parseInt(
            data.quantity ??
              data.options?.quantity ??
              data.chosenOptions?.quantity ??
              data.itemQty,
            10,
          ) || 1,
        );

        return {
          id: docSnapshot.id,
          ...data,
          options: data.options || data.chosenOptions || {},
          chosenOptions: data.chosenOptions || data.options || {},
          price: data.price ?? data.itemPrice ?? 0,
          quantity,
        };
      });
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
