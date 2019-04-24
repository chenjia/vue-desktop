<template>
  <div style="position:relative;width:100%;">
    <Tabs @tabSelect="tabSelect" style="width:100%;height:100%;padding-bottom:42px;" :border="false">
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
      <TabPanel :title="'会签'">
        
      </TabPanel>
      <TabPanel :title="'抄送'">
        
      </TabPanel>
    </Tabs>
    <div class="dialog-toolbar panel-footer" style="position:absolute!important;top:auto;bottom:0;width:100%;text-align:right;padding:5px;">
      <LinkButton @click="rollback" iconCls="icon-do" :plain="true">退回</LinkButton>
      <LinkButton @click="toSubmit" iconCls="icon-do" :plain="true">提交</LinkButton>
    </div>

    <Dialog :closed="true" v-show="toggle.showNextDialog"
      ref="nextDialog"
      :title="'提交任务'"
      :dialogStyle="{width:'400px',height:'300px'}"
      :modal="true"
      @close="closeNextDialog">
      <div class="pd-md" style="font-size:16px">请选择后续处理人：
        <Tree ref="activityTree" :data="activityTreeData" :selectLeafOnly="true" :checkbox="true" @nodeCheck="nodeCheck($event)" @selectionChange="nodeCheck($event)"></Tree>
      </div>

      <template slot="footer">
        <div style="padding:5px;text-align:right;">
          <LinkButton @click="submit" iconCls="fa fa-fw fa-check">确定</LinkButton>
        </div>
      </template>
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
  props:['open','close','menu','taskId','processInstanceId'],
  components:{
    TaskForm,
    TaskAttachment,
    TaskLog,
    ProcessView
  },
  data() {
    return {
      toggle:{
        tab:'form',
        showNextDialog:false
      },
      activityTreeData:[],
      checkedNode:{}
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
    nodeCheck(event){
      if(event.id != this.checkedNode.id){
        this.checkedNode = event
        this.$refs.activityTree.uncheckAllNodes()
        this.$refs.activityTree.checkNode(event)
      }
    },
    closeNextDialog(){
      this.checkedNode = {}
      if(this.$refs.nextDialog){
        this.$refs.nextDialog.close()
      }
    },
    rollback(){

    },
    toSubmit(){
      utils.http.post('/workflow/task/nextStep', {taskId:this.taskId}).then(response => {
        if(response.data.head.status == 200){
          const items = response.data.body.data

          if(items.length == 1 && items[0].activity.outgoingFlows.length == 0){
            this.toggle.showNextDialog = true
            this.submit()
          }else{
            const array = []
            for(let i in items){
              let item = items[i]
              let node = {
                id:item.activity.id,
                text:item.activity.name,
                iconCls:'fa fa-fw fa-list-alt no-bg',
                children:[]
              }
              for(var j in item.assignee){
                let assignee = item.assignee[j]
                node.children.push({
                  id:assignee.userId,
                  text:assignee.realname,
                  iconCls:'fa fa-fw fa-user no-bg'
                })
              }

              array.push(node)
            }

            this.activityTreeData = array

            this.$nextTick(() => {
              this.toggle.showNextDialog = true
              this.$nextTick(() => {
                this.$refs.nextDialog.moveToTop()
                this.$refs.nextDialog.open()
              })
            })
          }
        }
      }, error => {
        console.log(error)
      })
    },
    submit(){
      let targetId = this.checkedNode.id?this.checkedNode.parent.id:null
      let assignee = this.checkedNode.id?this.checkedNode.id:null
      utils.http.post('/workflow/task/submit', {taskId:this.taskId, targetId:targetId, assignee:assignee}).then(response => {
        this.closeNextDialog()
        this.$nextTick(()=>{
          this.toggle.showNextDialog = false
          this.close(this.menu)
          if(this.menu.onClose){
            this.menu.onClose()
          }
        })
      }, error => {
        console.log(error)
      })
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>