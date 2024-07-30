import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/global.scss';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

// @ts-ignore
import VueMarkdownIt from 'vue3-markdown-it';

import 'markdown-it-latex/dist/index.css';
import 'highlight.js/styles/monokai.css';

import App from './App.vue';
import router from './router';
import { vuetify } from './config/vuetify';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueMarkdownIt);

app.mount('#app');
