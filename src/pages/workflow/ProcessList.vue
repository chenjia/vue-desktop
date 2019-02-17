<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toEditor()" iconCls="icon-add" :plain="true">新建</LinkButton>
      <LinkButton @click="remove()" iconCls="icon-remove" :plain="true">删除</LinkButton>
      <LinkButton @click="removeAll()" iconCls="icon-remove" :plain="true">全部删除</LinkButton>
      <LinkButton @click="toEditor()" iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton @click="publish(1)" iconCls="icon-yes" :plain="true">启用</LinkButton>
      <LinkButton @click="publish(0)" iconCls="icon-no" :plain="true">禁用</LinkButton>
      <LinkButton @click="start()" iconCls="icon-start" :plain="true">发起</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="processDataGrid"
      style="height:100%;"
      groupField="processCategoryId"
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
      <GridColumn field="processId" width="130">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedProcessId" :multiple="true" :value="scope.row.processId"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="name" title="流程名称"></GridColumn>
      <GridColumn field="versionNo" title="版本号"></GridColumn>
      <GridColumn field="processKey" title="流程标识"></GridColumn>
      <GridColumn field="memo" title="描述"></GridColumn>
      <GridColumn field="status" title="状态"></GridColumn>
      <GridColumn field="insertTime" title="创建时间">
        <template slot="body" slot-scope="scope">
          {{scope.row.insertTime | date}}
        </template>
      </GridColumn>
      <GridColumn field="updateTime" title="更新时间">
        <template slot="body" slot-scope="scope">
          {{scope.row.updateTime | date}}
        </template>
      </GridColumn>
      <template slot="group" slot-scope="scope" >
        <span style="font-weight:bold">
          {{scope.value}} - <span style="color:red">{{scope.rows.length}}</span> Item(s)
        </span>
      </template>
    </DataGrid>
  </div>
</template>

<script>
export default {
  name: 'processList',
  props:['open','params'],
  data() {
    return {
      total:0,
      pageNumber:1,
      pageSize:10,
      data:[],
      selectedProcessId:[]
    }
  },
  methods: {
    selectionChange(row){
      this.selectedProcessId = [row.processId]
    },
    toEditor(){
      this.open({
        name:'processEditor',
        text:'流程设计',
        icon:'./static/img/icon32/molecule.png'
      },{
        processId:this.selectedProcessId[0]
      })
    },
    remove(){
      if(this.selectedProcessId.length == 0){
        alert('请选择要操作的记录！')
        return
      }
       
      utils.http.post('/workflow/process/delete', {pid:this.selectedProcessId[0]}).then(response => {
        this.list()
      }, error => {
        console.log(error)
      })
    },
    removeAll(){
      utils.http.post('/workflow/process/deleteAll').then(response => {
        this.list()
      }, error => {
        console.log(error)
      })
    },
    publish(status){
      if(this.selectedProcessId.length == 0){
        alert('请选择要操作的记录！')
        return
      }
       
      utils.http.post('/workflow/process/publish', {pid:this.selectedProcessId[0], status:status}).then(response => {
        this.list()
      }, error => {
        console.log(error)
      })
    },
    start(){
      if(this.selectedProcessId.length == 0){
        alert('请选择要操作的记录！')
        return
      }
       
      utils.http.post('/workflow/process/start', {pid:this.selectedProcessId[0]}).then(response => {
        alert('流程启动成功：')
      }, error => {
        console.log(error)
      })
    },
    toSearch(){

    },
    list(){
      utils.http.post('/workflow/process/list', {example:{}, pageData:{pageNum:this.pageNumber, pageSize: this.pageSize}}).then(response => {
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