<template>
  <div id="app">
    <el-button type="primary" @click="openHelloWorld">Open HelloWorld</el-button>
    <el-button type="primary" @click="openScopeThis">Open ScopeThis</el-button>
    <el-button type="primary" @click="openElTable">Open ElTable</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App" :visibleProp="visibleHelloWorld"/>
    <ScopeThis :visibleProp = "visibleScopeThis"/>
    <ElTable :visibleProp = "visibleElTable"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScopeThis from '@/components/ScopeThis.vue'
import ElTable from '@/components/ElTable.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    ScopeThis,
    ElTable
  },
  data() {
    return {
      visibleHelloWorld: false,
      visibleScopeThis: false,
      visibleElTable: false
    }
  },
  methods: {
    openHelloWorld() {
      this.visibleHelloWorld = !this.visibleHelloWorld;
    },
    openScopeThis() {
      this.visibleScopeThis = !this.visibleScopeThis;
    },
    openElTable() {
      this.visibleElTable = !this.visibleElTable;
    },

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
