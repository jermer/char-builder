import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

import './assets/main.css'

// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/scss/bootstrap.scss';

// Drag and Drop removed in Ability Ranking
// import "dragula/dist/dragula.css"

//
// Icons from Font Awesome
//
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation, faTriangleExclamation, faCircleArrowUp, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleExclamation, faTriangleExclamation, faCircleArrowUp, faCircleArrowDown)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(router)

app.mount('#app')
