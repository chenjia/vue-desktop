<template>
  <div>
    <div :id="'editor'+target.userId"></div>
    <RemoteScript src="static/lib/ueditor/ueditor.config.js" @callback="callbackIndex=callbackIndex+1"></RemoteScript>
    <RemoteScript v-if="callbackIndex>0" src="static/lib/ueditor/ueditor.all.min.js" @callback="callbackIndex=callbackIndex+1"></RemoteScript>
    <RemoteScript v-if="callbackIndex>1" src="static/lib/ueditor/lang/zh-cn/zh-cn.js" @callback="initEditor()"></RemoteScript>
    <LinkButton @click="send" iconCls="icon-send" style="position:absolute;z-index:99999;right:10px;bottom:10px;width:70px;"> 发 送 </LinkButton>
  </div>
</template>

<script>
import RemoteScript from './RemoteScript'

export default {
  name: 'UEditor',
  props:['target','sendMessage'],
  components:{
    RemoteScript
  },
  data(){
    return {
      user:utils.cache.get('user')||{userId:'admin',realname:'admin'},
      callbackIndex:0,
      editor: null
    }
  },
  methods:{
    initEditor(){
      this.editor = new UE.ui.Editor({
        initialFrameWidth:'100%',
        initialFrameHeight:152,
        emotionLocalization:true,
        elementPathEnabled:false,
        enableContextMenu:false,
        autoHeightEnabled:false,
        wordCount:false,
        toolbars:[[
        'fontfamily','fontsize','|',
        'forecolor','backcolor','|',
        'snapscreen','emotion','simpleupload','scrawl','attachment','|',
        'fullscreen'
        ]]
      });
      this.editor.render('editor'+this.target.userId);
    },
    send(){
      var content = this.editor.getContent();
      var message = {
        msgType:0,
        sendId:this.user.userId,
        sendUser:this.user.realname,
        receiveId:this.target.userId,
        receiveUser:this.target.realname,
        content:content
      }
      this.sendMessage(message)
      this.editor.setContent('');
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
