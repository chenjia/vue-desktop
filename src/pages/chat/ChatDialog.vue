<template>
  <Tabs ref="chatTab" @tabSelect="tabSelect" tabPosition="left" class="tabs-chat" style="width:100%;">
    <TabPanel v-for="item in targets" :key="item.userId" :params="item" :title="item.realname" :closable="true" :bodyStyle="{flexDirection:'column'}">
      <template slot="header">
        <div>
          <img class="head" src="../../../static/img/head.jpg">
          <span>{{item.realname}}</span>
        </div>
      </template>

      <Layout v-if="target.userId==item.userId" style="position:absolute;width:100%;height:100%;">
        <LayoutPanel region="center" :bodyStyle="{position:'relative'}" style="height:100%;" :border="false">
          <div class="chat-container pd-md">
            <p class="center" @click="queryRecords()"><a href="#">{{more[target.userId]==false?'没有更多聊天记录':'加载更早聊天记录'}}</a></p>
            <div :id="item.recordId" v-for="(item,index) in records[target.userId]" class="chat-box" :class="{'chat-receive':user.userId==item.receiveId && user.userId!=item.sendId,'chat-send':user.userId==item.sendId}">
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
      now: new Date().getTime(),
      user:utils.cache.get('user')||{userId:'admin',realname:'admin'},
      msg: '',
      pageNumber:1,
      heads:{
        admin:require('../../../static/img/head.jpg'),
        chenjia:require('../../../static/img/head.jpg'),
        xiaoting:require('../../../static/img/head_bg.jpg')
      },
      targets:{},
      records:{},
      more:{

      }
    }
  },
  methods: {
    tabSelect(panel){
      this.open({
        name:'chatDialog',
        text:'聊天室对话框',
        width:700,
        height:500,
        icon:'./static/img/icon32/comments.png'
      },panel.$attrs.params)
    },
    queryRecords(callback){
      utils.http.post('/push/record/list', {
        example: {
          sendId:this.user.userId,
          receiveId:this.target.userId,
          beforeDate: this.now
        },
        pageData: {
          pageNumber:this.pageNumber,
          pageSize: 10
        }
      }).then(response => {
        const data = response.data.body.data.data
        if(data.length == 0){
          this.more[this.target.userId] = false
          this.more  = Object.assign({}, this.more)
          return
        }
        setTimeout(() => {
          this.pageNumber++
          let target = this.records[this.target.userId]
          if(target && target.length > 0){
            let recordId = this.records[this.target.userId][0].recordId
            this.records[this.target.userId] = data.reverse().concat(this.records[this.target.userId])
            this.records  = Object.assign({}, this.records)
            setTimeout(function(){
              document.querySelector('.chat-container').scrollTop = document.getElementById(recordId).offsetTop - 50
            })
          }else{
            this.records[this.target.userId] = data.reverse()
            this.records  = Object.assign({}, this.records)
            setTimeout(function(){
              document.querySelector('.chat-container').scrollTop = 99999
            })
          }
        }, 500)
      }).catch(()=>{
        this.records = {}
      })
    },
    sendMessage(message){
      let frame = document.getElementById('chatFrame')
      frame.contentWindow.postMessage(message, '*')
      this.records[message.receiveId].push(message)
      this.records  = Object.assign({}, this.records)
      this.msg = ''
      setTimeout(function(){
        document.querySelector('.chat-container').scrollTop = 99999
      })
    },
    receiveMessage(message){
      if(!this.records[message.sendId]){
        this.records[message.sendId] = []
      }
      if(message.sendId != this.user.userId){
        this.records[message.sendId].push(message)
      }
      this.records  = Object.assign({}, this.records)
      setTimeout(function(){
        document.querySelector('.chat-container').scrollTop = 99999
      })
    }
  },
  watch:{
    target(newVal, oldVal){
      if(!this.targets[newVal.userId]){
        this.queryRecords()
      }
      this.targets[newVal.userId] = newVal
      this.targets  = Object.assign({}, this.targets)
      const tab = this.$refs.chatTab
      setTimeout(()=>{
        for(var i=0;i<Object.getOwnPropertyNames(this.targets).length-1;i++){
          const panel = tab.getPanel(i)
          if(panel && panel.$attrs.params.userId == newVal.userId){
            tab.select(i)
            break;
          }
        }
      },1)
      
      // this.open({
      //   name:'chatDialog',
      //   text:'聊天室对话框',
      //   width:700,
      //   height:500,
      //   icon:'./static/img/icon32/comments.png'
      // },newVal)
    }
  },
  mounted(){
    this.targets[this.target.userId] = this.target
    this.targets  = Object.assign({}, this.targets)
    this.queryRecords()
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