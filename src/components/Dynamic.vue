<template>
  <Login v-if="component=='login'" :open="open" :close="close" :menu="menu"/>
  <Home v-else-if="component=='home'" :open="open" :close="close" :menu="menu"/>
  <Portal v-else-if="component=='portal'" :open="open" :close="close" :menu="menu"/>
  <Browser v-else-if="component=='browser'" :open="open" :close="close" :menu="menu"/>
  <ProcessList v-else-if="component=='processList'" :open="open" :close="close" :menu="menu"/>
  <ProcessEditor v-else-if="component=='processEditor'" :open="open" :close="close" :menu="menu" :processId="menu.params.processId"/>
  <TaskList v-else-if="component=='taskList'" :open="open" :close="close" :menu="menu"/>
  <Task v-else-if="component=='task'" :open="open" :close="close" :menu="menu" :taskId="menu.params.taskId" :processInstanceId="menu.params.processInstanceId"/>
  <Chat v-else-if="component=='chat'" :open="open" :close="close" :menu="menu"/>
  <ChatDialog v-else-if="component=='chatDialog'" :open="open" :close="close" :menu="menu" :target="menu.params"/>
  <Permission v-else-if="component=='permission'" :open="open" :close="close" :menu="menu"/>
  <Theme v-else-if="component=='theme'" :open="open" :close="close" :menu="menu"/>
  <Feedback v-else-if="component=='feedback'" :open="open" :close="close" :menu="menu"/>
  <UserLog v-else-if="component=='userLog'" :open="open" :close="close" :menu="menu"/>
  <RegexList v-else-if="component=='regexList'" :open="open" :close="close" :menu="menu"/>
  <RuleList v-else-if="component=='ruleList'" :open="open" :close="close" :menu="menu"/>
  <Calendar v-else-if="component=='calendar'" :open="open" :close="close" :menu="menu"/>
  <PageList v-else-if="component=='pageList'" :open="open" :close="close" :menu="menu"/>
  <PageEditor v-else-if="component=='pageEditor'" :open="open" :close="close" :menu="menu" :processId="menu.params.id"/>
  <div v-else class="pd-md" v-else>该菜单暂未实现，敬请期待！</div>
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
import Task from '../pages/workflow/Task.vue'
import Chat from '../pages/chat/Chat.vue'
import ChatDialog from '../pages/chat/ChatDialog.vue'
import Permission from '../pages/permission/Permission.vue'
import Theme from '../pages/theme/Theme.vue'
import Feedback from '../pages/feedback/Feedback.vue'
import UserLog from '../pages/feedback/UserLog.vue'
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
    Task,
    Chat,
    ChatDialog,
    Permission,
    Theme,
    Feedback,
    UserLog,
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