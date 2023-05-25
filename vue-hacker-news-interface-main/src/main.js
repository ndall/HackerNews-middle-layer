import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Loading, QSpinnerGears } from 'quasar';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const app = createApp(App);
const pinia = createPinia();

if (localStorage.getItem('state')) {
  pinia.state.value = JSON.parse(localStorage.getItem('state'));
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('state', JSON.stringify(state));
  },
  { deep: true }
);

app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: {
    Loading,
  },
  config: {
    loading: {
      spinner: QSpinnerGears,
      message: 'Loading the news list...',
      customClass: 'loading',
    },
  },
});

app.provide('dayjs', dayjs);

app.mount('#app');
