import shop from '@/api/shop'

// const moduleA = {
//   state: () => ({ ... }),
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {
  getAllProducts (state) {
    return state.all
  }
}

// actions 这里调用了mutations#setAllProducts
const actions = {
  //actions是异步的, 这里的shop接口是个setTimeout异步请求
  // initProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit('setProducts', products)
  //   })
  // },

  // 解法1: store层返回 Promise，方便调用方通过await或者then等待数据加载完成
  // initProducts ({ commit }) {
  //   return new Promise(resolve => {
  //     shop.getProducts1(products => {
  //       commit('setAllProducts', products)
  //       resolve(products)
  //     })
  //   })
  // },
  //解法2: shop.api层返回promise, 然后store层使用async/await语法
  async initProducts ({ commit }) {
    commit('setAllProducts', await shop.getProducts2())
  },
}

// mutations
const mutations = {
  setAllProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    // const product = state.all.find(product => product.id === id)
    const idx = state.all.findIndex(p => p.id === id)
    if (idx === -1) return
    const product = state.all[idx]
    if (product.inventory > 0) {
      const updatedV = { ...product, inventory: product.inventory - 1 }
      // 用 splice 替换数组项，确保响应式更新
      state.all.splice(idx, 1, updatedV)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
