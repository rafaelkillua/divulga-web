import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import './assets/styles/tailwind.css'
import './services/validations'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
