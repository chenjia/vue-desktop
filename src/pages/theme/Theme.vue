<template>
  <div class="pd-lg" style="width:100%;">
    <fieldset>
      <legend>背景色</legend>
      <ul v-for="i in backgrounds.length/5" style="padding-left:0;list-style:none;width:100%;display:flex;justify-content: space-around;align-items: flex-start;">
        <li v-if="index >= (i-1)*5 && index < i*5" v-for="(item, index) in backgrounds" style="text-align:center;">
          <img @click="changeBg(item.text)" :src="'./static/img/desktop/'+item.text" style="width:100px;height:60px;flex:1 1 auto;" :style="{opacity:($store.state.common.ui.bg==item.text?1:.5)}">
          <LinkButton @click="changeBg(item.text)" iconCls="icon-color" :style="{opacity:($store.state.common.ui.bg==item.text?1:.5)}">背景-{{index+1}}</LinkButton>
        </li>
      </ul>
    </fieldset>
    
    <fieldset style="margin-top:20px;">
      <legend>皮肤</legend>
      <ul v-for="i in (themes.length%5==0?themes.length/5:parseInt(themes.length/5)+1)" style="padding-left:0;list-style:none;width:100%;display:flex;justify-content: space-around;align-items: flex-start;">
        <li v-if="index >= (i-1)*5 && index < i*5" v-for="(item, index) in themes" style="text-align:center;">
          <LinkButton @click="changeTheme(item.text)" iconCls="icon-color" style="width:120px;" :style="{opacity:($store.state.common.ui.theme==item.text?1:.5)}">{{item.text}}</LinkButton>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script>
import {contextMenus} from '../desktop/json.js'
import store from '../../vuex/store'

export default {
  name: 'Theme',
  data(){
    return {
      themes:contextMenus[0].children,
      backgrounds:contextMenus[1].children
    }
  },
  methods:{
    changeBg(bg){
      store.commit('BG', bg)
    },
    changeTheme(theme){
      store.commit('THEME', theme)
    }
  },
  watch:{
    
  },
  mounted(){
    console.log(this.themes)
  }
}
</script>