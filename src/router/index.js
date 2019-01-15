import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Page from '../components/Page'
import login from './login'
import desktop from './desktop'

Vue.use(Router)

Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
const router = new Router({
  routes:[{
    path:'/',
    redirect:'/page/desktop'
  },
  ...login,
  {
    name:'page',
    path:'/page',
    component:Page,
    children:[
      ...desktop
    ]
  }]
})

let routerMap = {}
let ready = false
let loader = document.querySelector('.loader-box')
let timer1,timer2;

router.beforeEach((to, from, next) => {
  if(!routerMap[to.name]){
    if(loader.className.indexOf('fadeOut') !== -1){
      timer1 = setTimeout(()=>{
        loader.style.display = 'block'
        timer2 = setTimeout(()=>{
          loader.className = loader.className.replace(' fadeOut', '')
        })
      },100)
    }
  }

  next()
  // if(to.meta.login != false && !store.state.common.user) {
  //   store.commit('TOGGLE_POPUP', {
  //     visible: true,
  //     text: '请先登录！',
  //     duration: 3000
  //   })
  //   next('/page/login')
  // } else {
  //   next()
  // }
})

router.afterEach((to, from) => {
  clearTimeout(timer2)
  clearTimeout(timer1)
  routerMap[to.name] = true
  
  if(ready){
    if(loader.className.indexOf('fadeOut') === -1){
      setTimeout(()=>{
        loader.className += ' fadeOut'
      },500)
      setTimeout(()=>{
        loader.style.display = 'none'
      },1000)
    }
  }else{
    ready = true
    if(loader.className.indexOf('fadeOut') === -1){
      loader.className += ' fadeOut'
      setTimeout(()=>{
        loader.style.display = 'none'
      },500)
    }
  }
})
export default router