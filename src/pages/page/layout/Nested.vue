<template>
  <draggable tag="div" :list="children" :group="{name:'column'}"  :style="{minHeihgt:(50+level)+'px'}">
    <div
    v-for="sub in children" :key="sub.name" 
    @click.stop="$store.state.common.page.active = sub"
    class="box-body pd-md" 
    :class="{'active': $store.state.common.page.active == sub}"
    :style="{border:level>0?'1px dashed #888':''}" 
    >
      <component :is="sub.component" :item="sub" :level="level+1"></component>
      <Nested :children="sub.children" :level="level+1"/>
    </div>
  </draggable>
</template>
<script>
import store from '../../../vuex/store'
import draggable from 'vuedraggable'
import LxtPanel from './LxtPanel'
import LxtFlex from './LxtFlex'

export default {
  name:'Nested',
  components: {
    draggable,
    LxtPanel,
    LxtFlex
  },
  props: {
    children: {
      required: true,
      type: Array
    },
    level: {
      type: Number,
      default: 0
    }
  },
  methods:{
    mouseover(el){
      this.$store.state.common.page.hover = el
    }
  }
};
</script>
<style scoped>
.box-body{
  min-height: 50px;
  padding-left:5px;
  padding-top:10px;
  padding-bottom:10px;
}
.box-body.active{
  padding-left:5px!important;
  border-left:5px solid #409eff!important;
  background: #b3d8ff!important;
}
.box-body:hover{
  padding-left:0;
  border-left:5px solid #ecf5ff;
  background:#ecf5ff;
}
.sortable-chosen{
  padding-top:9px;
  padding-bottom:9px;
  border-top:1px dashed #409eff;
  border-bottom:1px dashed #409eff;
}
</style>