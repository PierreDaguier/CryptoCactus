/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Web3 from 'web3';



// Plugins
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)
  .use(vuetify)
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
app.provide('web3', web3);

registerPlugins(app)

app.mount('#app')
