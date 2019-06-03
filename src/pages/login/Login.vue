<template>
  <div id="particles-js" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" :style="{background:'url(./static/img/desktop/'+$store.state.common.ui.bg+')'}">
    <Dialog
      borderType="thin"
      ref="loginDialog"
      :dialogStyle="{width:'485px',height:'315px'}"
      :modal="true"
      :closable="false"
      :draggable="false"
      :resizable="false">

      <Tabs ref="loginTabs" :border="false" style="height:300px" @tabSelect="tabSelect">
        <TabPanel :title="'账号登录'">
          <Form :model="user" class="pd-lg center">
            <div style="margin-bottom:20px">
              <Label for="username">账　号：</Label>
              <TextBox inputId="username" v-model="user.username"></TextBox>
            </div>
            <div style="margin-bottom:20px">
              <Label for="password">密　码：</Label>
              <PasswordBox inputId="password" v-model="user.password"></PasswordBox>
            </div>
            <div style="margin-bottom:20px">
              <Label for="captcha">验证码：</Label>
              <TextBox inputId="captcha" style="width:80px;" v-model="user.captcha" @keyup.enter.native="login()"></TextBox>
              <img :src="base64Img" @click="getCaptcha()" class="border-animation" style="width:85px;height:30px;vertical-align: middle;"/>
            </div>
            <div>
              <CheckBox inputId="remember" v-model="user.remember"></CheckBox>
              <Label for="remember">记住密码</Label>

              <LinkButton :plain="true"><i class="fa fa-fw fa-question-circle-o"></i> 忘记密码</LinkButton>
            </div>
          </Form>

          <div class="center">
            <LinkButton style="width:80px;margin-right:10px;" iconCls="fa fa-fw fa-user" :disabled="isLogin" @click="login()">登录</LinkButton>
            <LinkButton style="width:80px" iconCls="fa fa-fw fa-refresh" @click="reset()">重置</LinkButton>
          </div>
        </TabPanel>
        <TabPanel :title="'二维码登录'">
          <div v-if="title=='二维码登录'" class="flexable" style="height:280px;justify-content: space-around;align-items: center;">
            <div class="flex-item center">
              <vue-qr :gifBgSrc="gifBgSrc" :logoSrc="logoSrc" :text="qrcode" :size="240"></vue-qr>
            </div>
            <div class="flex-item center text-sm">
              <div v-if="scanned" style="color:#080;">
                <img src="static/img/yes.png" style="vertical-align: middle;">
                已扫描成功<br/>请确认二维码登录
              </div>
              <div v-else>
                <p>请使用 [vue-app] <br/>扫描二维码登录</p>
                <p>有效时间：{{timeout}}秒</p>
              </div>
            </div>
          </div>
          <iframe style="display:none;" id="pushFrame" :src="pushFrameSrc"></iframe>
        </TabPanel>
      </Tabs>
    </Dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQr from 'vue-qr'
