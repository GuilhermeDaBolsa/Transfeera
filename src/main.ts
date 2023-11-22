// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

/* TODO see axios import and instance creation */
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

registerPlugins(app)

app.mount('#app')
