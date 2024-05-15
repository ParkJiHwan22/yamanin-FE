import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './main.css' // main.css 파일 불러옴

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
