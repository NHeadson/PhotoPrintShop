import {createApp} from 'vue';
import App from './App.vue';
import {createVuetify} from 'vuetify';
import 'vuetify/styles';
import '@/styles/settings.scss';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import router from '@/router';

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
