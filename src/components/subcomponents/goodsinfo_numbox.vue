<template>
	<!-- max值的获取存在异步获取延时undefind问题用watch监听来解决 -->
	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
	mounted() {
		//初始化数字选择框组件
		mui('.mui-numbox').numbox()
	},
	methods: {
		//每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
		countChanged() {
			this.$emit('getcount', parseInt(this.$refs.numbox.value))
		}
	},
	props: ["max"],
	watch: {
		// 属性监听
		'max': function(newVal, oldVal) {
			//用mui的jsAPI设置最大值
			mui(".mui-numbox").numbox().setOption("max",newVal)
		}
	}

}	
</script>

<style lang="scss" scoped>
	
</style>