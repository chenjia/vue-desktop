<template>
  <Dialog
    :title="'正在更新版本('+version+')'"
    ref="updateDialog"
    :dialogStyle="{width:'480px',height:(172+30*updateMessage.length)+'px'}"
    :modal="true"
    :closable="false"
    :draggable="false"
    :resizable="false">

    <ul style="list-style: none;padding-inline-start:20px;line-height:30px;">
      <li style="font-size:16px;">更新内容：<span v-if="!updateMessage || updateMessage.length == 0">这个人很懒，没有版本描述</span></li>
      <li v-for="(item, index) in updateMessage" :key="index">{{item}}</li>
    </ul>

    <div class="center" style="padding:0 20px 10px;">
      <p v-if="downloadPercent<100">下载进度：{{downloadPercent}}%</p>
      <p v-else>下载已完成正在安装，稍后会自动重新打开</p>
      <ProgressBar :value="downloadPercent"></ProgressBar>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: "update",
  props: {
    downloadPercent:{
      type: Number,
      required: true,
      default: 0
    },
    version:{
      type: String,
      required: true
    },
    updateMessage:{
      type: Array
    }
  }
}
</script>