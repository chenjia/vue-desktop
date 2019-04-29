<template>
  <Dialog
    title="正在更新版本"
    ref="updateDialog"
    :dialogStyle="{width:'480px',height:'130px'}"
    :modal="true"
    :closable="false"
    :draggable="false"
    :resizable="false">

    <div class="center" style="padding:0 20px 10px;">
      <p>下载进度：{{downloadPercent}}%</p>
      <ProgressBar :value="downloadPercent"></ProgressBar>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: "update",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    downloadPercent:{
      type: Number,
      required: true,
      default: 0
    }
  },
  watch:{
    downloadPercent(val){
      if(val == 100){
        this.$refs.updateDialog.close()
      }
    }
  }
}
</script>