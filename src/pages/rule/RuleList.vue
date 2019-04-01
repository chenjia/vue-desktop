<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toEditor()" iconCls="icon-add" :plain="true">新建</LinkButton>
      <LinkButton @click="remove()" iconCls="icon-remove" :plain="true">删除</LinkButton>
      <LinkButton @click="toEditor(1)" iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton @click="toTest()" iconCls="icon-bug" :plain="true">调试</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="ruleDataGrid"
      style="height:100%;"
      groupField="category"
      pagePosition="bottom"
      selectionMode="single"
      @selectionChange="selectionChange($event)"
      :data="data"
      :border="false">
      <GridColumn field="id" width="30">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedId" :multiple="true" :value="scope.row.id"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="name" title="规则名称"></GridColumn>
      <GridColumn field="category" title="分类"></GridColumn>
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
      :bodyStyle="{height:(screenHeight-40)+'px'}"
      :title="title"
      :modal="true"
      :resizable="true"
      @close="closeEditor()">
      
      <Form :model="form" class="form-flex" style="padding:30px;">
        <div class="flexable">
          <div class="flex-item">
            <Label for="name">规则名称:</Label>
            <TextBox v-model="form.name"></TextBox>
          </div>
          <div class="flex-item">
            <Label for="">所属分类:</Label>
            <ComboBox inputId="category" v-model="form.category" :data="categoryData"></ComboBox>
          </div>

          <div class="flex-item" style="width:100%;">
            <Label for="name">规则内容:</Label>
            <TextBox v-model="form.content" :multiline="true" style="width:100%;height:240px;"></TextBox>
          </div>
          <div class="flex-item" style="width:100%;">
            <Label for="name">入参:</Label>
            <TextBox  v-model="form.inputParams" :multiline="true" style="width:100%;height:40px;line-height:40px;"></TextBox>
          </div>
          <div class="flex-item" style="width:100%;">
            <Label for="name">出参:</Label>
            <TextBox  v-model="form.outputParams" :multiline="true" style="width:100%;height:40px;line-height:40px;"></TextBox>
          </div>
          <div class="flex-item" style="width:100%;">
            <Label for="name">描述:</Label>
            <TextBox  v-model="form.memo" :multiline="true" style="width:100%;height:120px;"></TextBox>
          </div>
        </div>
      </Form>

      <div class="dialog-button">
        <LinkButton @click="toTest()" iconCls="icon-bug" style="width:80px;">测试</LinkButton>
        <LinkButton @click="submitForm()" iconCls="icon-submit" style="width:80px;">保存</LinkButton>
      </div>
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
      data:[],
      selectedId:[],
      form:{
        name:'test',
        category:'rule',
        inputParams:'[]',
        outputParams:'',
        content:'package com.company.system.module\n'
      },
      toggle:{
        editor: false
      },
      category:{
        'system':'系统管理',
        'rule':'规则管理'
      },
      categoryData:[{
        value: 'system', text: '系统管理'
      },{
        value: 'rule', text: '规则管理' 
      }]
    }
  },
  methods: {
    selectionChange(row){
      this.selectedId = [row.id]
    },
    toEditor(flag){
      if(flag==1){
        if(this.selectedId.length == 0){
          alert('请选择要操作的记录！')
          return
        }
        this.title = '修改规则'
        utils.http.post('/workflow/rule/details', {id:this.selectedId[0]}).then(response => {
          this.form = response.data.body.data
        }, error => {
          console.log(error)
        })
      }else{
        this.title = '新增规则'
      }
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

      let _this = this

      this.$messager.confirm({
        title: "确认删除",
        msg: "确定要删除此记录吗?",
        result(r){
          if(r) {
            utils.http.post('/workflow/rule/delete', {id:_this.selectedId[0]}).then(response => {
              _this.selectedId = []
              _this.list()
            }, error => {
              console.log(error)
            })
          }
        }
      });
    },
    toTest(){
      let rule = Object.assign({}, this.form)
      delete rule.insertTime
      delete rule.updateTime
      utils.http.post('/workflow/rule/test', {rule:rule, params:eval('('+this.form.inputParams+')')}).then(response => {
        this.form.outputParams = JSON.stringify(response.data.body.data)
      }, error => {
        console.log(error)
      })
    },
    toSearch(){

    },
    list(){
      utils.http.post('/workflow/rule/list', {example:{}}).then(response => {
        this.data = response.data.body.data
      }, error => {

      })
    },
    pageChange(){
      this.list()
    },
    submitForm(){
      let _this = this
      let rule = Object.assign({}, this.form)
      delete rule.insertTime
      delete rule.updateTime
      utils.http.post('/workflow/rule/save', {rule:rule, params:[{name:'chenjia'}]}).then(response => {
        this.$messager.alert({
          title: '成功',
          icon:'info',
          msg: '规则添加成功!',
          result(){
            _this.form = {}
            _this.closeEditor()
            _this.list()
          }
        });
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