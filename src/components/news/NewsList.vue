<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2777233881,1106483217&fm=27&gp=0.jpg">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
						<span>发表时间：{{ item.add_time | datFormat }}</span>
						<span>点击：{{ item.click }}次</span>
						</p>
					</div>
				</router-link>
			</li>					
		</ul>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			newsList: []
		}
	},

	created () {
		this.getNewsList()
	},	

	methods: {
		//获取新闻列表
		getNewsList () {
			this.$http.get('api/getnewslist').then(result => {
				if(result.body.status === 0) {
					this.newsList = result.body.message
				} else {
					Toast('获取新闻列表失败！')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>