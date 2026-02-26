import App from './App.vue'
import { createApp } from 'vue'
import Web3 from 'web3';



// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const web3 = window.ethereum ? new Web3(window.ethereum) : null;
app.provide('web3', web3);

registerPlugins(app)

app.mount('#app')
