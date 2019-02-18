<template>
  <Tabs tabPosition="left" class="tabs-chat" style="width:100%;">
    <TabPanel :title="'张三'" :closable="true" :bodyStyle="{flexDirection:'column'}">
      <template slot="header">
        <div>
          <img class="head" src="../../../static/img/head.jpg">
          <span>张三</span>
        </div>
      </template>

      <Layout style="position:absolute;width:100%;height:100%;">
        <LayoutPanel region="center" :bodyStyle="{position:'relative'}" style="height:100%;" :border="false">
          <div class="chat-container pd-md">
            <div :id="item.recordId" v-for="(item,index) in records[target.userId]" class="chat-box" :class="{'chat-receive':user.userId==item.receiveId,'chat-send':user.userId==item.sendId}">
              <img class="chat-head" :src="heads[item.sendId]">
              <div class="chat-msg" v-html="item.content"></div>
            </div>
          </div>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:180px;" :border="false">
          <UEditor :target="target" :sendMessage="sendMessage"></UEditor>
        </LayoutPanel>
    </Layout>
    </TabPanel>
  </Tabs>
</template>

<script>
import UEditor from '../../components/UEditor'

export default {
  name: 'chatDialog',
  props:['open','target'],
  components:{
    UEditor
  },
  data() {
    return {
      user:utils.cache.get('user')||{userId:'admin',realname:'admin'},
      msg: '',
      heads:{
        admin:require('../../../static/img/head.jpg'),
        chenjia:require('../../../static/img/head.jpg'),
        xiaoting:require('../../../static/img/head_bg.jpg')
      },
      targets:{},
      records:{}
    }
  },
  methods: {
    sendMessage(message){
      console.log(message)
      let frame = document.getElementById('chatFrame')
      frame.contentWindow.postMessage(message, '*')
      this.records[message.receiveId].push(message)
      this.records  = Object.assign({}, this.records)
      console.log(this.records)
      this.msg = ''
      setTimeout(function(){
        document.querySelector('.chat-container').scrollTop = 99999
        console.log(document.querySelector('.chat-container'))
      })
    },
    receiveMessage(message){
      console.log(message)
      if(!this.records[message.sendId]){
        this.records[message.sendId] = []
      }
      this.records[message.sendId].push(message)
      this.records  = Object.assign({}, this.records)
      setTimeout(function(){
        document.querySelector('.chat-container').scrollTop = 99999
        console.log(document.querySelector('.chat-container'))
      })
    }
  },
  watch:{
    
  },
  mounted(){
    this.records[this.target.userId] = []
    window.addEventListener('message', event => {
      this.receiveMessage(event.data)
    })
  }
}
</script>

<style type="text/css" scoped>
.head{
  width:32px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
<style type="text/css">
.tabs-chat .tabs-inner{
  padding:8px!important;
  height:52px!important;
  line-height:32px!important;
}
.chat-container{
  position:absolute;
  width:100%;
  height:100%;
  overflow-y:auto;
}
.chat-box{
  display:flex;
  margin-bottom:20px;
}
.chat-send{
  flex-direction: row-reverse;
}
.chat-head{
  width:36px;
  height:36px;
  border:1px solid #ccc;
  border-radius: 50%;
}
.chat-msg{
  position:relative;
  background:#eee;
  border:1px solid #ccc;
  border-radius: 4px;
  margin:0 0 0 20px;
  padding:10px;
  max-width: 60%;
  word-wrap:break-word;
}
.chat-msg p{
  margin:0;
}
.chat-send .chat-msg{
  border:1px solid #26a2ff;
  background:#e3f2fd;
  margin:0 20px 0 0;
}
.chat-send .chat-msg::before{
  width:10px;
  height:10px;
  z-index:1;
  display: inline-block;
  border-left: 1px solid #26a2ff;
  border-bottom: 1px solid #26a2ff;
  background:#e3f2fd;
  content: ' ';
  position: absolute;
  top: 10px;
  right: -6px;
  transform:rotate(-135deg);
}
.chat-receive .chat-msg::before{
  width:10px;
  height:10px;
  z-index:1;
  display: inline-block;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background:#eee;
  content: ' ';
  position: absolute;
  top: 10px;
  left: -6px;
  transform:rotate(45deg);
}
</style>