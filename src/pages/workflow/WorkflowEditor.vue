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
              <LinkButton iconCls="icon-save" :plain="true" @click="save()"></LinkButton>
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
            <div id="graph" class="graph-container"></div>
          </LayoutPanel>
        </Layout>
      </LayoutPanel>
      <LayoutPanel title="节点配置" region="east" style="width:240px;">
        <DataGrid :data="configProperties" groupField="group" :border="false">
          <GridColumn field="label" title="属性" width="100"></GridColumn>
          <GridColumn field="value" title="值"></GridColumn>
          <template slot="group" slot-scope="scope" >
            <span style="font-weight:bold;">
              {{scope.value}}
            </span>
          </template>
        </DataGrid>
      </LayoutPanel>
    </Layout>
    <remotescript src="static/lib/mxgraph/js/mxClient.js" @callback="initMxgraph"></remotescript>
  </div>
</template>

<script>
import RemoteScript from '../../components/RemoteScript'
import {handler, workflowProperties, graphNodes, initGraph, initToolbar} from './json.js'
export default {
  name: 'workflowEditor',
  components:{
    remotescript: RemoteScript
  },
  data() {
    return {
      configProperties:workflowProperties,
      graphNodes:graphNodes,
    }
  },
  methods: {
    ...handler,
    initMxgraph(){
      window.mxBasePath = '../../../static/lib/mxgraph';
      window.mxLoadResources = false;
      window.mxObjectCodec.allowEval = true
      const node = window.mxUtils.load('../../../static/lib/mxgraph/config/workflow-editor.xml').getDocumentElement()
      window.editor = new window.mxEditor(node)
      window.graph = editor.graph
      initGraph()
      initToolbar()
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