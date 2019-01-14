export default [{
  name: 'login',
  path: '/login',
  meta: {
    login: false,
    hasFooter: true,
    keepAlive:true
  },
  component(r){
    require.ensure([], () => r(require('../pages/login/Login.vue')), 'login')
    setTimeout(()=>{
      require(['../pages/desktop/Desktop.vue'])
    }, Config.preload)
  }
}]