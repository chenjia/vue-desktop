<template>
  <Layout style="position:absolute;width:100%;height:100%;">
    <LayoutPanel region="north" style="height:72px;overflow: hidden;">
      <table style="width:100%;padding-top:0px;" cellpadding="0" cellspacing="0" border="0" class="panel-header">
        <tr>
          <td rowspan="2" align="center">
            <div style="width:62px;height:60px;background:url('../../../static/img/logo.png')">
            </div>
          </td>
          <td>
            当前用户：{{user.userId}}
          </td>
          <td align="right">
            <table>
              <tr>
                <td>
                  <LinkButton :plain="true" iconCls="icon-home">首页</LinkButton>
                </td>
                <td>
                  <span class="datagrid-btn-separator"></span>
                </td>
                <td>
                  <LinkButton :plain="true" iconCls="icon-portal">门户</LinkButton>
                </td>
                <td>
                  <span class="datagrid-btn-separator"></span>
                </td>
                <td>
                  <LinkButton :plain="true" iconCls="icon-message">消息</LinkButton>
                </td>
                <td>
                  <span class="datagrid-btn-separator"></span>
                </td>
                <td>
                  <LinkButton :plain="true" iconCls="icon-config">设置</LinkButton>
                </td>
                <td>
                  <span class="datagrid-btn-separator"></span>
                </td>
                <td>
                  <LinkButton :plain="true" iconCls="icon-help">帮助</LinkButton>
                </td>
                <td>
                  <span class="datagrid-btn-separator"></span>
                </td>
                <td>
                  <LinkButton :plain="true" iconCls="icon-logout">退出</LinkButton>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="right">
            <LinkButton @click="go('/page/desktop')" :plain="true" iconCls="icon-desktop">桌面模式</LinkButton>
          </td>
        </tr>
      </table>
    </LayoutPanel>

    <LayoutPanel region="west" title="导航栏" style="width:200px;">
      <Accordion style="height:100%;" :animate="true" :border="false">
        <AccordionPanel v-for="(item,index) in startDialog.startMenus" :key="item.name" :title="item.group" >
          <Tree :data="treeMenus(item.items)" @selectionChange="open($event)"></Tree>
        </AccordionPanel>
      </Accordion>
    </LayoutPanel>

    <LayoutPanel region="center" style="position:relative;height:100%;width:100%;">
      <Tabs ref="tabs" @tabClose="closeTab" :border="false">
        <TabPanel :ref="task.name+'Tab'" v-for="(task,index) in taskbar.tasks" :key="task.name" :menu="task" :title="task.text" :closable="true">
          <dynamic :component="task.name" :open="open" :close="close" :menu="task"/>
        </TabPanel>
      </Tabs>
    </LayoutPanel>
  </Layout>
</template>

<script>
import Vue from 'vue'
import Dynamic from '../../components/Dynamic'
import { mapGetters, mapMutations } from 'vuex'
import store from '../../vuex/store'

export default {
  name: 'home',
  components: {
    dynamic:Dynamic
  },
  data() {
    return {
      
    }
  },
  computed:{
    ...mapGetters([
      'user',
      'taskbar',
      'startDialog',
      'desktopMenus',
      'contextMenus'
    ])
  },
  methods: {
    ...mapMutations({
      lock:'LOCK',
      loading:'TOGGLE_LOADING'
    }),
    treeMenus(items){
      const menus = []

      for(let i of items){
        menus.push({
          id:i.name,
          name:i.name,
          text:i.text,
          icon:i.icon,
          iconCls:i.iconCls
        })
      }

      return menus
    },
    open(menu, params){
      if(this.taskbar.tasks[menu.name]){
        if(menu.name=='chatDialog'){
          menu.params = params
          this.$set(this.taskbar.tasks, menu.name, menu)
        }
      }else{
        menu.params = params
        this.$set(this.taskbar.tasks, menu.name, menu)
      }
      this.taskbar.currentTask = menu
      this.$nextTick(()=>{
        const tabs = this.$refs.tabs
        const index = tabs.getPanelIndex(this.$refs[menu.name+'Tab'][0])
        tabs.select(index)
      })
    },
    close(task){
      this.$nextTick(()=>{
        this.$delete(this.taskbar.tasks, task.name)
      })
    },
    closeTab(panel){
      this.close(panel.$attrs.menu)
    }
  },
  watch:{
    
  },
  mounted(){
    // this.initTime(new Date().getTime())
    // setInterval(()=>{
    //   this.initTime(new Date().getTime())
    // }, 60*1000)
  }
}
</script>
<style type="text/css">

</style>