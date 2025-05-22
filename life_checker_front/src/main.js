import { createApp } from 'vue'
import { createPinia } from 'pinia'  //追加
import App from './App.vue'
import './assets/main.css'
const app = createApp(App)
app.use(createPinia())  //追加
app.mount('#app')