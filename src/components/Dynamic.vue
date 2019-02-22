<template>
  <Login v-if="component=='login'"/>
  <Home v-else-if="component=='home'" />
  <Portal v-else-if="component=='portal'" />
  <Browser v-else-if="component=='browser'" :close="close" :menu="menu"/>
  <ProcessList v-else-if="component=='processList'" :open="open"/>
  <ProcessEditor v-else-if="component=='processEditor'" :processId="menu.params.processId"/>
  <TaskList v-else-if="component=='taskList'" :open="open"/>
  <Chat v-else-if="component=='chat'" :open="open"/>
  <ChatDialog v-else-if="component=='chatDialog'" :open="open" :target="menu.params"/>
  <Permission v-else-if="component=='permission'" :open="open"/>
  <UserEditor v-else-if="component=='userEditor'" :open="open" :userId="menu.params.userId"/>
  <Theme v-else-if="component=='theme'"/>
  <Feedback v-else-if="component=='feedback'"/>
  <RuleList v-else-if="component=='ruleList'"/>
  <Calendar v-else-if="component=='calendar'"/>
  
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Portal from '../pages/portal/Portal.vue'
import Browser from '../pages/browser/Browser.vue'
import ProcessList from '../pages/workflow/ProcessList.vue'
import ProcessEditor from '../pages/workflow/ProcessEditor.vue'
import RuleList from '../pages/workflow/RuleList.vue'
import TaskList from '../pages/workflow/TaskList.vue'
import Chat from '../pages/chat/Chat.vue'
import ChatDialog from '../pages/chat/ChatDialog.vue'
import Permission from '../pages/permission/Permission.vue'
import UserEditor from '../pages/permission/UserEditor.vue'
import Theme from '../pages/theme/Theme.vue'
import Feedback from '../pages/feedback/Feedback.vue'
import Calendar from '../pages/calendar/Calendar.vue'


export default {
  name: 'Dynamic',
  props:['component','open','close','menu'],
  components:{
    Login,
    Home,
    Portal,
    Browser,
    ProcessList,
    ProcessEditor,
    TaskList,
    Chat,
    ChatDialog,
    Permission,
    UserEditor,
    Theme,
    Feedback,
    RuleList,
    Calendar
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