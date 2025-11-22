// store.js
import { getData } from '@/api/single_store_api'

const state=() => ({
  count: 0,
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false }
  ]
});

const getters={
  //自定义getters函数, 返回一个对象
  doneTodos: (state) => {
    return state.todos.filter(todo => todo.done)
  },
  //自定义getters函数, 支持接收第二个参数,getters本身
  // 返回一个值
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  },
  //自定义getters函数, 来实现给getTodoById传参
  //返回一个函数
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const mutations= {
  increment (state) {
    state.count += 1
  },    
  //支持载荷参数
  incrementWithPayload (state,payload) {
    state.count += payload.amount
  },    
}


const actions= {
  //Action 异步提交函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  incrementContext (context) {
      setTimeout(() => {
          context.commit('increment')
      }, 1000)
  },
  // 实践中，我们会经常用到 ES2015 的 参数解构 (opens new window)来简化代码（特别是我们需要调用 commit 很多次的时候）：
  incrementAsync  ({ commit }) {
      //模拟业务耗时, 且不阻塞主线程, 1秒后最终提交一个mutation: increment
      setTimeout(() => {
          commit('increment')
      }, 1000)
  },
  incrementAsyncWithPayload  ({ commit },payload) {
      //模拟业务耗时, 且不阻塞主线程, 1秒后最终提交一个mutation: increment
      setTimeout(() => {
          commit('incrementWithPayload',payload)
          console.log('incrementAsyncWithPayload执行完成',payload)
      }, 1000)
      
  },
  //支持promise, 方便外部用户await阻塞等待获取结果, 适用于用户想要立马获取结果的场景
  // created(){await incrementByPromiseA(payload)}
  incrementByPromiseA  ({ commit ,state},payload) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              commit('incrementWithPayload',payload)
              resolve(state.count)
              console.log('incrementByPromiseA 执行完成',payload)
          }, 1000)
      })
  },
  //promise可以组合
  incrementByPromiseB  ({ dispatch,commit },payload) {
      return dispatch('incrementByPromiseA',payload).then(()=>{
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  commit('incrementWithPayload',payload)
                  resolve()
                  console.log('incrementByPromiseB执行完成',payload)
              }, 1000)
          })
      })
  },
  //支持async语法, 能够将promise类型(action)actionToSync强制转换为同步的
  // 场景1. 通过await阻塞其他action, 等待其他的action执行完成
  // 场景2. 通过await阻塞commit的payload(需要提前把payload构造成promise)
  async actionToSync ({ commit ,dispatch}) {
      await dispatch('incrementByPromiseA',await getData());
      commit('incrementWithPayload', await getData())
  },
}


//提交vuex的mutations
//载荷: {amount: 1}
// store.commit('increment',{amount: 1})
//提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
// store.commit({type: 'increment' ,amount: 1})
// store.commit('increment')
// console.log(store.state.count) // -> 1

//Action 通过 store.dispatch 方法触发：
// store.dispatch('incrementAsync')
// console.log(store.state.count) // 由于是异步, 1秒后才修改,  因此一开始这里还是-> 0
// store.dispatch('incrementAsyncWithPayload',{amount: 1})
// console.log(store.state.count) // 由于是异步, 1秒后才修改,  因此一开始这里还是-> 0
// store.dispatch('incrementByPromiseB',{amount:1,promise:true}).then(()=>{console.log('incrementByPromiseB执行完成')})
// store.dispatch('actionToSync')
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
