import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

import {
  createAxiosInstance,
  i18n,
  initZod,
  pinia,
} from '@/plugins'

import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'

import '@/assets/styles/style.scss'

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)

// initSentry(app, router)

initZod()
createAxiosInstance()

app.mount('#app')
