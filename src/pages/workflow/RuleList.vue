<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toEditor()" iconCls="icon-add" :plain="true">新建</LinkButton>
      <LinkButton @click="remove()" iconCls="icon-remove" :plain="true">删除</LinkButton>
      <LinkButton @click="toEditor(1)" iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="ruleDataGrid"
      style="height:100%;"
      groupField="ruleCategory"
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
      <GridColumn field="ruleId" width="30">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedId" :multiple="true" :value="scope.row.ruleId"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="name" title="规则名称"></GridColumn>
      <GridColumn field="regex" title="正则表达式" width="250"></GridColumn>
      <GridColumn field="memo" title="备注"></GridColumn>
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
          {{category[scope.value]}} - <span style="color:red">{{scope.rows.length}}</span> Item(s)
        </span>
      </template>
    </DataGrid>

    <Dialog
      v-if="toggle.editor"
      ref="ruleEditor"
      :bodyStyle="{padding:'50px'}"
      :title="title"
      :modal="true"
      :resizable="true"
      @close="closeEditor()">
      
      <Form :model="form" class="form-flex">
        <div style="margin-bottom:20px">
          <Label for="name">规则名称:</Label>
          <TextBox inputId="name" v-model="form.name"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name">所属分类:</Label>
          <TextBox inputId="name" v-model="form.ruleCategory"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name">正则表达式:</Label>
          <TextBox inputId="name" v-model="form.regex"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name">描述:</Label>
          <TextBox inputId="name" v-model="form.memo"></TextBox>
        </div>
        <div style="margin-top:20px;text-align:center;">
          <LinkButton :disabled="false" @click="submitForm()" style="width:80px;">提交</LinkButton>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'RuleList',
  props:['open','params'],
  data() {
    return {
      title:'',
      total:0,
      pageNumber:1,
      pageSize:10,
      data:[],
      selectedId:[],
      form:{},
      toggle:{
        editor: false
      },
      category:{
        C:'字符',
        S:'场景',
        N:'数字'
      }
    }
  },
  methods: {
    selectionChange(row){
      this.selectedId = [row.ruleId]
    },
    toEditor(flag){
      if(flag==1){
        if(this.selectedId.length == 0){
          alert('请选择要操作的记录！')
          return
        }
      }
      this.title = (flag == 1?'修改规则':'新增规则')
      this.toggle.editor = true
      if(this.$refs.ruleEditor){
        this.$refs.ruleEditor.open()
      }
    },
    closeEditor(){
      this.$refs.ruleEditor.close()
    },
    remove(){
      if(this.selectedId.length == 0){
        alert('请选择要操作的记录！')
        return
      }

      this.$messager.confirm({
        title: "确认删除",
        msg: "确定要删除此记录吗?",
        result(r){
          if(r) {
            utils.http.post('/manage/user/delete', {pid:this.selectedId[0]}).then(response => {
              this.list()
            }, error => {
              console.log(error)
            })
          }
        }
      });
    },
    toSearch(){

    },
    list(){
      utils.http.post('/workflow/rule/list', {example:{}, pageData:{pageNum:this.pageNumber, pageSize: this.pageSize}}).then(response => {
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