<template>
  <div ref="fullScreen" style="position:absolute;" :style="{width:width+'px', height:(width*screenHeight/screenWidth)+'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fullScreen',
  components: {
    
  },
  data() {
    return {
      width: 1920
    }
  },
  methods: {
    
  },
  watch:{
    
  },
  mounted(){
    const scaleX = this.screenWidth/this.width
    const scaleY = this.screenHeight/(this.width*this.screenHeight/this.screenWidth)
    const fullScreen = this.$refs.fullScreen
    if (fullScreen.style) {
      fullScreen.style.transform = `scale(${scaleX}, ${scaleY})`
      fullScreen.style.transformOrigin = '0 0'
    }
  }
}
</script>
<style type="text/css">
html {
  font-size: 625%;
}
</style>