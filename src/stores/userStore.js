import { defineStore } from 'pinia';
import { auth, db } from '@/main';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userUID: null,
    profile: null, // Stores user profile data
    user: null,
    role: null,
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
    monitorAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.userUID = user.uid;
          await this.fetchUserProfile(user.uid);
          this.user = user;
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          this.role = userDoc.exists() ? userDoc.data().role : 'customer';
        } else {
          this.isLoggedIn = false;
          this.userUID = null;
          this.profile = null;
          this.user = null;
          this.role = null;
        }
      });
    },
  },
});
