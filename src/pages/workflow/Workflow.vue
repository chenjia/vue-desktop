<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton iconCls="icon-add" :plain="true">新建</LinkButton>
      <LinkButton iconCls="icon-remove" :plain="true">删除</LinkButton>
      <LinkButton iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton iconCls="icon-yes" :plain="true">启用</LinkButton>
      <LinkButton iconCls="icon-no" :plain="true">禁用</LinkButton>
      <LinkButton iconCls="icon-start" :plain="true">发起</LinkButton>
      <LinkButton iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      style="height:100%;"
      groupField="processCategoryId"
      pagePosition="bottom"
      :pagination="true"
      :total="total"
      :pageSize="pageSize"
      :data="data"
      :border="false">
      <GridColumn width="30"></GridColumn>
      <GridColumn field="name" title="Name"></GridColumn>
      <GridColumn field="versionNo" title="版本号"></GridColumn>
      <GridColumn field="processKey" title="流程标识"></GridColumn>
      <GridColumn field="memo" title="描述"></GridColumn>
      <GridColumn field="status" title="状态"></GridColumn>
      <GridColumn field="insertTime" title="创建时间"></GridColumn>
      <GridColumn field="updateTime" title="更新时间"></GridColumn>
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
  name: 'workflow',
  data() {
    return {
      total:0,
      pageSize:10,
      data:[]
    }
  },
  methods: {
    list(){
      utils.http.post('/workflow/workflow/list', {example:{}, pageNum:1, pageSize: 10}).then(response => {
        console.log(response)
        this.data = response.data.body.data.data
        this.total = response.data.body.data.total
        this.pageSize = response.data.body.data.pageSize
        this.pageNum = response.data.body.data.pageSize
      }, error => {

      })
    }
  },
  watch:{
    
  },
  mounted(){
    this.list()
  }
}
</script>