<template>
  <div class="flex">
    <div class="flex-column" v-for="(column,index) in columns" :key="index">
      <draggable tag="div" :list="item.children" :group="{name:'column'}" :style="{minHeight:(50+level)+'px'}">
        <div
        v-for="sub in item.children" :key="sub.name" 
        @click.stop="$store.state.common.page.active = sub"
        class="box-body pd-md" 
        :class="{'active': $store.state.common.page.active == sub}"
        :style="{border:level>0?'1px dashed #888':''}">
          <component :is="sub.component" :item="sub" :level="level+1"></component>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'LxtFlex',
  props:{
    item:{
      required:true,
      type:Object
    },
    level: {
      type: Number,
      default: 0
    },
    columns:{
      type:Array,
      default(){
        return [12, 12]
      }
    }
  },
  components:{
    draggable
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