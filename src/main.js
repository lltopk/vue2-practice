import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'

Vue.prototype.$globalVar = 'globalVar';//原型链添加全局变量
//Vue.prototype.$store = store //（不推荐）：在不传 store 时也可以手动设置 Vue.prototype.$store = store，但这不是 Vuex 官方推荐的注入方式。

//注册vuex插件
Vue.use(Vuex);
//注册elementui框架
Vue.use(ElementUI);

Vue.config.productionTip = false

//声明一个vuex的state管理仓库
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
//触发vuex的mutations
store.commit('increment')
console.log(store.state.count) // -> 1
new Vue({
  render: h => h(App),
  //为了在 Vue 组件中访问 this.$store property，你需要为 Vue 实例提供创建好的 store。
  //Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：
  store// 等价于store: store    ES6 对象的 property 简写 (用在对象某个 property 的 key 和被传入的变量同名时)
}).$mount('#app')

function ignore() {
    console.log(' --- IGNORE ---');
}

export { ignore };

