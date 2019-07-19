<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
		<!-- 商品轮播图区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		</div>		
		<!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{ goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价: <span class="now_price">
						￥{{ goodsinfo.sell_price }}</span>
					</p>
					<!-- 1.父组件向子组件传递方法，子组件调用这个方法，同时把数据当做参数传递给这个方法
						 2.父组件向子组件传值
					-->
					<p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>
		<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				<p>商品货号：{{ goodsinfo.goods_no }}</p>
				<p>库存情况：{{ goodsinfo.stock_quantity }}</p>
				<p>上架时间：{{ goodsinfo.add_time | datFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(goodsinfo.id)">商品评论</mt-button>
			</div>
		</div>      
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
// 导入选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
	data() {
		return {
			id: this.$route.params.id, //商品id
			lunbotuList: [], // 轮播图信息
			goodsinfo: {},  // 商品信息
			ballFlag: false,  // 控制小球隐藏和显示
			selectedCount: 1 //保存用户选中的商品数量，默认认为用户买一个
		}
	},
	created() {
		this.getLunbotu()
		this.getGoodsInfo() 
	},
	methods: {
		// 获取商品轮播图
		getLunbotu() {
			this.$http.get("api/getthumimages/" + this.id).then(result => {
				if(result.body.status === 0) {
					result.body.message.forEach(item => {
						item.img="http://demo.dtcms.net/upload/201504/20/thumb_201504200119256512.jpg"
					})
					this.lunbotuList = result.body.message
				}else {
					Toast("获取商品轮播图失败！")
				}
			})
		},
		// 获取商品的信息
		getGoodsInfo() {
			this.$http.get("api/goods/getinfo/" + this.id).then(result => {
				if(result.body.status === 0) {
					this.goodsinfo = result.body.message[0]
				}else{
					Toast("获取商品信息失败！")
				}
			})
		},
		// 编程式导航跳转到图文介绍页面
		goDesc(id) {
			this.$router.push({ name:"goodsdesc", params: { id }})
		},
		// 编程式导航跳转到评论页面
		goComment(id) {
			this.$router.push({ name:"goodscomment", params: { id }})
		},
		// 添加到购物车(通过vuex实现组件之间的数据传递)
		addToShopCar() {
			// 控制小球的显示与隐藏
			this.ballFlag = !this.ballFlag
			// 商品对象
			var goodsinfo = { 
				id: this.id, 
				count: this.selectedCount, 
				price: this.goodsinfo.sell_price, 
				selected: true 
			}
			// 调用store中的mutations来将商品加入购物车
			this.$store.commit('addToCar',goodsinfo)
		},
		beforeEnter(el) {
			el.style.transform = "translate(0, 0)";
		},
		enter(el,done) {
			el.offsetwidth
	        // 获取小球的 在页面中的位置
	        const ballPosition = this.$refs.ball.getBoundingClientRect();
	        // 获取 徽标 在页面中的位置
	        const badgePosition = document
	          .getElementById("badge")
	          .getBoundingClientRect();

	        const xDist = badgePosition.left - ballPosition.left;
	        const yDist = badgePosition.top - ballPosition.top;

	        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
	        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
	        done();
		},
		afterEnter(el) {
			this.ballFlag = !this.ballFlag
		},
		getSelectedCount(count) {
			// 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
			this.selectedCount = count
		}
	},
  	components: {
	    swiper,
	    numbox
  	}
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
	background-color: #eee;
	overflow: hidden;
	.now_price {
		color: red;
		font-size: 16px;
		font-weight: bold;
	}
	.mui-card-footer {
		display: block;
		button {
			margin: 15px 0;
		}
	}
	.ball {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		z-index: 99;
		top:408px;
		left:146px;
	}
}
</style>
