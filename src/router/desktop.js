export default [{
  name: 'desktop',
  path: 'desktop',
  meta: {
  },
  component(r) {
    require.ensure([], () => r(require('../pages/desktop/Desktop.vue')), 'desktop')
  }
},{
  name: 'home',
  path: 'home',
  meta: {
  },
  component(r) {
    require.ensure([], () => r(require('../pages/desktop/Home.vue')), 'home')
  }
}]