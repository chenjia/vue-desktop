<template>
  <div style="width:100%;display:flex;flex-direction: column;">
    <div class="dialog-toolbar">
      <TextBox inputId="url" placeholder="请输入url" v-model="url" @blur="goUrl()" :inputStyle="{borderRadius:0}" style="width:100%;padding:0;border:none;background:none;box-shadow: none;">
        <Addon align="left" class="center">
          <LinkButton :disabled="true" :plain="true">地址：</LinkButton>
        </Addon>
        <Addon align="right">
          <LinkButton iconCls="fa fa-fw fa-search" :disabled="true" :plain="true"></LinkButton>
        </Addon>
      </TextBox>
    </div>
    
    <iframe :src="formatUrl" style="flex:1 0 auto;border:none;"></iframe>
  </div>
</template>

<script>
export default {
  name: 'browser',
  data() {
    return {
      url:'',
      formatUrl:''
    }
  },
  computed:{
    
  },
  methods: {
    goUrl(){
      let url = ''+this.url
      if(url && url.substr(0,4)!='http'){
        url = 'http://'+url
      }
      this.formatUrl = url
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>