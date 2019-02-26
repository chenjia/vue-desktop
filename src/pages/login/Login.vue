<template>
  <div>
    login　form   
  </div>
</template>

<script>
import store from '../../vuex/store'
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      model:{
        userId: 'admin',
        username: 'admin',
        password: 'admin',
        captcha: '',
        captchaToken: ''
      },
      toggle:{
        login: false,
        loading: false,
        loginType: 'form'
      },
      server: Config.server,
      base64Img:''

    }
  },
  methods: {
    ...mapMutations({
      doLogin:'LOGIN',
      doLogout:'LOGOUT'
    }),
    getCaptcha(){
      utils.http.post('/manage/user/captcha').then(response => {
        this.model.captchaToken = response.data.body.data.captchaToken
        this.base64Img = 'data:image/png;base64, '+response.data.body.data.base64Img
      })
    },
    login(){
      if(store.state.common.ui.loading){
        return;
      }
      if(this.model.captcha == ''){
        store.commit('TOGGLE_POPUP', {visible: true, text: '验证码不能为空', duration: 3000})
        return
      }

      store.commit('TOGGLE_LOADING', true)

      setTimeout(()=>{
        utils.http.post('/manage/user/login', this.model).then(response => {
          if(response.data.body.data) {
            this.doLogin({
              user:response.data.body.data.user,
              userSetting:response.data.body.data.userSetting
            })
            setTimeout(()=>{
              this.go('/page/home')
            },500)
          }else{
            store.commit('TOGGLE_POPUP', {visible: true, text: response.data.head.msg, duration: 3000})
            this.getCaptcha()
          }
          setTimeout(()=>{
            store.commit('TOGGLE_LOADING', false)
          },1000)
        }, error => {
          setTimeout(()=>{
            this.go('/page/home')
          },500)
          setTimeout(()=>{
            store.commit('TOGGLE_LOADING', false)
          },1000)
        })
      },10)
    },
    reset(){
      this.model = {}
    },
    changeTab(){

    }
  },
  watch:{
    server(value){
      Config.server = value
    }
  },
  mounted(){
    
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.doLogout()
      vm.getCaptcha()
      vm.model.captcha = ''
    })
  }
}
</script>
<style type="text/css" scoped>
  .form{
    max-width:300px;
    width:300px;
    height:300px;
    padding:35px 100px;
  }
  .form-item{
    margin-top:20px;
  }
</style>