<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <Layout>
      <LayoutPanel title="组件列表" region="west" style="width:120px;" :bodyStyle="{position:'relative'}">
        <Accordion style="position:absolute;width:100%;height:100%;" :animate="true" :border="false">
          <AccordionPanel :title="'布局类'">
            <div class="dynamic-node" v-for="(item, index) in components.layout">
              <div><img class="component-img" :src="'static/img/icon32/'+item.img"/></div>
              <div>{{item.label}}</div>
            </div>
            <!-- <component v-for="(item, index) in components.layout" :is="item.name"></component> -->
          </AccordionPanel>
          <AccordionPanel :title="'表单类'">
            <p>Content2</p>
          </AccordionPanel>
          <AccordionPanel :title="'展示类'">
            <p>Content3</p>
          </AccordionPanel>
          <AccordionPanel :title="'其他'">
            <p>Content3</p>
          </AccordionPanel>
        </Accordion>
      </LayoutPanel>
      <LayoutPanel title="布局面板" region="center" style="height:100%;margin:0 3px;" :bodyStyle="{position:'relative'}">
        <Layout style="position:absolute;width:100%;height:100%;">
          <LayoutPanel region="north" :border="false">
            <div class="dialog-toolbar graph-toolbar">
              <LinkButton @click="save()" iconCls="icon-save" :plain="true" title="保存"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="save()" iconCls="fa fa-fw fa-desktop text-sm" :plain="true" title="电脑"></LinkButton>
              <LinkButton @click="save()" iconCls="fa fa-fw fa-tablet text-md" :plain="true" title="平板"></LinkButton>
              <LinkButton @click="save()" iconCls="fa fa-fw fa-mobile text-lg" :plain="true" title="手机"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="save()" iconCls="icon-graph" :plain="true" title="预览"></LinkButton>
            </div>
          </LayoutPanel>

          <LayoutPanel region="center" :border="false" style="width:100%;height:100%;" :bodyStyle="{position:'relative'}">
            <div class="layout-panel" v-Droppable="{dragEnter:onDragEnter,dragLeave:onDragLeave}"></div>
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
import LxtPanel from './layout/LxtPanel'
import LxtFlex from './layout/LxtFlex'


export default {
  name: 'DynamicEditor',
  components:{
    LxtPanel,
    LxtFlex
  },
  props:['id'],
  data() {
    return {
      curComponent:null,
      components:{
        layout:[{
          name:'LxtPanel',
          label:'面板',
          title:'',
          width:'100%',
          height:'100px',
          img:'application.png'
        },{
          name:'LxtFlex',
          label:'Flex布局',
          column:'',
          width:'100%',
          height:'100px',
          img:'column_double.png'
        }],
        form:[],
        display:[]
      },
      toggle:{
        showEast: false
      }
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
    onDragEnter(scope){
      console.log('enter',scope)
    },
    onDragLeave(scope){
      console.log('leave',scope)
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css" scoped>
.layout-panel{
  position:absolute;
  width:100%;
  height:100%;
}
.datagrid-btn-separator{
  float: none;
  display: inline-block;
  vertical-align: middle;
}
.dynamic-node{
  margin: 20px auto;
  text-align: center;
}
</style>