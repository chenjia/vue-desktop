import Vue from 'vue'

Vue.filter('date', function (value) {
  if(value){
    return value.substr(0,19).replace('T',' ')
  }else{
    return ''
  }
})