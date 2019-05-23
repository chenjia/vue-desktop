<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true">搜索</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="userlogDataGrid"
      style="height:100%;"
      groupField="userId"
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
      <GridColumn field="userId" title="用户分组" width="180"></GridColumn>
      <template slot="group" slot-scope="scope" >
        <span style="font-weight:bold">
          {{scope.value}} - <span style="color:red">{{scope.rows.length}}</span> Item(s)
        </span>
      </template>
      <GridColumn field="insertTime" title="创建时间" width="180">
        <template slot="body" slot-scope="scope">
          {{scope.row.insertTime | date}}
        </template>
      </GridColumn>
      <GridColumn field="content" title="内容"></GridColumn>
      <GridColumn title="操作" width="80">
        <template slot="body" slot-scope="scope">
          <LinkButton @click="details(scope.row)" iconCls="icon-search" :plain="true">查看</LinkButton>
        </template>
      </GridColumn>
    </DataGrid>

    <Dialog
      ref="logDialog"
      :closed="true"
      title="日志详情"
      :dialogStyle="{width:screenWidth+'px',height:(screenHeight-43)+'px'}"
      :bodyStyle="{display:'flex',position:'relative'}"
      :modal="false"
      >
      
      
      <Form :model="log" class="form-flex pd-md" style="width:80%;">
        <div style="margin-bottom:20px">
          <Label for="logId">logId:</Label>
          <TextBox style="width:300px;" inputId="logId" :readonly="true" v-model="log.logId"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name">用户名:</Label>
          <TextBox style="width:300px;" inputId="name" :readonly="true" v-model="log.userId"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="insertTime">创建时间:</Label>
          <TextBox style="width:300px;" inputId="insertTime" :readonly="true" v-model="log.insertTime"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="content">内容:</Label>
          <TextBox style="width:90%;height:200px" inputId="content" :readonly="true" :multiline="true" v-model="log.content"></TextBox>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'userlogList',
  props:['open','params'],
  data() {
    return {
      total:0,
      pageNumber:1,
      pageSize:10,
      data:[],
      selectedLogId:[],
      log:{}
    }
  },
  methods: {
    selectionChange(row){
      this.selectedLogId = [row.logId]
    },
    toSearch(){

    },
    details(row){
      this.log = row
      this.$refs.logDialog.open()
    },
    list(){
      utils.http.post('/manage/log/list', {example:{}, pageData:{pageNum:this.pageNumber, pageSize: this.pageSize}}).then(response => {
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