<template>
  <div>
    <div>panel</div>
    <draggable tag="div" :list="item.children" :group="{name:'column'}"  :style="{minHeihgt:(50+level)+'px'}">
        <div
        v-for="sub in item.children" :key="sub.name" 
        @click.stop="$store.state.common.page.active = sub"
        class="box-body pd-md" 
        :class="{'active': $store.state.common.page.active == sub}"
        :style="{border:level>0?'1px dashed #888':''}" 
        >
        <component :is="sub.component" :item="sub" :level="level+1"></component>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'LxtPanel',
  props:{
    item:{
      type:Object
    },
    level: {
      type: Number,
      default: 0
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