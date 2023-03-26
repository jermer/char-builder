import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import "dragula/dist/dragula.css"

const app = createApp(App)

app.use(router)

app.mount('#app')
