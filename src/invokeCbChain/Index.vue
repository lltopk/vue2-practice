<template>
	<div v-show="visibleProp">
		<h3>ElSelector 二级回调示例</h3>
		<el-selector :config="selectorConfig" />

		<div style="margin-top:12px">
			<div>二级回调收到的值: {{ lastCbValue }} {{selfConfig}}</div>
		</div>
	</div>
</template>

<script>
import ElSelector from './ElSelector.vue'

export default {
	name: 'MyIndex',
	components: { ElSelector },
    props: {
        visibleProp: Boolean
    },
	data() {
		return {
			lastCbValue: null,
			selfConfig: null,
			selectorConfig: {
                key: 'myIndex',
                change: (value, cfg) => {
                    // 在这里处理二级回调逻辑，this 指向父组件（因为使用箭头函数）
                    this.lastCbValue = value
                    this.selfConfig = cfg
                    // 可在此处访问 cfg（即传入的配置对象）
                    // eslint-disable-next-line no-console
                    console.log('index.vue second-level callback:', value, cfg)
                }
		    }
		}
	},
	created() {

	},
	methods: {

	}
}
</script>

<style scoped>
h3 { margin-bottom: 8px }
</style>
