<template>
  <div>
    <link rel="stylesheet" :href="'./static/css/themes/'+$store.state.common.ui.theme+'/easyui.css'">
    <link rel="stylesheet" href="./static/css/vue.css">
    <link rel="stylesheet" href="./static/css/icon.css">
    <router-view></router-view>
    <div v-show="$store.state.common.ui.loading" style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:999999;" class="loading">
      <div :style="{width:$store.state.common.ui.loadend?'100%':0}" class="mask mask-top" style="position:absolute;top:0px;left:0px;width:0;height:42%;background:#FBEC88;"></div>
      <div :style="{width:$store.state.common.ui.loadend?'100%':0}" class="mask mask-bottom" style="position:absolute;top:58%;right:0px;width:0;height:42%;background:#FBEC88;"></div>
      <div :style="{height:$store.state.common.ui.loadend?'100%':0}" class="mask mask-left" style="position:absolute;bottom:0px;left:0px;width:42%;height:0;background:#FBEC88;"></div>
      <div :style="{height:$store.state.common.ui.loadend?'100%':0}" class="mask mask-right" style="position:absolute;top:0px;left:58%;width:42%;height:0;background:black;background:#FBEC88;"></div>
      
      <table v-show="$store.state.common.ui.loading" :style="{opacity:$store.state.common.ui.loadend?1:0}" style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:999999" class="loading-content">
        <tr>
          <td>
            <div style="width:16%;height:16.2%;top:42%;left:42%;position:absolute;text-align:center;border:2px solid #95B8E7;background:white;display:table;">
              <div style="display:table-cell;vertical-align: middle;">
                <img src="../../static/img/loading.gif">
                <br>
                <span class="loading-msg" style="font-size:14px;">页面加载中...</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div id="particles-js" v-show="$store.state.common.ui.lock" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" :style="{background:'url(./static/img/desktop/'+$store.state.common.ui.bg+')'}">
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
                <img :src="base64Img" @click="getCaptcha()" style="width:85px;height:30px;border:1px solid #eee;vertical-align: middle;"/>
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
            <div class="flexable" style="height:280px;justify-content: space-around;align-items: center;">
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

    <Update v-if="updating" :downloadPercent="downloadPercent" :show="updating"></Update>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQr from 'vue-qr'
import Update from './Update'
import { mapGetters, mapMutations } from 'vuex'
import store from '../vuex/store'
import 'particles.js/particles'
let timer = null
export default {
  name: 'app',
  data(){
    return {
      server: Config.server,
      transitionName: 'animate-in',
      user:{
        username:'chenjia',
        password:'chenjia'
      },
      title:'系统登录',
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
  components:{
    VueQr,
    Update
  },
  computed:{

  },
  methods:{
    ...mapMutations({
      doLogin:'LOGIN',
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
      this.loading(true)

      utils.http.post('/manage/user/login', this.user).then(response => {
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
    '$store.state.common.ui.lock'(val){
      if(val){
        this.$refs.loginDialog.open()
        particlesJS.load('particles-js', './static/lib/particles/particles.json', function() {})
        this.getCaptcha()
      }else{
        this.$refs.loginDialog.close()
      }
    },
    '$store.state.common.ui.error'(val){
      if(store.state.common.ui.error.visible){
        this.$messager.alert({
          title: "Error",
          icon: "error",
          msg: store.state.common.ui.error.text
        });
      }
    }
  },
  mounted(){
    particlesJS.load('particles-js', './static/lib/particles/particles.json', function() {})
    setTimeout(()=>{
      require('../lazyLibs')
    }, Config.preload)
    this.getCaptcha()
    if(store.state.common.user){
      this.lock(false)
      this.loading(false)
    }

    window.addEventListener('message', event => {
      if(['qrcodeScan','qrcodeLogin'].indexOf(event.data.type) != -1){
        this[event.data.type](event.data)
      }
    })

    if (window.require) {
      let ipc = window.require('electron').ipcRenderer;
      ipc.send("checkForUpdate");
      ipc.on("message", (event, text) => {
        if(text == '检测到新版本，正在下载'){
          this.updating = true
        }
        console.log('message1',event,text)
      });
      ipc.on("downloadProgress", (event, progressObj)=> {
        this.downloadPercent = parseInt(progressObj.percent || 0);
        console.log('message2',this.downloadPercent)
        if(this.downloadPercent > 100){
          this.downloadPercent = 100
          this.updating = false
        }
      });
      ipc.on("isUpdateNow", () => {
        ipc.send("isUpdateNow");
      });
    }
  }
}
</script>

<style type="text/css">
.slide-y-enter {
  opacity: 0;
  transform: translate(0, 50px);
}
.slide-y-enter-to{
  transition:all .4s ease-out;
}
.slide-y-leave {
  opacity: 1;
  transform: translate(0, 0);
}
.slide-y-leave-to{
  transition:all .4s ease-out;
  opacity: 0;
  transform: translate(0, 50px);
}
</style>