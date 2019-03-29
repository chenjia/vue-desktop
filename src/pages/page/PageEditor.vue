<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <DraggableProxy ref="componentProxy">
      <div class="dynamic-node" style="position:absolute;z-index: 999999;">
        <div><img class="component-img" :src="'static/img/icon32/'+dragComponent.img"/></div>
        <div>{{dragComponent.label}}</div>
      </div>
    </DraggableProxy>
    <Layout>
      <LayoutPanel v-if="init" title="组件列表" region="west" style="width:120px;" :bodyStyle="{position:'relative'}">
        <Accordion style="position:absolute;width:100%;height:100%;" :animate="true" :border="false">
          <AccordionPanel :title="'布局类'">
            <!-- <div v-for="(item, index) in components.layout" :key="item.name" v-Draggable="{cursor:'default', proxy: $refs.componentProxy, dragStart: (d)=>{onDragStart(d, item)}, drag: onDrag, dragEnd: (d)=>{onDragEnd(d, item)}}" class="dynamic-node">
              <div><img class="component-img" :src="'static/img/icon32/'+item.img"/></div>
              <div>{{item.label}}</div>
            </div> -->
            <draggable :group="{ name: 'column', pull: 'clone', put: false }">
              <div v-for="(item, index) in components.layout" :key="item.name" class="dynamic-node">
                <div><img class="component-img" :src="'static/img/icon32/'+item.img"/></div>
                <div>{{item.label}}</div>
              </div>
            </draggable>
          </AccordionPanel>
          <AccordionPanel :title="'表单类'">
            <div class="dynamic-node" v-for="(item, index) in components.pc">
              <div><img class="component-img" :src="'static/img/icon32/'+item.img"/></div>
              <div>{{item.label}}</div>
            </div>
          </AccordionPanel>
          <AccordionPanel :title="'展示类'">
            <div class="dynamic-node" v-for="(item, index) in components.mobile">
              <div><img class="component-img" :src="'static/img/icon32/'+item.img"/></div>
              <div>{{item.label}}</div>
            </div>
          </AccordionPanel>
        </Accordion>
      </LayoutPanel>
      <LayoutPanel title="布局面板" region="center" style="height:100%;margin:0 3px;" :bodyStyle="{position:'relative'}">
        <Layout style="position:absolute;width:100%;height:100%;">
          <LayoutPanel region="north" :border="false">
            <div class="dialog-toolbar graph-toolbar">
              <LinkButton @click="save()" iconCls="icon-save" :plain="true" title="保存"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="device='pc'" iconCls="fa fa-fw fa-desktop text-sm" :plain="true" title="电脑"></LinkButton>
              <LinkButton @click="device='pad'" iconCls="fa fa-fw fa-tablet text-md" :plain="true" title="平板"></LinkButton>
              <LinkButton @click="device='mobile'" iconCls="fa fa-fw fa-mobile text-lg" :plain="true" title="手机"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="save()" iconCls="icon-graph" :plain="true" title="预览"></LinkButton>
            </div>
          </LayoutPanel>

          <LayoutPanel region="center" :border="false" style="width:100%;height:100%;" :bodyStyle="{position:'relative'}">
            <div :class="'mode-'+device">
              <div>
                <Nested :children="list"/>
                <!-- <draggable style="min-height:50px;" tag="ul" :list="list" :group="{ name: 'g1' }">
                  <li v-for="el in list" :key="el.name" style="padding:20px;border:1px solid red;">
                    <p>{{ el.name }}</p>
                    <draggable style="min-height:50px;" :list="el.children" :group="{ name: 'g1' }">
                      <li v-for="el in el.children" :key="el.name" style="padding-left:20px">
                        <p>{{ el.name }}</p>
                      </li>
                    </draggable>
                  </li>
                </draggable> -->
              </div>
            </div>
          </LayoutPanel>
        </Layout>
      </LayoutPanel>
      <LayoutPanel :style="{width:toggle.showEast?'240px':'40px'}" style="width:40px;" region="east" >
        <template slot="header">
          <div @click="toggle.showEast=!toggle.showEast" class="panel-title" :class="{'center':!toggle.showEast}">
            <i class="fa" :class="{'fa-angle-double-right':toggle.showEast,'fa-angle-double-left':!toggle.showEast}"></i>
            <span>{{toggle.showEast?'组件配置':''}}</span>
          </div>
        </template>
        <component v-if="curComponent != null" :is="configComponent" :component="curComponent" :update="updateConfig"></component>
      </LayoutPanel>
    </Layout>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Nested from "./layout/Nested"
import LxtPanel from './layout/LxtPanel'
import LxtFlex from './layout/LxtFlex'
import {layout, pc, mobile} from './json.js'

export default {
  name: 'DynamicEditor',
  components:{
    Nested,
    LxtPanel,
    LxtFlex
  },
  props:['id'],
  data() {
    return {
      init:false,
      curComponent:null,
      dragComponent:{},
      device:'pc',
      components:{
        layout:layout,
        pc:pc,
        mobile:mobile
      },
      toggle:{
        showEast: false
      },
      pageComponents:[],
      list: [{
        component:'LxtFlex',
        name: "task 1",  
        children: [{}]
      },{
        component:'LxtPanel',
        name: "task 2",
        children: []
      },{
        component:'LxtPanel',
        name: "task 3",
        children: []
      }]
    }
  },
  computed:{
    configComponent(){
      let component = this.curComponent.name
      return component + 'Config'
    }
  },
  methods: {
    save(){
      this.toggle.showEast = !this.toggle.showEast
    },
    updateConfig(key, value){
      
    },
    onDragStart(d, component){
      this.dragComponent = component
    },
    onDrag(d){
    },
    onDragEnd(d, menu){
      d.target.$el.style.left = 0
      d.target.$el.style.top = 0
      d.target.$el.style.position = 'relative'
      d.target.applyDrag()
    },
    onDragEnter(scope){
      if(this.dragComponent.type == 'container'){

      }
      console.log('enter',scope)
    },
    onDragLeave(scope){
      console.log('leave',scope)
    }
  },
  watch:{
    
  },
  mounted(){
    setTimeout(()=>{
      this.init = true
    })
  }
}
</script>
<style type="text/css" scoped>
.datagrid-btn-separator{
  float: none;
  display: inline-block;
  vertical-align: middle;
}
.dynamic-node{
  width:118px;
  margin-top:20px;
  text-align: center;
}
.mode-pc{
  position: relative;
  width:1226px;
  height:854px;
  background:url(../../../static/img/pad-h.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.mode-pc > div{
  position: absolute;
  top: 44px;
  left: 80px;
  width: 1024px;
  height: 768px;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  border:1px solid #CCC;
}
.mode-pad{
  position: relative;
  height: 1226px;
  width: 855px;
  background:url(../../../static/img/pad-v.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.mode-pad>div{
  position: absolute;
  left: 43px;
  top: 81px;
  width: 768px;
  height: 1024px;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  border:1px solid #CCC;
}
.mode-mobile{
  width:428px;
  height:898px;
  background:url(../../../static/img/mobile.png);
  background-size: cover;
}
.mode-mobile>div{
  position: absolute;
  left: 33px;
  top: 118px;
  width: 375px;
  height: 667px;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  border:1px solid #CCC;
}
</style>