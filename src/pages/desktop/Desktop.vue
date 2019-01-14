<template>
  <div style="position:absolute;width:100%;height:100%;">
    <Layout style="background:url(../../../static/img/desktop/1.jpg)">
      <LayoutPanel region="center" @contextmenu.prevent.native="$refs.desktopMenu.showContextMenu($event.pageX,$event.pageY)" :border="false" :bodyStyle="{background:'none'}" :style="{height:(screenHeight-42)+'px'}">
        <a v-Draggable v-for="(menu, index) in desktopMenus" class="desktop-menu">
          <img :src="menu.icon" />
          <span>{{menu.text}}</span>
        </a>

        <div ref="calendar" class="easyui-calendar" style="display:none;position:absolute;right:0;bottom:0;"></div>
        <img ref="recycle" style="display:none;opacity:0.6;position:absolute;right:0;bottom:0;" src="../../../static/img/icon64/recycle_64.png"/>

        <Menu ref="desktopMenu" style="width:150px;" @itemClick="">
          <MenuItem v-for="(item, index) in contextMenus" :key="index" :value="item.value" :text="item.text">
            <SubMenu v-if="item.children">
              <MenuItem v-for="(sub, subIndex) in item.children" :value="sub.value" :text="sub.text"></MenuItem>
            </SubMenu>
          </MenuItem>
        </Menu>

        <Dialog ref="startDialog" :title="'管理员'" :closable="false" :closed="startDialog.closed" :open="startDialogOpen()" panelCls="start-dialog">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <div style="width:158px;padding:10px;height:340px;">
                  <div style="height:320px;text-align:left;">
                    <SplitButton v-for="(menu, menuIndex) in startDialog.menus" :key="menuIndex" :text="menu.group" :plain="true" iconCls="fa fa-book">
                      <Menu>
                        <MenuItem v-for="(item, itemIndex) in menu.items" :key="itemIndex" :text="item.name"></MenuItem>
                      </Menu>
                    </SplitButton>
                  </div>
                </div>
              </td>
              <td>
                <div class="panel-header" style="height:350px;border-top:0px;border-right:0px;border-bottom:0px;">
                  <div class="center" style="cursor:pointer;margin:15px auto 5px;">
                    <i class="fa fa-user" style="font-size:48px;"></i>
                  </div>
                  <div class="screen-name"></div>
                  <div class="menu-seq"></div>
                  <div style="width:100px;height:80px;">

                  </div>
                  <div style="position:absolute;bottom:3px;width:100px;">
                    <template v-for="(item, index) in startDialog.funcs">
                      <LinkButton :plain="true" :iconCls="'fa '+item.icon">{{item.name}}</LinkButton>
                      <div v-if="index != startDialog.funcs.length-1" class="menu-seq"></div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </Dialog>
      </LayoutPanel>
      <LayoutPanel region="south" style="height:42px;">
        <div ref="taskbar" data-options="region:'south'" style="height:42px;">
          <div class="panel-header" style="height:40px;padding:0;border:0;overflow:hidden;">
            <table cellspacing="0" cellpadding="0" style="width:100%;height:40px;">
              <tr>
                <td class="start-box">
                  <div ref="start" class="start" :class="{'start-hover': !startDialog.closed}" @click="startDialog.closed=!startDialog.closed"></div>
                </td>
                <td width="20px">
                </td>
                <td>
                  <button class="task-icon" :class="{}">
                    <img src="../../../static/img/icon32/browser_32.png"/>
                  </button>
                </td>
                <td class="time-box">
                  <span class="time-box-hour">18:00</span><span class="time-box-week">周一</span><br/>
                  <span class="time-box-date">2019-01-14</span>
                </td>
                <td class="desktop-show" style="border:0">
                  <span class="seq"></span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </LayoutPanel>
    </Layout>
  </div>
  
</template>

