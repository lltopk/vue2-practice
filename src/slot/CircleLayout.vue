<template>
  <div class="container">
    <h3>具名作用域循环插槽 常规取值</h3>
    <div>
      <ul>
        <li v-if="!items.length">
          Loading...
        </li>
        <li v-for="item in items" :key="item.id">
          <slot name="itemV1" :data="item"/>
        </li>
      </ul>
    </div>
    <h3>具名作用域循环插槽 结构取值</h3>
    <div> 
      <ul>
        <li v-if="!items.length">
          Loading...
        </li>
        <li v-for="item in items" :key="item.id">
          <slot name="itemV2" v-bind="item"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseLayout',
  components: {
  },
  mounted() {
    // mock remote data fetching
    setTimeout(() => {
      this.items = [
        { id: '1', body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
        { id: '2', body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 }
      ]
    }, 1000)
  },
  data() {
    return {
      greetingMessage: 'greetingMessage',
      items: []
    }
  }
}
</script>

<style>
  ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
  li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
  }
</style>