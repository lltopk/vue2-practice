import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import single_store from './modules/single_store'
import createLogger from '@/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//注册各个微模块store
export default new Vuex.Store({
  modules: {
    cart,
    products,
    single_store,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
