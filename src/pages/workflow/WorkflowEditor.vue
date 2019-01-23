<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <Layout>
      <LayoutPanel title="工具箱" region="west" style="width:120px;" :bodyStyle="{position:'relative'}">
        <Accordion style="position:absolute;width:100%;height:100%;" :animate="true" :border="false">
          <AccordionPanel :title="'流程节点'">
            <div class="graph-node" draggable="false" v-Draggable="{row:{type:'start'},proxy:$refs.proxy,revert:true,dragStart:onDragStart, dragEnd: onDragEnd}">
              <div><img class="graphElement" src="../../../static/img/mxgraph/start.png"/></div>
              <div>开始节点</div>
            </div>
            <div class="graph-node" v-Draggable="{row:{type:'task'},proxy:$refs.proxy,revert:true,dragStart:onDragStart}">
              <div><img class="graphElement" src="../../../static/img/mxgraph/task.png"/></div>
              <div>任务节点</div>
            </div>
            <div class="graph-node" v-Draggable="{row:{type:'end'},proxy:$refs.proxy,revert:true,dragStart:onDragStart}">
              <div><img class="graphElement" src="../../../static/img/mxgraph/end.png"/></div>
              <div>结束节点</div>
            </div>
            <div class="graph-node" v-Draggable="{row:{type:'error'},proxy:$refs.proxy,revert:true,dragStart:onDragStart}">
              <div><img class="graphElement" src="../../../static/img/mxgraph/error.png"/></div>
              <div>异常节点</div>
            </div>
          </AccordionPanel>
          <AccordionPanel :title="'流程导向'">
            <p>Content2</p>
          </AccordionPanel>
          <AccordionPanel :title="'其他工具'">
            <p>Content3</p>
          </AccordionPanel>
        </Accordion>
      </LayoutPanel>
      <LayoutPanel title="制作流程" region="center" style="height:100%;margin:0 3px;" :bodyStyle="{position:'relative'}">
        <Layout style="position:absolute;width:100%;height:100%;">
          <LayoutPanel region="north" :border="false">
            <div class="dialog-toolbar graph-toolbar">
              <LinkButton iconCls="icon-save" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-print" :plain="true"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton iconCls="icon-copy" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-paste" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-cut" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-delete" :plain="true"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton iconCls="icon-undo" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-redo" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-reset" :plain="true"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton iconCls="icon-zoom-in" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-zoom-out" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-zoom-original" :plain="true"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton iconCls="icon-straight" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-curve" :plain="true"></LinkButton>
              <LinkButton iconCls="icon-grid" :plain="true"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton iconCls="icon-help" :plain="true"></LinkButton>
            </div>
          </LayoutPanel>

          <LayoutPanel region="center" :border="false" style="width:100%;height:100%;" :bodyStyle="{position:'relative'}">
            <div class="graph-container" v-Droppable="dropOpts" @dragEnter="isover=true" @dragLeave="isover=false" @drop="isover=false;onDrop()"></div>
          </LayoutPanel>
        </Layout>
      </LayoutPanel>
      <LayoutPanel title="节点配置" region="east" style="width:240px;">
        <DataGrid :data="configProperties" groupField="group" :border="false">
          <GridColumn field="label" title="属性" width="100"></GridColumn>
          <GridColumn field="value" title="值"></GridColumn>
          <template slot="group" slot-scope="scope" >
            <span style="font-weight:bold">
              {{scope.value}}
            </span>
          </template>
        </DataGrid>
      </LayoutPanel>
    </Layout>
    
    <DraggableProxy ref="proxy" :proxyCls="dragItem?'proxyCls':''">
      <div v-if="dragItem" class="drag-proxy" :class="{'droppable':isover}">
        <img :src="'../../../static/img/mxgraph/'+dragItem.type+'.png'">
        <div :class="{'icon-drop-no':!isover,'icon-drop-yes':isover}"></div>
      </div>
    </DraggableProxy>
  </div>
</template>

<script>
import {workflowProperties, } from './json.js'
export default {
  name: 'workflowEditor',
  data() {
    return {
      isover:false,
      dragItem:null,
      dropped:false,
      configProperties:workflowProperties,
      dropOpts: {
        dragEnter: () => {
          this.isover = true;
        },
        dragLeave: () => {
          this.isover = false;
        }
      }
    }
  },
  methods: {
    onDragStart(state) {
      this.dragItem = state.target.row
    },
    onDragEnd(state) {
      setTimeout(()=>{
        this.dragItem = null
      },300)
    },
    onDrop() {
      
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style src="./icon.css"></style>
<style type="text/css">
.proxyCls{
  z-index: 999999!important;
  display: block!important;
}
.drag-proxy{
  text-align: center;
  width: 60px;
  height: 60px;
  padding:3px 0;
  opacity: 0.6;
  border:2px dashed red;
  cursor:move;
}
.drag-proxy.droppable{
  opacity: 1;
  border:2px dashed green;
}
</style>
<style type="text/css" scoped>
.graph-toolbar{
  padding:4px 8px;
}
.graph-node{
  position:relative!important;
  top:0!important;
  left:0!important;
  margin: 20px auto;
  text-align: center;
}
.graph-container{
  position:absolute;
  width:100%;
  height:100%;
  background:url(../../../static/img/mxgraph/grid.gif);
}
.datagrid-btn-separator{
  float: none;
  display: inline-block;
  vertical-align: middle;
}
</style>