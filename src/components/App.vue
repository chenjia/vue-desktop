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

    <Update v-if="updating" :downloadPercent="downloadPercent" :version="version" :updateMessage="updateMessage"></Update>
  </div>
</template>

<script>
import Vue from 'vue'
import Update from './Update'
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
      updating: false,
      version:'',
      updateMessage: []
    }
  },
  components:{
    Update
  },
  computed:{

  },
  methods:{
    
  },
  watch:{
    '$store.state.common.ui.error'(val){
      if(store.state.common.ui.error.visible){
        this.$messager.alert({
          title: "Error",
          icon: "error",
          msg: store.state.common.ui.error.text
        })
      }
    }
  },
  mounted(){
    const _this = this
    if (window.require) {
      let ipc = window.require('electron').ipcRenderer
      ipc.send("checkForUpdate")
      ipc.on("message", (event, text) => {
        const message = JSON.parse(text)
        if(message.status == 'updateAva'){
          this.$messager.confirm({
            title: '版本更新( '+message.currentVersion.version+' -> '+message.info.version+' )',
            msg: '发现新版本，确认要更新到新版本吗?',
            result(r){
              if(r) {
                _this.updating = true
                _this.version = message.info.version
                if(message.info.updateMessage){
                  _this.updateMessage = message.info.updateMessage
                }
                ipc.send("downloadUpdate")
              }
            }
          })
        }
        console.log(event,text)
      })
      ipc.on("downloadProgress", (event, progressObj)=> {
        this.downloadPercent = parseInt(progressObj.percent || 0);
        console.log(this.downloadPercent)
        if(this.downloadPercent > 100){
          this.downloadPercent = 100
          this.updating = false
        }
      })
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