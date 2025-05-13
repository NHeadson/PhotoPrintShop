import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import {createVuetify} from 'vuetify';
import 'vuetify/styles';
import '@/styles/settings.scss';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import router from '@/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import photos from "./photos.json";
import path from "path";
import fs from "fs";
import { getAuth } from "firebase/auth";
import { useUserStore } from '@/stores/userStore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAScpWYrMAO_CuMsRQFo_TsS9OaeNZ-ynU",
  authDomain: "javascript2final.firebaseapp.com",
  projectId: "javascript2final",
  storageBucket: "javascript2final.firebasestorage.app",
  messagingSenderId: "930907263746",
  appId: "1:930907263746:web:1f2762ed04ca097df8281b"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

async function uploadPhoto(photo) {
  const fileBuffer = fs.readFileSync(path.resolve(photo.filePath));
  const storageRef = ref(storage, `photos/${path.basename(photo.filePath)}`);
  await uploadBytes(storageRef, fileBuffer);
  const imageUrl = await getDownloadURL(storageRef);

  const photoData = {
    title: photo.title,
    description: photo.description,
    imageUrl,
  };

  const photosRef = collection(db, "photos");
  await addDoc(photosRef, photoData);
  console.log(`Uploaded: ${photo.title}`);
}

async function batchUpload() {
  for (const photo of photos) {
    try {
      await uploadPhoto(photo);
    } catch (error) {
      console.error(`Failed to upload ${photo.title}:`, error);
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  batchUpload();
}

export { app, db, auth };
const pinia = createPinia();
const userStore = useUserStore(pinia);
userStore.monitorAuthState();

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(pinia).use(vuetify).use(router).mount('#app');
