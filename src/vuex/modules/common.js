import cache from '../../utils/cache'
import Vue from 'vue'

const typeArrays = [
  'LOGIN',
  'LOGOUT',
  'TOGGLE_LOADING'
]

const types = {}

for (let type of typeArrays) {
  types[type] = type
}

const state = {
  app: {
    
  },
  ui: {
    loading: false,
    loadend: false
  },
  user: cache.get('user'),
  userSetting: cache.get('userSetting')
}

const getters = {
  isLoading() {
    return state.ui.loading
  }
}

const actions = {
  // toggleTab({
  //   commit,
  //   state
  // }, show) {
  //   commit(types.TOGGLE_TAB, show)
  // }
}

const mutations = {
  [types.LOGIN](state, data) {
    cache.set('user', data.user)
    cache.set('userSetting', data.userSetting)
    state.user = data.user
    state.userSetting = data.userSetting
  },
  [types.LOGOUT](state) {
    cache.clear()
    state.user = null
    state.userSetting = null
  },
  [types.TOGGLE_LOADING](state, flag) {
    if(flag){
      state.ui.loading = flag
      setTimeout(()=>{
        state.ui.loadend = flag
      },50)
    }else{
      state.ui.loadend = flag
      setTimeout(()=>{
        state.ui.loading = flag
      },1000)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}