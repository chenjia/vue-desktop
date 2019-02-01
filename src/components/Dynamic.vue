<template>
  <Login v-if="component=='login'"/>
  <Home v-else-if="component=='home'" />
  <Portal v-else-if="component=='portal'" />
  <Browser v-else-if="component=='browser'" />
  <ProcessList v-else-if="component=='processList'" :open="open"/>
  <ProcessEditor v-else-if="component=='processEditor'" :processId="params.processId"/>
  <TaskList v-else-if="component=='taskList'" :open="open"/>
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Portal from '../pages/portal/Portal.vue'
import Browser from '../pages/browser/Browser.vue'
import ProcessList from '../pages/workflow/ProcessList.vue'
import ProcessEditor from '../pages/workflow/ProcessEditor.vue'
import TaskList from '../pages/workflow/TaskList.vue'

export default {
  name: 'Dynamic',
  props:['component','open','params'],
  components:{
    Login,
    Home,
    Portal,
    Browser,
    ProcessList,
    ProcessEditor,
    TaskList
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