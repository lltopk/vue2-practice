<!-- 
前端复杂table, 支持行字段输入, 并对每个字段进行校验
-->
<template>
<div v-if="visibleProp">xxx</div>
</template>

<script>
  export default {
    props: {
      visibleProp: Boolean
    },
    data() {
      return {
 
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>