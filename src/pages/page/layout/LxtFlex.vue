<template>
  <div class="flex">
    <div class="flex-column" v-for="(column,index) in columns" :key="index">
      <draggable tag="div" :list="el.children" :group="{name:'column'}" style="border:1px solid red;min-height:100px;">
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import LxtPanel from './LxtPanel'

export default {
  name: 'LxtFlex',
  props:{
    el:{
      required:true,
      type:Object
    },
    columns:{
      type:Array,
      default(){
        return [12, 12]
      }
    }
  },
  components:{
    LxtPanel
  },
  data(){
    return {
      
    }
  },
  methods:{
    
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css" scoped>
.flex{
  display: flex;
  width:100%;
}
.flex-column{
  position:relative;
  flex: 1 1 auto;
  min-height:50px;
  border:1px dashed #888;
}
</style>