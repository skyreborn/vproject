<template>
	<div class="newsinfo-container">
		<!-- 大标题 -->
		<h3 class="title">{{ newsInfo.title }}</h3>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>发表时间: {{ newsInfo.add_time | datFormat }}</span>
			<span>点击: {{ newsInfo.click }}次</span>
		</p>
		<hr>
		<!-- 内容区 -->
		<div class="content" v-html="newsInfo.content">
		</div>
		<!-- 评论子组件 -->
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'

// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
	data () {
		return {
			//新闻id
			id: this.$route.params.id,
			newsInfo: {}
		}
	},
	created () {
		this.getNewsInfo()
	},
	methods: {
		getNewsInfo () {
			this.$http.get('api/getnew/' + this.id).then(result => {
				if(result.body.status === 0) {
					this.newsInfo = result.body.message[0]
				} else {
					Toast('获取新闻详情失败！')
				}
			})
		}
	},
	// 注册子组件节点
	components: {
		"comment-box": comment
	}

}
	
</script>

<style lang="scss">
.newsinfo-container {
	padding: 0 4px;
	.title {
		font-size: 16px;
		text-align: center;
		margin: 15px 0;
		color: red;
	}
	.subtitle {
		font-size: 13px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
	}
	.content{
		img {
			width: 100%;
		}
	}
}	

</style>