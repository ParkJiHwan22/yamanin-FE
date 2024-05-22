import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import './main.css'; // main.css 파일 불러옴
import axios from 'axios';

const app = createApp(App);

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://localhost:8080';

// Axios를 Vue 인스턴스에 추가
app.config.globalProperties.$http = axios;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);  // Pinia 상태 지속 플러그인 추가

app.use(pinia);
app.use(router);

app.mount('#app');
