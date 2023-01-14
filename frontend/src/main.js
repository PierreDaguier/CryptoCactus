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

// Plugins
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)
  .use(vuetify)

registerPlugins(app)

app.mount('#app')
