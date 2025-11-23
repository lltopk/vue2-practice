<template>
  <div v-if="visibleProp">
    <!-- 当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会比较棘手：
    假设这里的 count 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，v-model 会试图直接修改 count。
    在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。 -->
    <!-- <input v-model="count"> -->

    <!-- 用“Vuex 的思维”去解决这个问题的方法是：将v-model拆开,  分别给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用一个方法: -->
    <!-- <input :value="count" @input="updateCount($event)"> -->

    <!-- 另一个最优雅的方法是方法是使用带有 setter 的双向绑定计算属性：自定义计算属性的getter和setter方式 -->
    <input v-model="count">
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'VuexStore',
  components: {

  },
  props: {
    visibleProp: Boolean
  },
  created(){
    console.log("this.$globalVar:",this.$globalVar);
    console.log("this.$store:",this.$store);
    //...mapState
    console.log("this.count before",this.count);//count == 1, will be add to 6
    this.$store.commit('single_store/increment');
    this.increment();
    this.incrementWithPayload({amount:2});
    this.add();
    console.log("this.count after",this.count);
    //...mapActions
    this.$store.dispatch('single_store/incrementAsync');//count == 6, will be add to 11
    this.incrementAsync();
    this.incrementAsyncWithPayload({amount:2});
    this.addAsync();
    console.log("this.count after",this.count);
    //...mapGetters
    console.log("this.doneTodos:",this.doneTodos);  
    console.log("this.doneTodosCount:",this.doneTodosCount);
    console.log("this.getTodoById(2):",this.getTodoById(2));
  },
  async mounted(){
    //test action promise await
    this.$store.dispatch('products/initProducts');
    console.log("mounted products store module state#all:",this.$store.state.products.all);
    console.log("mounted products store module getters#getAllProducts:",this.getAllProducts);
    this.$store.commit('products/decrementProductInventory',{id: 1});
    console.log("mounted products store module getters#getAllProducts:",this.getAllProducts);

    //test action promise resloveV
    let resloveV = await this.$store.dispatch('single_store/incrementByPromiseA',{amount:1});
    console.log('resloveV',resloveV)
  },
  computed:{
    localComputed () { 
      return 0;
    },
    // 使用 Vuex 的 mapState 辅助函数
    // ...mapState('single_store',{
    //   //这里每一个计算属性都由一个函数定义: s => s.count,  
    //   // 最终vue框架会将该函数视为回调函数, 并将当前store(single_store)的state给到回调函数的参数s触发回调
    //   count: s => s.count,
    // }),
   //计算属性的名称与 state 的子节点名称(count)相同时，可以简写为数组形式
    // ...mapState('single_store',['count']),
    count:{
      get () {
        return this.$store.state.single_store.count
      },
      set (value) {
        this.$store.commit('single_store/updateCount', value)
      }
    },
    // 使用 Vuex 的 mapGetters 辅助函数
    ...mapGetters('single_store',{
      doneTodos:'doneTodos',//该属性是个对象
      doneTodosCount:'doneTodosCount',//该属性是个值
      getTodoById:'getTodoById'//该属性是个函数
    }),
    // 也可以使用数组形式
    ...mapGetters('single_store',[
      'doneTodos',
      'doneTodosCount',
      'getTodoById'
    ]),
    // 也可以使用数组形式
    ...mapGetters('products',[
      'getAllProducts',
    ]),
  },
  watch:{
    count(newVal, oldVal) {
      console.log(`watch count changed from ${oldVal} to ${newVal}`);
    },
  },

  data() {
    return {

    }
  },
  methods: {
    //使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
    ...mapMutations('single_store',[
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementWithPayload' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', {amount:2})`
    ]),
    ...mapMutations('single_store',{
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    //在组件中使用 this.$store.dispatch('xxx') 分发 action，
    // 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
    ...mapActions('single_store',[
      'incrementAsync', // 将 `this.incrementAsync()` 映射为 `this.$store.dispatch('incrementAsync')`

      // `mapActions` 也支持载荷：
      'incrementAsyncWithPayload' // 将 `this.incrementAsyncWithPayload(amount)` 映射为 `this.$store.dispatch('incrementAsyncWithPayload', amount)`
    ]),
    ...mapActions('single_store',{
      addAsync: 'incrementAsync' // 将 `this.add()` 映射为 `this.$store.dispatch('incrementAsync')`
    }),
    //input原生标签接收的是原生DOM事件
    //- `event.target`：触发事件的 DOM 元素（这里是 `<input>`）
    // - `event.target.value`：输入框的当前值
    updateCount(event){
      this.$store.commit('single_store/updateCount', event.target.value)
    }
  }
}
</script>

<style>

</style>
