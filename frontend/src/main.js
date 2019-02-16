import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false
Axios.defaults.baseURL = process.env.API_ENDPOINT

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
