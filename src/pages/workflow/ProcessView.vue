<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <div id="graph" class="graph-container"></div>
    <div id="outline" style="z-index:1;position:absolute;right:0px;bottom:0px;overflow:hidden;width:180px;height:135px;background:white;border:1px solid #91A1AE;"></div>
    <remotescript src="static/lib/mxgraph/js/mxClient.js" @callback="initMxgraph"></remotescript>
  </div>
</template>

<script>
window.mxBasePath = 'static/lib/mxgraph';
import RemoteScript from '../../components/RemoteScript'
import {handler, graphNodes, initGraph, initToolbar} from './json.js'
export default {
  name: 'processView',
  components:{
    remotescript: RemoteScript
  },
  props:['processId','taskId','processInstanceId'],
  data() {
    return {
      
    }
  },
  methods: {
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
    
    initMxgraph(){
      window.mxObjectCodec.allowEval = true
      const node = window.mxUtils.load('static/lib/mxgraph/config/workflow-editor.xml').getDocumentElement()
      window.editor = new window.mxEditor(node)
      window.graph = editor.graph
      initGraph.call(this)
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css">
.flow {
  stroke-dasharray: 8;
  animation: dash 0.5s linear;
  animation-iteration-count: infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -16;
  }
}
</style>