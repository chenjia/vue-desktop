<template>
  <Tabs @tabSelect="tabSelect" style="width:100%;min-height:250px;" :border="false">
    <TabPanel :title="'用户管理'">
      <UserList :open="open" v-if="toggle.userList"></UserList>
    </TabPanel>
    <TabPanel :title="'角色管理'">
      <RoleList :open="open" v-if="toggle.roleList"></RoleList>
    </TabPanel>
    <TabPanel :title="'菜单管理'">
      <MenuList :open="open" v-if="toggle.menuList"></MenuList>
    </TabPanel>
  </Tabs>
</template>

<script>
import UserList from './UserList'
import RoleList from './RoleList'
import MenuList from './MenuList'

export default {
  name: 'Permission',
  props:['open'],
  components:{
    UserList,
    RoleList,
    MenuList
  },
  data() {
    return {
      toggle:{
        userList: true,
        roleList: false,
        menuList: false
      }
    }
  },
  methods: {
    tabSelect(panel){
      if(panel.title == '角色管理'){
        this.toggle.roleList = true
      }else if(panel.title == '菜单管理'){
        this.toggle.menuList = true
      }
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>