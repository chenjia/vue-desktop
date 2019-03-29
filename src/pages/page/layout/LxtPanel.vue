<template>
  <div>
    <h3>panel</h3>
    <draggable tag="div" :list="el.children" :group="{name:'column'}">
      
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'LxtPanel',
  props:{
    el:{
      type:Object
    }
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