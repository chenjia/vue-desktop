<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <Layout>
      <LayoutPanel title="工具箱" region="west" style="width:120px;" :bodyStyle="{position:'relative'}">
        <Accordion style="position:absolute;width:100%;height:100%;" :animate="true" :border="false">
          <AccordionPanel :title="'流程节点'">
            <div class="graph-node" v-for="(item, index) in graphNodes">
              <div><img class="graphElement" :src="'static/img/mxgraph/'+item.type+'.png'"/></div>
              <div>{{item.label}}</div>
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
              <LinkButton @click="save()" iconCls="icon-save" :plain="true" title="保存"></LinkButton>
              <LinkButton @click="editorExecute('exportImage')" iconCls="icon-graph" :plain="true" title="预览"></LinkButton>
              <LinkButton @click="editorExecute('print')" iconCls="icon-print" :plain="true" title="打印"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="editorExecute('copy')" iconCls="icon-copy" :plain="true" title="复制"></LinkButton>
              <LinkButton @click="editorExecute('paste')" iconCls="icon-paste" :plain="true" title="粘贴"></LinkButton>
              <LinkButton @click="editorExecute('cut')" iconCls="icon-cut" :plain="true" title="剪切"></LinkButton>
              <LinkButton @click="editorExecute('delete')" iconCls="icon-delete" :plain="true" title="删除"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="editorExecute('undo')" iconCls="icon-undo" :plain="true" title="后退"></LinkButton>
              <LinkButton @click="editorExecute('redo')" iconCls="icon-redo" :plain="true" title="前进"></LinkButton>
              <LinkButton @click="editorExecute('save')" iconCls="icon-reset" :plain="true" title="重置"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="editorExecute('zoomIn')" iconCls="icon-zoom-in" :plain="true" title="放大"></LinkButton>
              <LinkButton @click="editorExecute('zoomOut')" iconCls="icon-zoom-out" :plain="true" title="缩小"></LinkButton>
              <LinkButton @click="editorExecute('actualSize')" iconCls="icon-zoom-original" :plain="true" title="还原"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="setEdgeStyle('')" iconCls="icon-straight" :plain="true" title="直线"></LinkButton>
              <LinkButton @click="setEdgeStyle('elbowEdge')" iconCls="icon-curve" :plain="true" title="折线"></LinkButton>
              <LinkButton @click="toolbar.grid=!toolbar.grid" iconCls="icon-grid" :plain="true" title="网格线"></LinkButton>
              <div class="datagrid-btn-separator"></div>
              <LinkButton @click="editorExecute('toggleHelp')" iconCls="icon-help" :plain="true" title="帮助"></LinkButton>
            </div>
          </LayoutPanel>

          <LayoutPanel region="center" :border="false" style="width:100%;height:100%;" :bodyStyle="{position:'relative'}">
            <div id="graph" class="graph-container" :style="toolbar.grid?{}:{background:'none'}"></div>
            <div id="outline" style="z-index:1;position:absolute;right:0px;bottom:0px;overflow:hidden;width:180px;height:135px;background:white;border:1px solid #91A1AE;"></div>
          </LayoutPanel>
        </Layout>
      </LayoutPanel>
      <LayoutPanel title="节点配置" region="east" style="width:240px;">
        <component v-if="curCell != null" :is="configComponent" :attributes="configAttributes" :update="updateConfig"></component>
      </LayoutPanel>
    </Layout>
    <remotescript src="static/lib/mxgraph/js/mxClient.js" @callback="initMxgraph"></remotescript>
  </div>
</template>

<script>
window.mxBasePath = 'static/lib/mxgraph';
import RemoteScript from '../../components/RemoteScript'
import WorkflowConfig from './config/WorkflowConfig'
import StartConfig from './config/StartConfig'
import EndConfig from './config/EndConfig'
import UserTaskConfig from './config/UserTaskConfig'
import {handler, graphNodes, initGraph, initToolbar} from './json.js'
export default {
  name: 'processEditor',
  components:{
    remotescript: RemoteScript,
    WorkflowConfig,
    StartConfig,
    EndConfig,
    TaskConfig:UserTaskConfig
  },
  props:['close','menu','processId'],
  data() {
    return {
      curCell:null,
      graphNodes:graphNodes,
      toolbar:{
        grid:true
      }
    }
  },
  computed:{
    configComponent(){
      let component = ''
      if(typeof this.curCell.value == 'object'){
        component = this.curCell.value.nodeName
      }
      return component + 'Config'
    },
    configAttributes(){
      let result = {}
      if(this.curCell.value){
        let attributes = this.curCell.value.attributes
        for(let i of attributes){
          result[i.nodeName] = i.nodeValue
        }
      }
      return result
    }
  },
  methods: {
    ...handler,
    editorExecute(cmd){
      if(cmd=='save'){
        window.editor.execute(cmd, 'test.html')
      }else{
        window.editor.execute(cmd)
      }
    },
    setEdgeStyle(style){
      var model = window.graph.getModel();
      model.beginUpdate();
      try{
        if(curCell.isEdge()){
          curCell.setStyle(style);
          window.graph.refresh();
        }
      }catch(e){
        alert(e);
      }finally{
        model.endUpdate();
      }
    },
    updateConfig(key, value){
      if(key){
        console.log(key+":"+value)
        let model = window.graph.getModel()
        model.beginUpdate()
        this.curCell.setAttribute(key, value)
        graph.refresh()
        model.endUpdate()
      }
      
    },
    initMxgraph(){
      window.mxObjectCodec.allowEval = true
      const node = window.mxUtils.load('static/lib/mxgraph/config/workflow-editor.xml').getDocumentElement()
      window.editor = new window.mxEditor(node)
      window.graph = editor.graph
      initGraph.call(this)
      initToolbar.call(this)
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css">
.proxyCls{
  z-index: 999999!important;
  display: block!important;
}
</style>
<style type="text/css" scoped>
.graph-toolbar{
  padding:4px 8px;
}
.graph-node{
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