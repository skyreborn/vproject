<template>
	<div class="photoinfo-container">
		<h3>{{ imageInfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间:{{ imageInfo.add_time | datFormat }}</span>
			<span>点击: {{ imageInfo.click }}次</span>
		</p>

		<hr>

		<!-- 缩略图区域 -->
		<div class="thumbs">
			<vue-preview :slides="list"></vue-preview>
		</div>
		<!-- 图片内容区域 -->
		<div class="content" v-html="imageInfo.content">
		</div>

		<!-- 评论子组件(父组件给评论子组件传id) -->
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
 			id: this.$route.params.id,//从路由中获得的图片id
 			imageInfo: {},//图片详情
 			list: [] //缩略图
 		}
 	},
 	created(){
 		this.getPhotoInfo()
 		this.getThumbs()
 	},
 	methods: {
 		// 获取图片详情
 		getPhotoInfo() {
 			this.$http.get('api/getimageInfo/' + this.id).then(result =>{
				if(result.body.status ===0){
					this.imageInfo=result.body.message[0]
				}else{
					Toast("获取图片详情失败！")
				} 				
 			})
 		},
 		// 获取缩略图
 		getThumbs() {
 			this.$http.get('api/getthumimages/' + this.id).then(result =>{
				if(result.body.status ===0){
					// 循环每个图片数据， 补全图片的宽和高
					result.body.message.forEach(item=>{
						item.msrc = item.src
						item.alt = this.id
						item.title = this.id
						item.w = 600
						item.h = 400
					})
					// 把完整的数据保存到list中
					this.list = result.body.message

				}else{
					Toast("获取缩略图失败！")
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

 <style lang="scss" scoped>
.photoinfo-container {
	padding: 3px;
	h3 {
		color: #26A2FF;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;
	}
	.subtitle {
      display: flex;
      justify-content: space-between;	
      font-size: 13px;	
	}
	.content {
		font-size: 13px;
		line-height: 30px;
	}
}
 </style>