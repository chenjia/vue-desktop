import Vue from 'vue'
import cache from '../../utils/cache'
import {desktopMenus, contextMenus, startMenus, handlers} from '../../pages/desktop/config.js'

const typeArrays = [
  'LOGIN',
  'LOGOUT',
  'TOGGLE_LOADING',
  'TOGGLE_ERROR',
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
    lock:true,
    error:{
      show:false,
      msg:''
    }
  },
  page:{
    active: null
  },
  desktop:{
    startDialog:{
      closed:true,
      startMenus:startMenus,
      handlers:handlers
    },
    desktopMenus:desktopMenus,
    contextMenus:contextMenus,
    taskbar:{
      date:'',
      time:'',
      week:'',
      tasks:{},
      currentTask:null,
      showCalendar:false
    }
  },
  user: cache.get('user'),
  userSetting: cache.get('userSetting')
}

const getters = {
  user(){
    return state.user
  },
  isLoading() {
    return state.ui.loading
  },
  desktopMenus(){
    return state.desktop.desktopMenus
  },
  contextMenus(){
    return state.desktop.contextMenus
  },
  taskbar(){
    return state.desktop.taskbar
  },
  startDialog(){
    return state.desktop.startDialog
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
    const rememberUser = cache.get('rememberUser')

    cache.clear()
    state.user = {}
    state.userSetting = {}

    if(rememberUser){
      cache.set('rememberUser', rememberUser)
    }
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
  },
  [types.TOGGLE_ERROR](state, error) {
    state.ui.error = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}