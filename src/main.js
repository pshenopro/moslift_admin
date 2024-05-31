import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.scss'

const vuetify = createVuetify({
  components,
  directives,
  defaultSet: 'mdi'
})

createApp(App).use(vuetify).use(router).use(Vue3Toastify, {
  autoClose: 3000,
}).mount('#app')
