<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toEditor()" iconCls="icon-add" :plain="true">新建</LinkButton>
      <LinkButton @click="remove()" iconCls="icon-remove" :plain="true">删除</LinkButton>
      <LinkButton @click="toEditor(1)" iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>

    <DataGrid
      ref="pageDataGrid"
      style="height:100%;"
      groupField="category"
      pagePosition="bottom"
      selectionMode="single"
      @selectionChange="selectionChange($event)"
      :data="data"
      :border="false">
      <GridColumn field="category" width="30">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedId" :multiple="true" :value="scope.row.processId"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="name" title="页面名称"></GridColumn>
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
  name: 'PageList',
  props:['open','params'],
  data() {
    return {
      data:[],
      selectedId:[]
    }
  },
  methods: {
    selectionChange(row){
      this.selectedId = [row.id]
    },
    toEditor(flag){
      let id = null
      if(flag == 1){
        if(this.selectedId.length == 0){
          alert('请选择要操作的记录！')
          return
        }
        id = this.selectedId[0]
      }

      this.open({
        name:'pageEditor',
        text:'页面设计',
        icon:'./static/img/icon32/pageEditor_32.png'
      },{
        id:id
      })
    },
    remove(){
      if(this.selectedId.length == 0){
        alert('请选择要操作的记录！')
        return
      }
      
      let _this = this
      this.$messager.confirm({
        title: "确认删除",
        msg: "确定要删除此记录吗?",
        result(r){
          if(r) {
            utils.http.post('/workflow/page/delete', {pid:_this.selectedId[0]}).then(response => {
              _this.selectedId = []
              _this.list()
            }, error => {
              console.log(error)
            })
          }
        }
      })
      
    },
    toSearch(){

    },
    list(){
      utils.http.post('/workflow/page/list', {example:{}, pageData:{pageNum:this.pageNumber, pageSize: this.pageSize}}).then(response => {
        this.data = response.data.body.data
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