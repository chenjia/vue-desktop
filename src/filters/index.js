import Vue from 'vue'

Vue.filter('date', function (value) {
  return value.substr(0,19).replace('T',' ')
})