<template>
  <div style="position:absolute;width:100%;height:100%;padding:2px;">
    <div id="graph" class="graph-container"></div>
    <div id="outline" style="z-index:1;position:absolute;right:0px;bottom:0px;overflow:hidden;width:180px;height:135px;background:white;border:1px solid #91A1AE;"></div>
    <remotescript src="static/lib/mxgraph/mxClient.min.js" @callback="initMxgraph"></remotescript>
  </div>
</template>

<script>
window.mxBasePath = 'static/lib/mxgraph';
import RemoteScript from '../../components/RemoteScript'
import {initGraph} from './editor.js'
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
    initMxgraph(){
      initGraph.call(this, 'static/lib/mxgraph/src/config/workflow-view.xml')
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