<template>
  <div id="app">
    <el-button type="primary" @click="openHelloWorld">Open HelloWorld</el-button>
    <el-button type="primary" @click="openScopeThis">Open ScopeThis</el-button>
    <el-button type="primary" @click="openElTable">Open ElTable</el-button>
    <el-button type="primary" @click="openElForm">Open ElForm</el-button>
    <el-button type="primary" @click="openElSelector">Open Selector</el-button>
    <el-button type="primary" @click="openElEnterableTable">Open EnterableTable</el-button>
    <el-button type="primary" @click="openVuex">Open Vuex</el-button>
    <el-button type="primary" @click="openUserSlot">Open UserSlot</el-button>
    <el-button type="primary" @click="openCbChain">Open CbChain</el-button>
    <el-button type="primary" @click="openEmit">Open Emit</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App" :visibleProp="visibleHelloWorld"/>
    <ScopeThis :visibleProp = "visibleScopeThis"/>
    <ElTable :visibleProp = "visibleElTable"/>
    <ElForm :visibleProp = "visibleElForm"/>
    <ElSelector :visibleProp = "visibleElSelector"/>
    <ElEnterableTable :visibleProp = "visibleElEnterableTable"/>
    <VuexStore :visibleProp = "visibleVuex"/>
    <UserSlot :visibleProp = "visibleUserSlot"/>
    <CbChain :visibleProp = "visibleCbChain"/>
    <Emit :visibleProp = "visibleEmit"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScopeThis from '@/components/ScopeThis.vue'
import ElTable from '@/components/ElTable.vue'
import ElForm from '@/components/ElForm.vue'
import ElSelector from '@/components/ElSelector.vue'
import ElEnterableTable from '@/components/ElEnterableTable.vue'
import VuexStore from '@/components/VuexStore.vue'
import UserSlot from '@/slot/UserSlot.vue'
import CbChain from '@/invokeCbChain/Index.vue'
import Emit from '@/emit/Index.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ScopeThis,
    ElTable,
    ElForm,
    ElSelector,
    ElEnterableTable,
    VuexStore,
    UserSlot,
    CbChain,
    Emit,
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
      visibleElSelector: false,
      visibleElEnterableTable:false,
      visibleVuex: false,
      visibleUserSlot: false,
      visibleCbChain: false,
      visibleEmit: false,
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
    openElSelector() {
      this.visibleElSelector = !this.visibleElSelector;
    },
    openElEnterableTable() {
      this.visibleElEnterableTable = !this.visibleElEnterableTable;
    },
    openVuex() {
      this.visibleVuex = !this.visibleVuex;
    },
    openUserSlot() {
      this.visibleUserSlot = !this.visibleUserSlot;
    },
    openCbChain() {
      this.visibleCbChain = !this.visibleCbChain;
    },
    openEmit() {
      this.visibleEmit = !this.visibleEmit;
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
