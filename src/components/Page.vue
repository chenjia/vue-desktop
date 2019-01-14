<template>
  <transition :name="transitionName" mode="out-in">
    <keep-alive :include="keepAlive">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
import router from '../router'
import store from '../vuex/store'
import {menus, messages} from './json.js'
import {
  mapGetters,mapMutations
} from 'vuex'

export default {
  name: 'page',
  components: {
    
  },
  data(){
    let path = location.href.substr(location.href.indexOf('#')+1)
    const urlArray = []
    if(path==='/page/login'){
      urlArray.push('/page/login')
    }else if(path==='/page/home'){
      urlArray.push('/page/login', '/page/home')
    }else{
      urlArray.push('/page/login', '/page/home', path)
    }
    return {
      toggle:{
        isCollapse: false
      },
      searchKey:'',
      keepAlive:['login','desktop'],
      urlArray:urlArray,
      transitionName: 'animate-in',
      breadcrumb:[],
      menus:menus,
      messages:messages
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  methods: {
    ...mapMutations({
      toggleLoading:'TOGGLE_LOADING'
    })
  },
  beforeRouteUpdate (to, from, next) {
    if(this.urlArray.length>1 && this.urlArray[this.urlArray.length-2] == to.path){
      this.$router.isBack = true
    }
    
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'animate-out'
      this.$router.isBack = false
    } else {
      this.transitionName = 'animate-in'
    }

    if(to.meta.keepAlive && this.keepAlive.indexOf(to.meta.name) == -1){
      this.keepAlive.push(to.name)
    }

    if(window.lazyLibsLoaded || ['login'].indexOf(to.name) != -1){
      next()
    }else{
      let timer = () => {
        setTimeout(() => {
          if(window.lazyLibsLoaded){
            next()
          }else{
            timer()
          }
        }, 200)
      }

      timer()
    }
  },
  created(){
    router.afterEach((to, from) => {
      if(this.urlArray.length>1 && this.urlArray[this.urlArray.length-2] == to.path){
        this.urlArray.pop()
      }else{
        this.urlArray.push(to.path)
      }
    })
  },
  mounted(){
    
  }
}
</script>
<style>
.animate-out-leave-active,.animate-in-leave-active{
  transition: all .15s ease-in;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.animate-in-enter-active,.animate-out-enter-active{
  transition: all .15s ease-out;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.animate-in-enter, .animate-out-leave-to{
  transform: translateX(50px) translateZ(0);
  opacity: 0;
}
.animate-out-enter, .animate-in-leave-to{
  transform: translateX(-50px) translateZ(0);
  opacity: 0;
}

@keyframes fade {
  0% {
    opacity:1;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
</style>