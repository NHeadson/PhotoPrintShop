import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import './styles/settings.scss';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).mount('#app');
