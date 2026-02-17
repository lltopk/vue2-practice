<template>
  <div id="app">
    <el-button type="primary" @click="openHelloWorld">Open HelloWorld</el-button>
    <el-button type="primary" @click="openScopeThis">Open ScopeThis</el-button>
    <el-button type="primary" @click="openElTable">Open ElTable</el-button>
    <el-button type="primary" @click="openElForm">Open ElForm</el-button>
    <el-button type="primary" @click="openVuex">Open Vuex</el-button>
    <el-button type="primary" @click="openUserSlot">Open UserSlot</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App" :visibleProp="visibleHelloWorld"/>
    <ScopeThis :visibleProp = "visibleScopeThis"/>
    <ElTable :visibleProp = "visibleElTable"/>
    <ElForm :visibleProp = "visibleElForm"/>
    <VuexStore :visibleProp = "visibleVuex"/>
    <UserSlot :visibleProp = "visibleUserSlot"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScopeThis from '@/components/ScopeThis.vue'
import ElTable from '@/components/ElTable.vue'
import ElForm from '@/components/ElForm.vue'
import VuexStore from '@/components/VuexStore.vue'
import UserSlot from '@/slot/UserSlot.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    ScopeThis,
    ElTable,
    ElForm,
    VuexStore,
    UserSlot
  },
  created(){

  },
  computed:{

  },
  watch:{

  },

  data() {
    return {
      visibleHelloWorld: false,
      visibleScopeThis: false,
      visibleElTable: false,
      visibleElForm: false,
      visibleVuex: false,
      visibleUserSlot: false,
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
    openElForm() {
      this.visibleElForm = !this.visibleElForm;
    },
    openVuex() {
      this.visibleVuex = !this.visibleVuex;
    },
    openUserSlot() {
      this.visibleUserSlot = !this.visibleUserSlot;
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
