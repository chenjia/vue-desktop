<template>
  <div class="box-datagrid">
    <div class="dialog-toolbar">
      <LinkButton @click="toEditor()" iconCls="icon-add" :plain="true">新建</LinkButton>
      <!-- <LinkButton @click="remove()" iconCls="icon-remove" :plain="true">删除</LinkButton> -->
      <LinkButton @click="toEditor(1)" iconCls="icon-edit" :plain="true">修改</LinkButton>
      <LinkButton @click="changeStatus(1)" iconCls="icon-yes" :plain="true">启用</LinkButton>
      <LinkButton @click="changeStatus(0)" iconCls="icon-no" :plain="true">禁用</LinkButton>
      <LinkButton @click="start()" iconCls="icon-share" :plain="true">授权</LinkButton>
      <LinkButton @click="toSearch()" iconCls="icon-search" :plain="true" style="float:right;">搜索</LinkButton>
    </div>
    <DataGrid
      ref="userDataGrid"
      style="height:100%;"
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
      <GridColumn field="userId" width="30">
        <template slot="body" slot-scope="scope">
          <CheckBox v-model="selectedId" :multiple="true" :value="scope.row.userId"></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="username" title="用户名"></GridColumn>
      <GridColumn field="realname" title="姓名"></GridColumn>
      <GridColumn field="orgName" title="所在机构"></GridColumn>
      <GridColumn field="deptName" title="所在部门"></GridColumn>
      <GridColumn field="status" title="状态"></GridColumn>
      <GridColumn field="mobile" title="电话"></GridColumn>
      <GridColumn field="email" title="邮箱"></GridColumn>
      <GridColumn field="pwdStatus" title="密码状态"></GridColumn>
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
    </DataGrid>

    <Dialog
      v-if="editor.visible"
      ref="userEditor"
      :dialogStyle="{width: dialogWidth+'px', height: dialogHeight+'px'}"
      :title="editor.title"
      :modal="true"
      :resizable="true"
      @close="closeEditor()">

      <UserEditor />
    </Dialog>
  </div>
</template>

<script>
import UserEditor from './UserEditor'

export default {
  name: 'UserList',
  props:['open','params'],
  components:{
    UserEditor
  },
  data() {
    return {
      total:0,
      pageNumber:1,
      pageSize:10,
      data:[],
      selectedId:[],
      editor:{
        visible: false,
        title:''
      }
    }
  },
  methods: {
    selectionChange(row){
      this.selectedId = [row.userId]
    },
    toEditor(flag){
      if(flag==1){
        if(this.selectedId.length == 0){
          alert('请选择要操作的记录！')
          return
        }
        this.open({
          name:'userEditor',
          text:'修改用户',
          icon:'./static/img/icon32/user_edit.png'
        },{
          userId:this.selectedId[0]
        })
      }else{
        this.editor.visible = true
        this.editor.title = '新增用户'

      }
    },
    closeEditor(){
      this.$refs.userEditor.close()
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
            utils.http.post('/manage/user/delete', {pid:_this.selectedId[0]}).then(response => {
              _this.selectedId = []
              _this.list()
            }, error => {
              console.log(error)
            })
          }
        }
      })
    },
    changeStatus(status){
      if(this.selectedId.length == 0){
        alert('请选择要操作的记录！')
        return
      }
       
      utils.http.post('/manage/user/status', {userId:this.selectedId[0], status:status}).then(response => {
        this.list()
      }, error => {
        console.log(error)
      })
    },
    toSearch(){

    },
    list(){
      utils.http.post('/manage/user/list', {example:{}, pageData:{pageNum:this.pageNumber, pageSize: this.pageSize}}).then(response => {
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
    // utils.http.post('/manage/user/grant', {userId:'admin', roleIds:['1']}).then(response => {
      
    // }, error => {

    // })
  }
}
</script>