import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo: {
      avatar: '',
      username: ''
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
        setItem: key => sessionStorage.setItem(key),
        getItem: (key,value) => sessionStorage.getItem(key,value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store