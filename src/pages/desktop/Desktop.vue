<template>
  <div style="position:absolute;width:100%;height:100%;">
    <Layout :style="{background:'url(./static/img/desktop/'+$store.state.common.ui.bg+')'}">
      <LayoutPanel region="center" @click.native="startDialog.closed=true; taskbar.showCalendar=false" @contextmenu.prevent.native="$refs.desktopMenu.showContextMenu($event.pageX,$event.pageY)" :border="false" :bodyStyle="{background:'none'}" :style="{width:'100%',height:(screenHeight-42)+'px'}">
        <a v-Draggable="{cursor:'default', dragStart: (d)=>{onDragStart(d, menu)}, drag: onDrag, dragEnd: (d)=>{onDragEnd(d, menu)}}" v-for="(menu, index) in desktopMenus" :key="menu.name" @click="clickMenu(menu)" class="desktop-menu" :style="{opacity:dragMenu==menu.name?.5:1,left:menu.left+'px', top:menu.top+'px', transition:toggle.sorting?'all .5s':''}">
          <img :src="menu.icon" />
          <span>{{menu.text}}</span>
        </a>

        <a v-Droppable="{drop:()=>{dropMenu()}}" v-show="toggle.showRecycle" class="desktop-menu" style="right:10px;bottom:10px;">
          <img src="../../../static/img/icon32/bin_recycle.png" />
          <span>回收站</span>
        </a>

        <DraggableProxy ref="proxy">
          <a class="desktop-menu">
            <img :src="dragStartMenu.icon" />
            <span>{{dragStartMenu.text}}</span>
          </a>
        </DraggableProxy>

        <Menu ref="desktopMenu" style="width:150px;" @itemClick="onContextMenu">
          <MenuItem v-for="(item, index) in contextMenus" :key="index" :value="item.value" :text="item.text" :iconCls="item.iconCls">
            <SubMenu v-if="item.children">
              <MenuItem v-for="(sub, subIndex) in item.children" :key="subIndex" :value="sub.value" :text="sub.text" :iconCls="sub.iconCls"></MenuItem>
            </SubMenu>
          </MenuItem>
        </Menu>

        <Dialog v-for="(task,index) in taskbar.tasks"
          :key="task.name+'Dialog'"
          :ref="task.name"
          :title="task.text"
          :dialogStyle="{width:(task.width||screenWidth)+'px',height:(task.height||(screenHeight-43))+'px',left:task.name=='chat'?(screenWidth-290)+'px':'auto'}"
          :bodyStyle="{display:'flex',position:'relative'}"
          :modal="false"
          :draggable="true"
          :resizable="true"
          :minimizable="true"
          :maximizable="true"
          :draggableOptions="{dragStart:(d)=>{moveToTop(task)}, drag: (d)=>{windowDrag(d)}}"
          @close="closeTask(task)">
          <dynamic :component="task.name" :open="open" :close="close" :menu="task"/>
        </Dialog>

        <Dialog ref="startDialog" :title="'当前用户：'+user.username" :closable="false" :closed="startDialog.closed" :open="startDialogOpen()" panelCls="startDialog">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <div style="width:158px;padding:10px;height:340px;">
                  <div style="height:320px;text-align:left;">
                    <SplitButton v-for="(menu, menuIndex) in startDialog.startMenus" :key="menuIndex" :text="menu.group" :plain="true" :iconCls="menu.iconCls">
                      <Menu>
                        <MenuItem v-Draggable="{cursor:'default', proxy: $refs.proxy, dragStart: (d)=>{onMenuDragStart(d, item)}, drag: onMenuDrag, dragEnd: (d)=>{onMenuDragEnd(d, item)}}" v-for="(item, itemIndex) in menu.items" :key="itemIndex" :text="item.text" :iconCls="item.iconCls"></MenuItem>
                      </Menu>
                    </SplitButton>
                  </div>
                </div>
              </td>
              <td>
                <div class="panel-header" style="height:350px;border-top:0px;border-right:0px;border-bottom:0px;">
                  <div class="center" style="cursor:pointer;margin:15px auto 5px;">
                    <img src="../../../static/img/head.jpg" style="width:60px;border-radius: 50%;">
                  </div>
                  <div class="center">{{user.realname}}</div>
                  <div style="width:100px;height:80px;">

                  </div>
                  <div style="position:absolute;bottom:3px;width:100px;">
                    <template v-for="(item, index) in startDialog.handlers">
                      <LinkButton @click="handler(item.url,item.params)" :plain="true" :iconCls="item.iconCls">{{item.name}}</LinkButton>
                      <div v-if="index != startDialog.handlers.length-1" class="menu-seq"></div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </Dialog>
      </LayoutPanel>
      
      <LayoutPanel region="south">
        <div ref="taskbar" data-options="region:'south'">
          <div class="panel-header" style="height:40px;padding:0;border:0;overflow:hidden;">
            <table cellspacing="0" cellpadding="0" style="width:100%;height:40px;">
              <tr>
                <td class="start-box">
                  <LinkButton ref="start" :plain="true" class="start" :class="{'start-hover': !startDialog.closed}" @click="startDialog.closed=!startDialog.closed">
                    <img style="vertical-align: middle;" src="../../../static/img/windows.png">
                  </LinkButton>
                </td>
                <td width="15px">
                </td>
                <td>
                  <div v-for="(task,index) in taskbar.tasks" :key="task.name+'Bar'" @click="open(task)" class="task-icon">
                    <img :src="task.icon" :style="{opacity:taskbar.currentTask.name==task.name?1:.5}"/>
                  </div>
                </td>
                <td class="time-box" @click="taskbar.showCalendar = !taskbar.showCalendar">
                  <span class="time-box-hour">{{taskbar.time}}</span><span class="time-box-week">{{taskbar.week}}</span><br/>
                  <span class="time-box-date">{{taskbar.date}}</span>
                </td>
                <td @click="showDesktop()" class="desktop-show" style="border:0">
                  <span class="seq"></span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </LayoutPanel>
    </Layout>
    <Calendar v-show="taskbar.showCalendar" style="position:absolute;right:0;bottom:41px;width:250px;height:250px"></Calendar>
  </div>
  
