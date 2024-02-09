import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

// libreria elements
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)


//firebase
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './config/firebase'


app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(ElementPlus)

app.use(VueFire, {
    firebaseApp,
    modules:[VueFireAuth()]
})
app.mount('#app')
