<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入BB的内容(最多吐槽120字)" maxlength="120" v-model="msg">
		</textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time + Math.random()*5000">
				<div class="cmt-title">
					第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | datFormat}}
				</div>
				<div class="cmt-body">
					{{item.content === 'undefined' ? '此用户很懒，啥都没说' : item.content }}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	data() {
		return {
			pageindex: 1,
			comments: [],
			msg: ''
		}
	},
	created () {
		this.getComments()
	},	
	methods: {
		// 获取评论
		getComments() {
			this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex).then(result =>{
				if(result.body.status === 0) {
					// 每当获取更多评论的时候，不要把原先的评论覆盖，用老数据拼接新数据
					this.comments = this.comments.concat(result.body.message)
				} else {
					Toast('获取评论失败！')
				}
			})
		},
		// 加载更多评论
		getMore() {
			this.pageindex ++;
			this.getComments();
		},
		// 发表评论
		postComment() {
			// 校验表单内容是否为空
			if(this.msg.trim().length === 0){
				return Toast('评论内容不能为空！')
			}
			this.$http.post('api/postcomment/' + this.$route.params.id, { 
			content:this.msg.trim() })
			.then(function(result) {
				if(result.body.status === 0){
					// 拼接出一个评论对象
					var cmt = {
						 user_name: '匿名用户', 
						 add_time: Date.now(), 
						 content: this.msg.trim()
					   }
					this.comments.unshift(cmt)
					this.msg = ''	
				}else{
					Toast("评论失败！")
				}
			})
		}
	},
	props: ['id'] // 父组件给子组件传过来的id
}
</script>

<style lang="scss" scoped>
.cmt-container{
	h3 {
		font-size: 18px;
	}
	textarea {
		font-size: 14px;
		height: 85px;
		margin: 0;
	}
	.cmt-list {
			margin: 5px 0;
		.cmt-item {
			font-size: 13px;
			.cmt-title {
				line-height: 35px;
				background-color: #ccc;
			}
			.cmt-body {
				line-height: 35px;
				text-indent: 2em;
			}
		}
	}
}	
</style>