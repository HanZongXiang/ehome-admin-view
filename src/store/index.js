import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo: {
      avatar: '',
      username: '',
      id: '',
      nickname: ''
    }
  },
  actions: {},
  mutations: {
    CHANGE_userInfo(state,payload) {
      state.userInfo = payload
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        setItem: (key, value) => localStorage.setItem(key, value),
        getItem: key => localStorage.getItem(key),
        removeItem: key => localStorage.removeItem(key)
      }
    })
  ]
})

export default store