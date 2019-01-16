<template>
  <Login v-if="component=='login'" />
  <Home v-else-if="component=='home'" />
  <Portal v-else-if="component=='portal'" />
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Portal from '../pages/portal/Portal.vue'
export default {
  name: 'Dynamic',
  props:['component'],
  components:{
    Login,
    Home,
    Portal
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