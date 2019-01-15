<template>
  <Login v-if="component=='login'" />
  <Home v-else-if="component=='home'" />
</template>

<script>
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
export default {
  name: 'Dynamic',
  props:['component'],
  components:{
    Login,
    Home
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