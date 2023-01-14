import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue from 'vue'
import { createProvider } from './vue-apollo'

loadFonts()

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