</template>

<script>
import Vue from 'vue'
import Dynamic from '../../components/Dynamic'
import './desktop.css'
import { mapGetters, mapMutations } from 'vuex'
import store from '../../vuex/store'

let range = 80;
function repair(v){
  let r = parseInt(v/range,10)*range;
  if (Math.abs(v % range) > range/2){
    r += (v > 0 ? range : -1*range)
  }
  return r;
}
function repairPosition(d){
  let s = d.target.proxy?d.target.proxy.$el:d.target.$el
  let p = d.target.proxy?d.target.proxy.$el.parentNode:d.target.$el.parentNode
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
      dragMenu:null,
      dragStartMenu:{},
      dragStatus:0,
      toggle:{
        sorting:false,
        showRecycle:false
      }
    }
  },
  computed:{
    ...mapGetters([
      'user',
      'taskbar',
      'startDialog',
      'desktopMenus',
      'contextMenus'
    ])
  },
  methods: {
    ...mapMutations({
      lock:'LOCK',
      loading:'TOGGLE_LOADING'
    }),
    dropMenu(){
      for(let i=0;i<this.desktopMenus.length;i++){
        let menu = this.desktopMenus[i]
        if(this.dragMenu == menu.name){
          this.desktopMenus.splice(i,1)
          break;
        }
      }
    },
    moveToTop(task){
      this.$refs[task.name][0].moveToTop()
      this.taskbar.currentTask = task
    },
    showDesktop(){
      for(let key in this.taskbar.tasks){
        this.$refs[this.taskbar.tasks[key].name][0].close()
      }
    },
    windowDrag(d){
      let s = d.target.$el
      let p = d.target.$el.parentNode
      
      if (d.left + s.offsetWidth < 50){
        d.left = 50 - s.offsetWidth;
      }else if (p.offsetWidth - d.left  <50){
        d.left = p.offsetWidth - 50;
      }

      let parentHeight = p.offsetHeight==0?this.screenHeight:p.offsetHeight
      if (d.top < 0){
        d.top = 0;
      }else if (d.top > parentHeight-45){
        d.top = parentHeight - 45;
      }
      d.target.applyDrag()
    },
    clickMenu(menu){
      if(this.dragStatus == 0){
        this.open(menu, {})
      }
    },
    onMenuDragStart(d, menu){
      d.left = d.startX
      d.top = d.startY
      d = repairPosition(d)
      this.dragStartMenu = menu
      this.startDialog.closed = true
    },
    onMenuDrag(d){
      d = repairPosition(d)
      d.target.applyDrag()
    },
    onMenuDragEnd(d, menu){
      this.dragStatus = 1
      setTimeout(()=>{
        this.dragStatus = 0
      },10)
      d.left = repair(d.left)
      d.top = repair(d.top)
      d = repairPosition(d)
      d.target.$el.style.transition = 'all .1s'
      let item = null
      for(let i=0;i<this.desktopMenus.length;i++){
        item = this.desktopMenus[i]
        if(item.left == d.left && item.top == d.top){
          d.left = menu.left
          d.top = menu.top
        }
      }
      menu.left = d.left
      menu.top = d.top
      d.target.applyDrag()
      setTimeout(()=>{
        d.target.$el.style.transition = ''
      },110)
      this.dragStartMenu = {}
      for(let temp of this.desktopMenus){
        if(menu.name == temp.name){
          this.$messager.alert({
            title: '重复操作',
            msg: '菜单【'+ menu.text +'】已经添加过了！'
          })
          return
        }
      }
      this.desktopMenus.push(menu)
    },
    onDragStart(d, menu){
      d = repairPosition(d)
      this.dragMenu = menu.name
      this.toggle.showRecycle = true
    },
    onDrag(d){
      d = repairPosition(d)
      d.target.applyDrag()
    },
    onDragEnd(d, menu){
      this.dragStatus = 1
      setTimeout(()=>{
        this.dragStatus = 0
      },10)
      d.left = repair(d.left)
      d.top = repair(d.top)
      d = repairPosition(d)
      d.target.$el.style.transition = 'all .1s'
      let item = null
      for(let i=0;i<this.desktopMenus.length;i++){
        item = this.desktopMenus[i]
        if(item.left == d.left && item.top == d.top){
          d.left = menu.left
          d.top = menu.top
        }
      }
      menu.left = d.left
      menu.top = d.top
      d.target.applyDrag()
      
      this.dragMenu = null
      this.toggle.showRecycle = false
      setTimeout(()=>{
        d.target.$el.style.transition = ''
      },110)
    },
    open(menu, params){
      if(this.taskbar.tasks[menu.name]){
        this.$refs[menu.name][0].moveToTop()
        if(menu.name=='chatDialog'){
          menu.params = params
          this.$set(this.taskbar.tasks, menu.name, menu)
        }
      }else{
        menu.params = params
        this.$set(this.taskbar.tasks, menu.name, menu)
      }
      this.taskbar.currentTask = menu
    },
    close(menu){
      this.closeTask(menu)
      this.$refs[menu.name][0].close()
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
    onContextMenu(value){
      if(value.indexOf('theme-') != -1){
        store.commit('THEME', value.substr(6))
      }else if(value.indexOf('bg-') != -1){
        store.commit('BG', value.substr(3))
      }else if(value.indexOf('sort-') != -1){
        const sortArray = value.substr(5).split('-')
        this.sortDesktopMenu(sortArray[0], sortArray[1])
      }else if(value.indexOf('fullscreen') != -1){
        this.fullscreen()
      }else if(value.indexOf('lock-') != -1){
        this.loading(true)
        setTimeout(()=>{
          this.lock(true)
          this.loading(false)
        },1000)
      }
    },
    sortDesktopMenu(field, orderType){
      this.toggle.sorting = true
      let menus = [].concat(this.desktopMenus)
      menus.sort((prev, next) => {
        if(field == 'time'){
          if(orderType == 'asc'){
            return prev.insertTime>next.insertTime?1:-1
          }else{
            return prev.insertTime<next.insertTime?1:-1
          }
        }else if(field == 'name'){
          if(orderType == 'asc'){
            return prev.text.localeCompare(next.text)
          }else{
            return next.text.localeCompare(prev.text)
          }
        }
      })
      
      let desktopHeight = this.screenHeight-42
      let rows = parseInt(desktopHeight / range, 10)

      setTimeout(()=>{
        for(let i=0;i<this.desktopMenus.length;i++){
          for(let j=0;j<menus.length;j++){
            if(this.desktopMenus[i].name == menus[j].name){
              let menu = this.desktopMenus[i]
              menu.left = parseInt(j/rows,10)*range
              menu.top = parseInt(j%rows,10)*range
              break;
            }
          }
        }
      },100)
      
      
      setTimeout(()=>{
        this.toggle.sorting = false
      },600)
    },
    fullscreen(){
      var isFull = false;
      if(document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen||document.fullscreen){
        isFull = true;
      }else if(screen.width-document.body.scrollWidth<=1 && screen.height-document.body.scrollHeight<=1){
        isFull = true;
      }
      
      if(isFull){
        var c = document.exitFullscreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;
        if (typeof c != "undefined" && c) {
          c.call(document);
        } else if (typeof window.ActiveXObject != "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        }
      }else{
        var el = document.documentElement;
        var f = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (typeof f != "undefined" && f) {
          f.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
          try{
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
              wscript.SendKeys("{F11}");
            }
          }catch(e){
            alert('安全设置','此功能需要开启【对未标记为可安全执行脚本的AciveX控件初始化并执行脚本】！');
          }
        }
      }

      setTimeout(()=>{
        this.screenWidth = document.documentElement.clientWidth
        this.screenHeight = document.documentElement.clientHeight
      },100)
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
    logout(){
      this.startDialog.closed = true
      setTimeout(()=>{
        this.loading(true)
        store.commit('LOGOUT')
        setTimeout(()=>{
          this.loading(false)
          this.lock(true)
        },1000)
      },1)
    },
    home(url){
      this.startDialog.closed = true
      this.go(url)
    },
    handler(code, params){
      this[code](params)
    }
  },
  watch:{
    
  },
  mounted(){
    this.initTime(new Date().getTime())
    setInterval(()=>{
      this.initTime(new Date().getTime())
    }, 60*1000)

    // this.clickMenu({
    //   name:'pageEditor',
    //   text:'页面设计',
    //   icon:'./static/img/icon32/pageEditor_32.png',
    //   top:80*0,
    //   left:80*7,
    //   insertTime:'2019-02-14 00:00:00'
    // })
  }
}
</script>
<style src="./desktop.css" scoped></style>
<style type="text/css">
.startDialog{
  top:auto!important;
  left:0!important;
  bottom:42px!important;
}
</style>