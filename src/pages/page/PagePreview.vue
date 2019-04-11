<template>
  <div>
    page preview
  </div>
</template>

<script>
import Nested from "./layout/Nested";
import LxtPanel from './layout/LxtPanel'
import LxtFlex from './layout/LxtFlex'

export default {
  name: 'PagePreview',
  components:{
    Nested,
    LxtPanel,
    LxtFlex
  },
  props:['id'],
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted(){
    
  }
}
</script>
<style type="text/css" scoped>

</style>