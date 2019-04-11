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
  <Theme v-else-if="component=='theme'"/>
  <Feedback v-else-if="component=='feedback'"/>
  <RegexList v-else-if="component=='regexList'"/>
  <RuleList v-else-if="component=='ruleList'"/>
  <Calendar v-else-if="component=='calendar'"/>
  <PageList v-else-if="component=='pageList'" :open="open"/>
  <PageEditor v-else-if="component=='pageEditor'" :processId="menu.params.id"/>
  <div class="pd-md" v-else>该菜单暂未实现，敬请期待！</div>
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Portal from '../pages/portal/Portal.vue'
import Browser from '../pages/browser/Browser.vue'
import ProcessList from '../pages/workflow/ProcessList.vue'
import ProcessEditor from '../pages/workflow/ProcessEditor.vue'
import RegexList from '../pages/page/RegexList.vue'
import RuleList from '../pages/rule/RuleList.vue'
import TaskList from '../pages/workflow/TaskList.vue'
import Chat from '../pages/chat/Chat.vue'
import ChatDialog from '../pages/chat/ChatDialog.vue'
import Permission from '../pages/permission/Permission.vue'
import Theme from '../pages/theme/Theme.vue'
import Feedback from '../pages/feedback/Feedback.vue'
import Calendar from '../pages/calendar/Calendar.vue'
import PageList from '../pages/page/PageList.vue'
import PageEditor from '../pages/page/PageEditor.vue'

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
    Theme,
    Feedback,
    RegexList,
    RuleList,
    Calendar,
    PageList,
    PageEditor
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