import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'

Vue.prototype.$globalVar = 'globalVar';//原型链添加全局变量

Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

function ignore() {
    console.log(' --- IGNORE ---');
}

export { ignore };