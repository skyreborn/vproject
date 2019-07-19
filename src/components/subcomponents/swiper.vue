<template>
	<div>
		<mt-swipe :auto="1500">
			<!-- 谁使用轮播图谁传递lunbotuList数据(父组件向子组件传值) -->
		    <mt-swipe-item v-for="item in lunbotuList" :key="item.img + Math.random()*5000">
		    	<img :src="item.img" alt="" :class="{ full: isfull }">
		    </mt-swipe-item>
	    </mt-swipe>		
	</div>
	
</template>

<script>
export default {
	props: ["lunbotuList","isfull"]
}	
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
  }
 .full {
   width: 100%;
 }
}	
</style>