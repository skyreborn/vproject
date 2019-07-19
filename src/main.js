// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由包
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//从本地存储获取购车数据信息
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state: {
		car: car //将购物车中的商品的数据用一个数组存储起来
	},
	mutations: {
		//点击购物车，把商品信息保存到store中的car上
		addToCar(state, goodsinfo) {
			// 判断购物车中是否已经存在有该商品信息，有就更新数据
			var flag = false
			state.car.some(item => {
				if(item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})
			// 没有就push到数组
			if(!flag) {
				state.car.push(goodsinfo)
			}
			// 当更新car之后，把car数组存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car)) 
		},
		// 修改购物车中商品的数量值
	    updateGoodsInfo(state, goodsinfo){
	    	state.car.some(item => {
	    		if(item.id == goodsinfo.id) {
	    			item.count = parseInt(goodsinfo.count)
	    			return true
	    		}
	    	})
			// 当更新car之后，把car数组存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car)) 	    	
	    },
	    // 根据Id，从store中的car数组里面删除对应的数据
	    removeFromCar(state, id) {
	    	state.car.some((item, i) => {
	    		if(item.id == id) {
	    			state.car.splice(i, 1)
	    			return true
	    		}
	    	})
			// 当更新car之后，把car数组存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car)) 	    	
	    },
	    // 更新购物车商品选中和非选中状态
	    updateGoodsSelected(state, info) {
	    	state.car.some(item => {
	    		if(item.id == info.id) {
	    			item.selected = info.selected
	    			return true
	    		}
	    	})
			// 当更新car之后，把car数组存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car)) 		    	
	    }
	},
	getters: {
		// 计算购车商品数量并返回
		getAllCount(state) {
			var c = 0
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		// 组织购物车商品id和商品数量对应的json对象
		getGoodsCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		// 组织购物车商品锁定按钮id与锁定状态对应的json对象
		getGoodsSelected(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		// 组织勾选商品数量和总价
		getGoodsCountAndmount(state) {
			var o = {
				count: 0, // 勾选数量
				amount: 0 // 勾选商品总价
			}
			state.car.forEach( item => {
				if(item.selected) {
					o.count += item.count
					o.amount += item.price * item.count
				}
			})
			return o
		}
	}
})

//导入时间处理插件
import moment from "moment"

//定义全局过滤器
Vue.filter('datFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})

// 2.1引入资源请求插件
import VueResource from 'vue-resource'
// 2.2使用VueResource插件
Vue.use(VueResource)

// 全局配置数据请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
// 全局设置post时候表单数据的组织形式
import './lib/mui/css/icons-extra.css'

//导入缩略图样式
import './lib/my/css/thumbs.css'

// 按需导入Mint-UI中的组件
//import { Header,Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
//Vue.component(Header.name, Header)
//Vue.component(Swipe.name, Swipe)
//Vue.component(SwipeItem.name, SwipeItem)
//Vue.component(Button.name, Button)
//Vue.use(Lazyload)

//全部加载Mint-UI
import MintUI from 'mint-ui'
Vue.use(MintUI)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import 'mint-ui/lib/style.css'

// 1.3 导入自己的router.js路由模块
import router from './router.js'

// 导入App组件
import app from './App.vue'

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	// 1.4 挂载路由对象到vm实例上
	router,
	store // 挂载store
})