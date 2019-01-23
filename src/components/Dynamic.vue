<template>
  <Login v-if="component=='login'" />
  <Home v-else-if="component=='home'" />
  <Portal v-else-if="component=='portal'" />
  <Browser v-else-if="component=='browser'" />
  <Workflow v-else-if="component=='workflow'" />
  <WorkflowEditor v-else-if="component=='workflowEditor'" />
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Portal from '../pages/portal/Portal.vue'
import Browser from '../pages/browser/Browser.vue'
import Workflow from '../pages/workflow/Workflow.vue'
import WorkflowEditor from '../pages/workflow/WorkflowEditor.vue'
export default {
  name: 'Dynamic',
  props:['component'],
  components:{
    Login,
    Home,
    Portal,
    Browser,
    Workflow,
    WorkflowEditor
  },
  data(){
    return {
      
    }
  },
  methods:{
    
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>