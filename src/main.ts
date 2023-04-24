import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@/assets/styles/style.scss'

import { createApp } from 'vue'

import App from '@/App.vue'
import {
  createAxiosInstance,
  i18n,
  initZod,
  pinia,
} from '@/plugins'
import router from '@/router'

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)

// initSentry(app, router)

initZod()
createAxiosInstance()

app.mount('#app')
