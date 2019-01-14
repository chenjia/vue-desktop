import Vue from 'vue'

window.lazyLibsLoaded = true
require.ensure([], () => {
  window.lazyLibsLoaded = true
}, 'lazyLibs')