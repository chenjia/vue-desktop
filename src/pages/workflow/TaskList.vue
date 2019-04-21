<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="doTask()" iconCls="icon-do" :plain="true">处理</LinkButton>
      <LinkButton @click="remark()" iconCls="icon-favorite" :plain="true" title="标记重点任务同时自定义描述内容">标记</LinkButton>
      <LinkButton @click="delegate()" iconCls="icon-task" :plain="true" title="可在出差期间将任务交由指定人员代为处理">代理</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="taskDataGrid"
      style="height:100%;"
      groupField="processDefinitionId"
      pagePosition="bottom"
      selectionMode="single"
      @selectionChange="selectionChange($event)"
      :pagination="true"
      :total="total"
      :pageNumber="pageNumber"
      :pageSize="pageSize"
      :data="data"
      @pageChange="pageChange($event)"
      :border="false">
      <template slot="group" slot-scope="scope" >
        <span style="font-weight:bold">
          {{scope.value.substr(0,scope.value.indexOf(':'))}} <span style="color:red">（{{scope.rows.length}}）</span>
        </span>
      </template>
      <GridColumn field="id" width="30">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedTaskId" :multiple="true" :value="scope.row.id"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="name" title="任务名称"></GridColumn>
      <GridColumn field="description" title="描述" width="300"></GridColumn>
      <GridColumn field="owner" title="所属人"></GridColumn>
      <GridColumn field="pre" title="上一步处理人"></GridColumn>
      <GridColumn field="insertTime" title="创建时间">
        <template slot="body" slot-scope="scope">
          {{scope.row.insertTime | date}}
        </template>
      </GridColumn>
      <GridColumn title="操作" width="150">
        <template slot="body" slot-scope="scope">
          <LinkButton @click="toSearch()" iconCls="icon-do" :plain="true">处理</LinkButton>
          <LinkButton @click="toSearch()" iconCls="icon-delegate" :plain="true">委托</LinkButton>
        </template>
      </GridColumn>
    </DataGrid>
  </div>
</template>

<script>
export default {
  name: 'taskList',
  props:['open','params'],
  data() {
    return {
      total:0,
      pageNumber:1,
      pageSize:10,
      data:[],
      selectedTaskId:[],
      processInstanceId:''
    }
  },
  methods: {
    selectionChange(row){
      this.selectedTaskId = [row.id]
      this.processInstanceId = row.processInstanceId
    },
    doTask(){
      if(this.selectedTaskId.length == 0){
        alert('请选择要操作的记录！')
        return
      }

      this.open({
        name:'task',
        text:'任务处理',
        icon:'./static/img/icon32/task_32.png'
      },{
        taskId:this.selectedTaskId[0],
        processInstanceId:this.processInstanceId
      })
    },
    remark(){
      
    },
    delegate(){
      
    },
    toSearch(){

    },
    list(){
      utils.http.post('/workflow/task/list', {pageData:{pageNumber:this.pageNumber, pageSize: this.pageSize}}).then(response => {
        this.data = response.data.body.data.data
        this.total = response.data.body.data.total
      }, error => {

      })
    },
    pageChange(){
      this.list()
    }
  },
  watch:{
    
  },
  mounted(){
    this.list()
  }
}
</script>