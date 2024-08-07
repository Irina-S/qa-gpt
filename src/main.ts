import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// @ts-ignore
import VueMarkdownIt from 'vue3-markdown-it';

import 'markdown-it-latex/dist/index.css';
import 'highlight.js/styles/monokai.css';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueMarkdownIt);

app.mount('#app');
