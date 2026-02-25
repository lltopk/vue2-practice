<template>
	<div v-show="visibleProp">
		<h3>ElTable emit回调参数传递方式组合</h3>
		<ELTable 
			@selectNoEmitParam="selectNoEmitParam"
			@selectOnlyEmitParam="selectOnlyEmitParam($event)" 
			@selectOnlyEmitParamImplicit="selectOnlyEmitParamImplicit" 
			@selectOnlyParentParam="selectOnlyParentParam('0')" 
			@selectBothParam="selectBothParam('0', $event, '1')" 
			@selectExtensionEmits="selectExtensionEmits('0',  arguments, '1',)" 
			@selectExtensionEmitsWithPv="(e1,e2,e3)=> selectExtensionEmitsWithPv('0', '1', e1, e2, e3)" 
		/>
		<div style="margin-top:12px">
			<div>请看控制台打印</div>
		</div>
	</div>
</template>

<script>
import ELTable from './ElTable.vue'

export default {
	name: 'MyIndex',
	components: { ELTable },
    props: {
        visibleProp: Boolean
    },
	data() {
		return {

		}
	},
	created() {

	},
	methods: {
		selectNoEmitParam(){
			console.log('index.vue selectNoEmitParam')
		},
		selectOnlyEmitParam(e){
			console.log('index.vue selectOnlyEmitParam',e)
		},
		/**
		 * 当只有事件参数时，模板中可以省略事件参数$event, 事件处理函数依然可以拿到$event
		 * 但这种方式适合只有一个事件参数的场景，且事件参数是必须的
		 */
		selectOnlyEmitParamImplicit(e){
			console.log('index.vue selectOnlyEmitParamImplicit',e)
		},
		selectOnlyParentParam(p){
			console.log('index.vue selectOnlyParentParam',p)
		},
		selectBothParam(pV0, e, pV1) {
			console.log('index.vue selectBothParam:', pV0, e, pV1)
		},

		
		/**
		 * 演示扩展事件参数的使用，如果模板使用普通函数, 模板需要使用arguments来获取事件参数列表
		 */
		selectExtensionEmits(pV0,  emitParams, pV1) {
			console.log('index.vue selectExtensionEmits:', pV0, pV1, emitParams[0], emitParams[1], emitParams[2])
		},
		/**
		 * 演示扩展事件参数的使用，通过模板使用箭头函数, 这样在事件处理函数中就可以直接获取到事件参数了
		*/
		selectExtensionEmitsWithPv(pV0, pV1, e1, e2, e3) {
			console.log('index.vue selectExtensionEmitsWithPv:', pV0, pV1, e1, e2, e3)
		}

		//推荐定义箭头函数的方式来处理事件回调, 提前明确子组件传了几个参数（e1, e2）更易读，适合多参数场景
	}
}
</script>

<style scoped>
h3 { margin-bottom: 8px }
</style>
