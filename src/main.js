window.Config = {
  server: 'http://47.100.119.102/lxt-gateway',
  key:'ed26d4cd99aa11e5b8a4c89cdc776729',
  random:(''+Math.random()).substr(2),
  preload: 3000
}

import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './vuex/store'
import { mapMutations } from 'vuex'
import utils from './utils'
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import '../static/css/main.css'
Vue.use(EasyUI);
Vue.config.productionTip = false
window.utils = utils
window.Vue = Vue

Vue.mixin({
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      colors:[
      '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', 
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', 
      '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
      '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
      ]
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back() {
      router.goBack()
    },
    ...mapMutations({
      toggleLoading: 'TOGGLE_LOADING'
    })
  }
})

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})