<script>
import Vue from 'vue'
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'desktop',
  components: {
    
  },
  data() {
    return {
      desktopMenus:[{
        text:'我的任务',
        icon:'../../../static/img/icon32/task_32.png',
        url:'',
        top:'',
        left:''
      }],
      contextMenus:[{
        text:'主题风格',
        children:[{
          value:'sunny',
          text:'sunny'
        },{
          value:'pepper-grinder',
          text:'pepper-grinder'
        },{
          value:'dark-hive',
          text:'dark-hive'
        },{
          value:'cupertino',
          text:'cupertino'
        },{
          value:'metro-red',
          text:'metro-red'
        },{
          value:'metro-orange',
          text:'metro-orange'
        },{
          value:'metro-green',
          text:'metro-green'
        },{
          value:'metro-gray',
          text:'metro-gray'
        },{
          value:'metro-blue',
          text:'metro-blue'
        }]
      },{
        text:'自动排序',
        children:[{
          value:'按名称升序',
          text:'按名称升序'
        },{
          value:'按名称降序',
          text:'按名称降序'
        },{
          value:'按时间升序',
          text:'按时间升序'
        },{
          value:'按时间降序',
          text:'按时间降序'
        }]
      },{
        value:'显示桌面',
        text:'显示桌面'
      },{
        value:'锁定屏幕',
        text:'锁定屏幕'
      },{
        value:'个人设置',
        text:'个人设置'
      },{
        value:'办公模式',
        text:'办公模式'
      },{
        value:'全屏显示',
        text:'全屏显示'
      }],
      startDialog:{
        closed:true,
        menus:[{
          group:'我的工作区',
          items:[{
            name:'我的门户',
            icon:'',
            url:''
          },{
            name:'我的任务',
            icon:'',
            url:''
          },{
            name:'已办任务',
            icon:'',
            url:''
          },{
            name:'消息提醒',
            icon:'',
            url:''
          },{
            name:'个人设置',
            icon:'',
            url:''
          },{
            name:'日程计划',
            icon:'',
            url:''
          },{
            name:'意见箱',
            icon:'',
            url:''
          },{
            name:'系统公告',
            icon:'',
            url:''
          }]
        },{
          group:'系统设置',
          items:[{
            name:'流程列表',
            icon:'',
            url:''
          },{
            name:'表单列表',
            icon:'',
            url:''
          },{
            name:'校验规则列表',
            icon:'',
            url:''
          },{
            name:'用户列表',
            icon:'',
            url:''
          },{
            name:'角色列表',
            icon:'',
            url:''
          },{
            name:'菜单列表',
            icon:'',
            url:''
          },]
        },{
          group:'其他',
          items:[{
            name:'使用帮助',
            icon:'',
            url:''
          }]
        }],
        funcs:[{
          name:'全屏',
          icon:'fa-user',
          url:''
        },{
          name:'办公模式',
          icon:'fa-user',
          url:''
        },{
          name:'个人设置',
          icon:'fa-user',
          url:''
        },{
          name:'注销',
          icon:'fa-user',
          url:''
        }]
      }
    }
  },
  computed:{
    
  },
  methods: {
    startDialogOpen(a){
      setTimeout(()=>{
        this.$refs.startDialog.$el.style.left = 0
      })
      
      //$(this).parent().css({top:'',bottom:0});
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css" scoped>
.menu-seq {
    font-size: 1px;
    margin: 3px 0;
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #FFFFFF;
}
.start{
  background:url('../../../static/img/win_gray.png') -4px 0 no-repeat;
  display:inline-block;
  width:40px;
  height:40px;
  position:relative;
  top:-1px;
  cursor: pointer;
}
.start-hover{
  background:url('../../../static/img/win_blue.png') -4px 0 no-repeat;
}
.start-box{
  width:50px;
  text-align:center;
}
.task-icon{
  display:inline-block;
  padding:4px 3px;
  background:none;
  border:none;
}
.task-icon:active,.task-icon:focus,.task-icon:visited{
  border:none!important;
  box-shadow: none!important;
}
.time-box{
  width:80px;
  font-size:12px;
  font-family:'微软雅黑';
  text-align:center;
  cursor:default;
}
.time-box-week{
  margin-left:10px;
}
.desktop-show{
  width:10px;
}
.seq{
  border-left: 1px solid #AAAAAA;
    border-right: 1px solid #FFFFFF;
    float:left;
    height:44px;
}
.desktop-menu{
  width:60px;
  height:60px;
  display:inline-block;
  text-align:center;
}
.desktop-menu img{
  margin-top:6px;
  display:inline-block;
}
.desktop-menu span{
  color:white;
  font-size:12px;
  font-weight:bold;
  font-family:'微软雅黑';
  text-align:center;
  display:inline-block;
}
.desktop-menu-shadow{
  z-index:10;
}
</style>
<style type="text/css">
.start-dialog{
  top:''!important;
  left:0!important;
  bottom:42px!important;
}
</style>