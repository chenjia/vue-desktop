<template>
  <Tabs :plain="false" :narrow="false" :justified="true" style="width:100%;">
    <TabPanel :title="'消息'">
      <template slot="header">
        <div class="tt-inner" style="line-height:30px;">
          <i class="fa fa-fw fa-commenting"></i>
          <span>消 息</span>
        </div>
      </template>
      <DataList style="width:100%;"
        class="overflow-hidden"
        :border="false"
        :data="records"
        :rowHeight="50"
        @selectionChange="onSelectionChange($event)">
        <template slot-scope="scope">
          <div @click="openDialog(scope.row)" class="record">
            <div class="head" style="background-image: url(./static/img/head.jpg);"></div>
            <div class="content">
              <p class="name">{{scope.row.realname}}</p>
              <div class="msg">{{scope.row.content}}</div>
            </div>
          </div>
        </template>
      </DataList>
    </TabPanel>
    <TabPanel :title="'群组'">
      <template slot="header">
        <div class="tt-inner" style="line-height:30px;">
          <i class="fa fa-fw fa-user"></i>
          <span>群 组</span>
        </div>
      </template>
      <Tree :data="group" @selectionChange="selection=$event"></Tree>
    </TabPanel>
    <TabPanel :title="'动态'">
      <template slot="header">
        <div class="tt-inner" style="line-height:30px;">
          <i class="fa fa-fw fa-star"></i>
          <span>动 态</span>
        </div>
      </template>
      <p>敬请期待</p>
      <iframe style="display:none;" id="chatFrame" :src="server + '/chat/chatFrame.html?userId='+user.userId"></iframe>
    </TabPanel>
  </Tabs>
</template>

<script>
export default {
  name: 'chat',
  props:['open','params'],
  data() {
    return {
      server: Config.server,
      user:utils.cache.get('user') || {userId:'admin',realname:'admin'},
      records:[{
        userId:'admin',
        realname:'admin',
        content:'bug都改完了吗？'
      },{
        userId:'chenjia',
        realname:'chenjia',
        content:'今晚系统上线，大家做好通宵的准备！'
      }],
      selection: null,
      group: [{
        text:'亲人',
        iconCls: "icon-role",
        children:[{
          text:'张三',
          iconCls: "icon-user"
        },{
          text:'李四',
          iconCls: "icon-user"
        }]
      },{
        text:'同学',
        iconCls: "icon-role",
        state: "closed",
        children:[{
          text:'张三',
          iconCls: "icon-user"
        },{
          text:'李四',
          iconCls: "icon-user"
        }]
      },{
        text:'工作群',
        state: "closed",
        iconCls: "icon-organization",
        children:[{
          text:'老板',
          iconCls: "icon-task"
        },{
          text:'老大',
          iconCls: "icon-user"
        },{
          text:'小丽',
          iconCls: "icon-user"
        }]
      }]
    }
  },
  methods: {
    onSelectionChange(){

    },
    openDialog(row){
      this.open({
        name:'chatDialog',
        text:'聊天室对话框',
        width:700,
        height:500,
        icon:'./static/img/icon32/comments.png'
      },row)
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>

<style type="text/css" scoped>
.record{
  display: flex;
  align-items: center;
  padding: 5px 0;
  height: 50px;
  border-bottom: 1px solid #eee;
}
.record .head{
  width: 40px;
  height: 40px;
  background: #b8eecf;
  background-size: 40px 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  margin: 0 10px;
  flex:0 0 40px;
}
.record .content{
  text-overflow: ellipsis;
  flex:1 0 auto;
}
.record .msg{
  width:88%;
  white-space:nowrap;
  overflow-x:hidden;
  opacity: .5;
  text-overflow: ellipsis;
}
.record p{
  margin: 0;
  padding: 2px 0;
}
</style>