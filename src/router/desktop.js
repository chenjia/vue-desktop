export default [{
  name: 'desktop',
  path: 'desktop',
  meta: {
    login: false,
    hasFooter: false,
    hasTabs: true,
    keepAlive:true
  },
  component(r) {
    require.ensure([], () => r(require('../pages/desktop/Desktop.vue')), 'desktop')
  }
}]