import Update from '../../components/Update'
import { mapGetters, mapMutations } from 'vuex'
import store from '../../vuex/store'
import 'particles.js/particles'
let timer = null
export default {
  name: 'login',
  components:{
    VueQr,
    Update
  },
  data() {
    return {
      server: Config.server,
      transitionName: 'animate-in',
      user:{
        username:'',
        password:'',
        captcha:''
      },
      title:'',
      base64Img:'',
      isLogin: false,
      timeout:120,
      pushFrameSrc:'',
      qrcode:'',
      scanned:false,
      logoSrc:'static/img/logo.png',
      gifBgSrc:'static/img/qrcode.gif',
      downloadPercent:0,
      updating: false
    }
  },
  methods: {
    ...mapMutations({
      doLogin:'LOGIN',
      doLogout:'LOGOUT',
      lock:'LOCK',
      loading:'TOGGLE_LOADING'
    }),
    getCaptcha(){
      utils.http.post('/manage/user/captcha').then(response => {
        if(response.data.head.status == 200){
          this.user.captchaToken = response.data.body.data.captchaToken
          this.base64Img = 'data:image/png;base64, '+response.data.body.data.base64Img
        }
      })
    },
    login(){
      if(this.user.captcha == ''){
        alert('验证码不能为空')
        return
      }
      this.loading(true)

      if(this.user.username == '' && this.user.password == ''){
        this.user.username = 'chenjia'
        this.user.password = 'chenjia'
      }

      utils.http.post('/manage/user/login', this.user).then(response => {
        if(response.data.head.status == 200) {
          if(this.user.remember){
            utils.cache.set('rememberUser',{
              username: this.user.username,
              password: this.user.password
            })
          }else{
            utils.cache.removeItem('rememberUser')
          }
          
          this.doLogin({
            user:response.data.body.data.user,
            userSetting:response.data.body.data.userSetting
          })
          setTimeout(()=>{
            this.lock(false)
          }, 500)
          setTimeout(()=>{
            this.loading(false)
            this.$refs.loginDialog.close()
            this.$nextTick(()=>{
              this.go('/page/desktop')
            })
          },1000)
        }else{
          this.getCaptcha()
        }
        setTimeout(()=>{
          this.loading(false)
        },1000)
      }, error => {
        this.loading(false)
      })
    },
    tabSelect(panel){
      this.title = panel.title
      this.scanned = false
      this.timeout = 120
      if(panel.title=='二维码登录'){
        this.getQRCode()
        timer = setInterval(()=>{
          if(this.timeout > 0){
            this.timeout = this.timeout - 1
          }else{
            this.$refs.loginTabs.select(0)
          }
        },1000)
      }else{
        if(timer){
          clearInterval(timer)
          timer = null
        }
      }
    },
    getQRCode(){
      utils.http.post('/manage/user/qrcode', {}).then(response => {
        let uuid = response.data.body.data
        this.qrcode = uuid
        this.pushFrameSrc = this.server + '/push/pushFrame.html?userId=QRCODE_'+uuid
      }, error => {
        console.log(error)
      })
    },
    qrcodeScan(message){
      if(message.qrcode == this.qrcode){
        this.scanned = true
      }
    },
    qrcodeLogin(message){
      if(message.qrcode){
        clearInterval(timer)
        timer = null
        this.loading(true)

        utils.http.post('/manage/user/qrcodeLogin', {qrcode:message.qrcode}).then(response => {
          if(response.data.head.status == 200) {
            this.doLogin({
              user:response.data.body.data.user,
              userSetting:response.data.body.data.userSetting
            })
            setTimeout(()=>{
              this.lock(false)
            }, 500)
            setTimeout(()=>{
              this.loading(false)
              this.$refs.loginDialog.close()
              this.$nextTick(()=>{
                this.go('/page/desktop')
              })
            },1000)
          }else{
            this.getCaptcha()
          }
          setTimeout(()=>{
            this.loading(false)
          },1000)
        }, error => {
          this.loading(false)
        })
      }
    }
  },
  watch:{
    
  },
  mounted(){
    particlesJS.load('particles-js', './static/lib/particles/particles.json', function() {})
    setTimeout(()=>{
      require('../../lazyLibs')
    }, Config.preload)
    this.getCaptcha()
    this.doLogout()
    this.lock(false)
    this.loading(false)
    const rememberUser = utils.cache.get('rememberUser')
    if(rememberUser){
      this.user.username = rememberUser.username
      this.user.password = rememberUser.password
      this.user.remember = true
    }

    window.addEventListener('message', event => {
      if(['qrcodeScan','qrcodeLogin'].indexOf(event.data.type) != -1){
        this[event.data.type](event.data)
      }
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
.border-animation{
  padding:1px;
  background: linear-gradient(0deg, transparent 6px, #ccc 6px) repeat-y, linear-gradient(0deg, transparent 50%, #ccc 0) repeat-y, linear-gradient(90deg, transparent 50%, #ccc 0) repeat-x, linear-gradient(90deg, transparent 50%, #ccc 0) repeat-x;
  background-size: 1px 12px, 1px 12px, 12px 1px, 12px 1px;
  background-position: 0 0, 100% 0, 0 0, 0 100%;
  animation: border-move 1s infinite linear;
}
@keyframes border-move {
  from {}
  to {
    background-position: 0 -12px, 100% 12px, 12px 0, -12px 100%;
  }
}
</style>