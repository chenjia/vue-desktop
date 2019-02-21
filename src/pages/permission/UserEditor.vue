<template>
  <Form :model="form" class="form-flex">
    <div style="margin-bottom:20px">
      <Label for="name">用户名:</Label>
      <TextBox inputId="name" v-model="form.username"></TextBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="email">初始密码:</Label>
      <TextBox inputId="email" v-model="form.email"></TextBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">选择角色:</Label>
      <ComboBox inputId="role" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">所在机构:</Label>
      <ComboBox inputId="orgId" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">所在部门:</Label>
      <ComboBox inputId="deptId" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">电话:</Label>
      <ComboBox inputId="mobile" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">QQ:</Label>
      <ComboBox inputId="qq" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-bottom:20px">
      <Label for="hero">邮箱:</Label>
      <ComboBox inputId="email" :data="heroes" v-model="form.hero"></ComboBox>
    </div>
    <div style="margin-top:20px;text-align:center;">
      <LinkButton :disabled="false" @click="submitForm()" style="width:80px;">提交</LinkButton>
    </div>
  </Form>
</template>

<script>
export default {
  name: 'UserEditor',
  props:['userId'],
  data() {
    return {
      form:{},
      heroes:[]
    }
  },
  methods: {
    submitForm(){

    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>

<style type="text/css" scoped>
.form-flex{
  position:absolute;
  padding:20px;
  width:100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.form-flex>div{
  width:40%;
  flex:0 1 40%;
}
</style>