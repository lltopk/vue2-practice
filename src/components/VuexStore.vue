<template>
  <div>

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
    ...mapState('single_store',{
      count: state => state.count,
    }),
    //计算属性的名称与 state 的子节点名称(count)相同时，可以简写为数组形式
    ...mapState('single_store',['count']),
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
    })
  }
}
</script>

<style>

</style>
