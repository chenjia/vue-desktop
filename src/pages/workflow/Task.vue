<template>
  <div style="position:relative;width:100%;">
    <Tabs @tabSelect="tabSelect" style="width:100%;height:100%;padding-bottom:35px;" :border="false">
      <TabPanel :title="'表单'">
        <TaskForm :open="open" v-if="toggle.tab=='form'"></TaskForm>
      </TabPanel>
      <TabPanel :title="'附件'">
        <TaskAttachment :open="open" v-if="toggle.tab=='attachment'"></TaskAttachment>
      </TabPanel>
      <TabPanel :title="'流程图'">
        <ProcessView :taskId="taskId" :processInstanceId="processInstanceId" :open="open" v-if="toggle.tab=='graph'"></ProcessView>
      </TabPanel>
      <TabPanel :title="'日志'">
        <TaskLog :open="open" v-if="toggle.tab=='log'"></TaskLog>
      </TabPanel>
    </Tabs>
    <div class="dialog-toolbar" style="position:absolute;bottom:0;width:100%;text-align:right;">
      <LinkButton @click="submit()" iconCls="icon-do" :plain="true">提交</LinkButton>
    </div>

    <Dialog ref="nextDialog" 
      :title="'提交任务'"
      :dialogStyle="{width:'400px',height:'200px'}"
      :modal="true">
      <div class="pd-md" style="font-size:16px">温馨提示：</div>
      <p v-for="(item, index) in nextSteps">
        <div>{{item.to}}</div>
        <div>
          <template v-for="(assignee, index) in item.assignee">
            [{{assignee}}]
          </template>
        </div>
      </p>
    </Dialog>
  </div>
</template>

<script>
import TaskForm from './TaskForm'
import ProcessView from './ProcessView'
import TaskAttachment from './TaskAttachment'
import TaskLog from './TaskLog'

export default {
  name: 'task',
  props:['open','taskId','processInstanceId'],
  components:{
    TaskForm,
    ProcessView,
    TaskAttachment,
    TaskLog
  },
  data() {
    return {
      toggle:{
        tab:'form'
      },
      nextSteps:[]
    }
  },
  methods: {
    tabSelect(panel){
      const mapping = {
        '表单':'form',
        '附件':'attachment',
        '流程图':'graph',
        '日志':'log'
      }
      this.toggle.tab = mapping[panel.title]
    },
    submit(){
      utils.http.post('/workflow/task/nextStep', {taskId:this.taskId}).then(response => {
        if(response.data.head.status == 200){
          this.nextSteps = response.data.body.data
        }
      }, error => {
        console.log(error)
      })

      // utils.http.post('/workflow/task/submit', {taskId:this.taskId}).then(response => {
        
      // }, error => {
      //   console.log(error)
      // })
    },
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>