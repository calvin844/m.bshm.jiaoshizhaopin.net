import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    adminNewsList: []
  },
  mutations: {
    setAdminNewsList(state, payload) {
      state.adminNewsList = payload
    },
    addAdminNewsList(state, payload) {
      state.adminNewsList.push(...payload)
    },
    setAdminNewsListItem(state, payload) {
      const i = state.adminNewsList.find(item => item.id == payload)
      i.checked = !i.checked
    },
    setAdminNewsTop(state, payload) {
      const i = state.adminNewsList.find(item => item.id == payload)
      i.top = i.top == 1 ? 0 : 1
    },
    delAdminNews(state, payload) {
      const i = state.adminNewsList.find(item => item.id == payload)
      i.state = i.state == 1 ? 2 : 1
    }
  },
  actions: {
    getAdminNewsList(context, payload) {
      if (payload != "") {
        payload.map(item => item.checked = false)
      }
      context.commit('addAdminNewsList', payload)
    },
    getAdminNewsChecked(context, payload) {
      return context.state.adminNewsList.filter(item => item.checked)
    }
  },
  modules: {}
})
