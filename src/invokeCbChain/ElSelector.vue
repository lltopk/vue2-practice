<template>
  <el-select v-model="value" placeholder="请选择" @change="cb1">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      // 用户传入的配置对象，里面可以包含 change 回调
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      // 第一层回调：由 el-select 的 @change 触发
      cb1(value) {
        this.value = value
        // 如果用户在 config 中提供了 change 回调，则触发第二层回调
        const userCb = this.config && this.config.change

        // 触发第二层回调，传入用户选中的值和用户配置对象
        if (typeof userCb === 'function') {
          // 传入三个参数：
          // 1. 当前选中值（value）
          // 2. 用户配置实例
          try {
            userCb(value, this.config)
          } catch (err) {
            // 不阻塞主流程，打印错误以方便调试
            // eslint-disable-next-line no-console
            console.error('user config.change error:', err)
          }
        }
      }
    }
  }
</script>
