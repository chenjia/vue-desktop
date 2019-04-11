<template>
  <form class="pd-lg" style="width:100%;">
    <div style="margin-bottom:20px">
      <Label for="name" align="top">意见或建议:</Label>
      <TextBox :multiline="true" v-model="form.description" style="width:100%;height:200px;"></TextBox>
    </div>
    <div style="margin-bottom:20px;text-align:right;">
      <LinkButton @click="submit()"  style="width:80px;">提 交</LinkButton>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Feedback',
  data(){
    return {
      form:{}
    }
  },
  methods:{
    submit(){
      if(this.form.description){
        utils.http.post('/manage/feedback/save', {feedback:{category:'bug', platform:'PC', content:this.form.description}}).then(response => {
          this.$messager.alert({
            title: "成功",
            icon: "info",
            msg: "意见或建议反馈成功!"
          });
        }, error => {
          console.log(error)
        })
      }else{
        this.$messager.alert({
          title: "警告",
          icon: "warning",
          msg: "意见或建议内容不能为空!"
        });
      }
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>