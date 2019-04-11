<template>
  <DataGrid :data="config" @editEnd="edit" groupField="group" :clickToEdit="true" selectionMode="cell" editMode="cell" :border="false">
    <template slot="group" slot-scope="scope" >
      <span style="font-weight:bold;">
        {{scope.value}}
      </span>
    </template>
    <GridColumn field="label" title="属性" width="100"></GridColumn>
    <GridColumn field="value" title="值" :editable="true"></GridColumn>
  </DataGrid>
</template>

<script>
export default {
  name: 'startConfig',
  props: ['attributes', 'update'],
  data() {
    return {
      
    }
  },
  computed:{
    config(){
      return [{
        group:'基本配置',
        label:'节点名称',
        code:'label',
        value:this.attributes.label
      }]
    }
  },
  methods: {
    edit(data){
      this.update(data.row.code, data.row.value)
    }
  },
  watch:{
    
  },
  mounted(){

  }
}
</script>