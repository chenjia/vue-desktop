export default [{
  name: 'desktop',
  path: 'desktop',
  meta: {
    keepAlive:true
  },
  component(r) {
    require.ensure([], () => r(require('../pages/desktop/Desktop.vue')), 'desktop')
  }
},{
  name: 'home',
  path: 'home',
  meta: {
    keepAlive:true
  },
  component(r) {
    require.ensure([], () => r(require('../pages/desktop/Home.vue')), 'home')
  }
}]