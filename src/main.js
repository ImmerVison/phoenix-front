import 'uno.css';
import './styles/preset.css'
import '@unocss/reset/tailwind.css';

import 'vue-waterfall-plugin-next/dist/style.css'

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";
import {createPinia} from "pinia";


const pinia = createPinia()
const app = createApp(App);



app
    .use(pinia)
    .use(router)
    .mount('#app')
