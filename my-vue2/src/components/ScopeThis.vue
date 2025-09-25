<template>
    <div>
        <h2>Scope This</h2>
        <p>{{ message }}</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  },
  methods: {
    showThis() {
      console.log(this); // ✅ 正确！这里的this指向vm实例
    }
  },
//   mounted() {
//     console.log(this.message);
//     setTimeout(() => {
//         // ✅ 正确！箭头函数的this继承外部, 这里的外部到了mounted(), mounted级别拥有vm实例this
//       this.message = 'Updated';
//     }, 1000);
//     this.showThis();
//   }
  mounted: () => {
    // ❌ 错误！箭头函数的this继承外部, 这里继承了vm实例的外部undefined
    console.log(this.message); // ❌ undefined
    setTimeout(() => {
      this.message = 'Updated'; // ❌ 失败
    }, 1000);
  }
}
</script>
