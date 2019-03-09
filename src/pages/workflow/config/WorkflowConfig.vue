<template>
  <DataGrid :data="config" @editEnd="edit" groupField="group" :clickToEdit="true" selectionMode="cell" editMode="cell" :border="false">
    <template slot="group" slot-scope="scope" >
      <span style="font-weight:bold;">
        {{scope.value}}
      </span>
    </template>
    <GridColumn field="label" title="属性" width="100"></GridColumn>
    <GridColumn field="value" title="值" :editable="true">
      <template  slot="edit" slot-scope="scope">
        <SwitchButton v-if="scope.row.code == 'status'" v-model="status" style="max-width:70px" onText="启用" offText="禁用"></SwitchButton>
        <TextBox v-else v-model="scope.row.value"></TextBox>
      </template>
      <template slot="body" slot-scope="scope">
        <SwitchButton v-if="scope.row.code == 'status'" v-model="status" style="max-width:70px" onText="启用" offText="禁用"></SwitchButton>
        <TextBox v-else v-model="scope.row.value"></TextBox>
      </template>
    </GridColumn>
  </DataGrid>
</template>

<script>
export default {
  name: 'workflowConfig',
  props: ['attributes', 'update'],
  data() {
    return {
      status: true
    }
  },
  computed:{
    config(){
      return [{
        group:'基本配置',
        label:'流程名称',
        code:'label',
        value:this.attributes.label
      },{
        group:'基本配置',
        label:'流程key',
        code:'workflowKey',
        value:this.attributes.workflowKey
      },{
        group:'权限配置',
        label:'权限配置',
        code:'starter',
        value:''
      },{
        group:'权限配置',
        label:'状态',
        code: 'status',
        value: 1
      }]
    }
  },
  methods: {
    edit(data){
      this.update(data.row.code, data.row.value)
    }
  },
  watch:{
    status(newVal){
      this.update('status', newVal?1:0)
    }
  },
  mounted(){

  }
}
</script>