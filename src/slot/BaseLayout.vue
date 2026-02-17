<template>
  <div class="container">
    <header>
      <h3>具名插槽</h3>
      <!-- 具名插槽模板 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 具名插槽模板 -->
      <slot></slot>
    </main>
    <footer>
      <!-- 具名插槽模板 -->
      <slot name="footer"></slot>
    </footer>

    <h3>具名作用域插槽</h3>
    <!-- 具名作用域插槽 -->
    <div>
  	  <slot name = "scope" :text="greetingMessage" :count="1"></slot>
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
  footer {
    border-top: 1px solid #ccc;
    color: #666;
    font-size: 0.8em;
  }
</style>