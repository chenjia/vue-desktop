import cache from '../../utils/cache'
import Vue from 'vue'

const typeArrays = [
  'LOGIN',
  'LOGOUT',
  'TOGGLE_LOADING',
  'THEME',
  'BG',
  'LOCK'
]

const types = {}

for (let type of typeArrays) {
  types[type] = type
}

const state = {
  app: {
    
  },
  ui: {
    theme:'default',
    bg:'1.jpg',
    loading: false,
    loadend: false,
    lock:true
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
  [types.THEME](state, theme) {
    cache.set('theme', theme)
    state.ui.theme = theme
  },
  [types.LOCK](state, lock) {
    state.ui.lock = lock
  },
  [types.BG](state, bg) {
    cache.set('bg', bg)
    state.ui.bg = bg
  },
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