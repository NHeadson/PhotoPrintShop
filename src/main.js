import {createApp} from 'vue';
import App from './App.vue';
import {createVuetify} from 'vuetify';
import 'vuetify/styles';
import '@/styles/settings.scss';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import router from '@/router';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { app, db, auth };

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).use(router).mount('#app');
