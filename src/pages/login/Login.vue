<template>
  <div class="flexable center" style="position:absolute;width:100%;height:100%;align-items: center;">
    <el-tabs v-model="toggle.loginType" type="border-card" @tab-click="changeTab()" style="margin:0 auto;">
      <el-tab-pane label="账号登录" name="form">
        <form class="form">
          <el-input class="form-item" v-model="model.username" placeholder="请输入用户名">
            <template slot="prepend">
              <i class="fa fa-user"></i>
            </template>
          </el-input>
          <el-input class="form-item" v-model="model.password" placeholder="请输入密码" type="password">
            <template slot="prepend">
              <i class="fa fa-lock"></i>
            </template>
          </el-input>
          <el-input class="form-item catpcha" v-model="model.captcha" placeholder="请输入验证码" maxlength="4">
            <template slot="prepend">
              <i class="fa fa-shield"></i>
            </template>
            <template slot="append" style="padding:0;">
              加载验证码
              <img @click="getCaptcha" :src="base64Img" style="position:absolute;left:0;top:0;width:99%;height:36px;">
            </template>
          </el-input>

          <div style="margin:20px;">
            <el-button @click="login()" icon="fa fa-user" type="primary" plain> 登录</el-button>
            <el-button @click="reset()" icon="fa fa-refresh" plain> 重置</el-button>
          </div>
        </form>
      </el-tab-pane>
      <el-tab-pane label="二维码登录" name="qrcode">
        <form class="form">
          <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" />
        </form>
      </el-tab-pane>
    </el-tabs>

    
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
      utils.http.post('/lxt-manage/api/user/captcha').then(response => {
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
        utils.http.post('/lxt-manage/api/user/login', this.model).then(response => {
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