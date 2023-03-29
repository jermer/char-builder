import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "dragula/dist/dragula.css"

import Popper from 'vue3-popper'

const app = createApp(App)

app.component("Popper", Popper)

app.use(router)

app.mount('#app')
