import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

import './assets/main.css'

// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/scss/bootstrap.scss';

// const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
// popoverTriggerList.map(function (popoverTriggerEl) {
//     return new Popover(popoverTriggerEl)
// })

import "dragula/dist/dragula.css"

// import Popper from 'vue3-popper'

//
// Icons from Font Awesome
//
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamation, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamation, faCircleExclamation, faTriangleExclamation)

const app = createApp(App)

// app.component("Popper", Popper)
app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(router)

app.mount('#app')
