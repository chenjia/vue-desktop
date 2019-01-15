<template>
  <div style="position:absolute;width:100%;height:100%;">
    <Layout style="background:url(../../../static/img/desktop/1.jpg)">
      <LayoutPanel region="center" @contextmenu.prevent.native="$refs.desktopMenu.showContextMenu($event.pageX,$event.pageY)" :border="false" :bodyStyle="{background:'none'}" :style="{height:(screenHeight-42)+'px'}">
        <a v-Draggable="{cursor:'default', dragStart: onDragStart, drag: onDrag, dragEnd: onDragEnd}" v-for="(menu, index) in desktopMenus" @dblclick="open(menu)" class="desktop-menu">
          <img :src="menu.icon" />
          <span>{{menu.text}}</span>
        </a>

        <div ref="calendar" class="easyui-calendar" style="display:none;position:absolute;right:0;bottom:0;"></div>
        <img ref="recycle" style="display:none;opacity:0.6;position:absolute;right:0;bottom:0;" src="../../../static/img/icon64/recycle_64.png"/>
        <Calendar v-show="taskbar.showCalendar" style="position:absolute;right:0;bottom:0;width:250px;height:250px"></Calendar>


        <Menu ref="desktopMenu" style="width:150px;" @itemClick="">
          <MenuItem v-for="(item, index) in contextMenus" :key="index" :value="item.value" :text="item.text" :iconCls="item.iconCls">
            <SubMenu v-if="item.children">
              <MenuItem v-for="(sub, subIndex) in item.children" :key="subIndex" :value="sub.value" :text="sub.text" :iconCls="sub.iconCls"></MenuItem>
            </SubMenu>
          </MenuItem>
        </Menu>

        <Dialog v-for="(task,key,index) in taskbar.tasks"
          :key="key"
          :ref="task.name"
          :title="task.text"
          :dialogStyle="{width:(screenHeight-100)*1.8+'px',height:(screenHeight-100)+'px'}"
          :modal="true"
          :draggable="true"
          :resizable="true"
          @close="closeTask(task)">
          <dynamic :component="task.name" />
        </Dialog>

        <Dialog ref="startDialog" :title="'管理员'" :closable="false" :closed="startDialog.closed" :open="startDialogOpen()" panelCls="start-dialog">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <div style="width:158px;padding:10px;height:340px;">
                  <div style="height:320px;text-align:left;">
                    <SplitButton v-for="(menu, menuIndex) in startDialog.startMenus" :key="menuIndex" :text="menu.group" :plain="true" iconCls="fa fa-book">
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
                  <button v-for="(task,key,index) in taskbar.tasks" :key="key" @click="openTask(task)" class="task-icon">
                    <img :src="task.icon"/>
                  </button>
                </td>
                <td class="time-box" @click="taskbar.showCalendar = !taskbar.showCalendar">
                  <span class="time-box-hour">{{taskbar.time}}</span><span class="time-box-week">{{taskbar.week}}</span><br/>
                  <span class="time-box-date">{{taskbar.date}}</span>
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
import Dynamic from '../../components/Dynamic'
import './desktop.css'
import {desktopMenus, contextMenus, startMenus, funcs} from './json.js'
import {
  mapGetters,
  mapMutations
} from 'vuex'

var range = 80;
function repair(v){
  let r = parseInt(v/range,10)*range;
  if (Math.abs(v % range) > range/2){
    r += (v > 0 ? range : -1*range)
  }
  return r;
}
function repairPosition(d){
  let s = d.target.$el
  let p = d.target.$el.parentNode
  if (d.left < 0){
    d.left = 0;
  }else if (d.left + s.offsetWidth > p.offsetWidth){
    d.left = p.offsetWidth - s.offsetWidth;
  }

  if (d.top < 0){
    d.top = 0;
  }else if (d.top + s.offsetHeight > p.offsetHeight){
    d.top = parseInt(p.offsetHeight/range, 10)*range - s.offsetHeight;
  }
  return d
}

export default {
  name: 'desktop',
  components: {
    dynamic:Dynamic
  },
  data() {
    return {
      desktopMenus:desktopMenus,
      contextMenus:contextMenus,
      startDialog:{
        closed:true,
        startMenus:startMenus,
        funcs:funcs
      },
      taskbar:{
        date:'',
        time:'',
        week:'',
        tasks:{},
        showCalendar:false
      }
    }
  },
  computed:{
    
  },
  methods: {
    onDragStart(d){
      d = repairPosition(d)
    },
    onDrag(d){
      d = repairPosition(d)
      d.target.applyDrag()
    },
    onDragEnd(d){
      d.left = repair(d.left)
      d.top = repair(d.top)
      d = repairPosition(d)
      d.target.$el.style.transition = 'all .1s'
      d.target.applyDrag()
      setTimeout(()=>{
        d.target.$el.style.transition = ''
      },200)
    },
    open(menu){
      this.$set(this.taskbar.tasks, menu.name, menu)
    },
    openTask(task){
      console.log(this.$refs[task.name])
      this.$refs[task.name].open()
    },
    closeTask(task){
      this.$nextTick(()=>{
        this.$delete(this.taskbar.tasks, task.name)
      })
    },
    startDialogOpen(a){
      setTimeout(()=>{
        this.$refs.startDialog.$el.style.left = 0
      })
    },
    initTime(sysTime){
      if(sysTime != undefined){
        var date = new Date(sysTime+1000);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
        var day = date.getDay();
        var array = [y,(m<10?('0'+m):m),(d<10?('0'+d):d),(h<10?('0'+h):h),(mi<10?('0'+mi):mi),(s<10?('0'+s):s),day]
        var week = ['日','一','二','三','四','五','六'];
        this.taskbar.date = array[0] + '-' + array[1] + '-' + array[2];
        this.taskbar.time = array[3] + ':' + array[4]
        this.taskbar.week = '周' + week[array[6]];
      }
    },
    init(){
      this.initTime(new Date().getTime())
    }
  },
  watch:{
    
  },
  mounted(){
    this.init()
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
  margin-left:8px;
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
  padding:10px;
  width:80px;
  height:80px;
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