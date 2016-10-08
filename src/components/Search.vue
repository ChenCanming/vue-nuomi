<template>
	<div id="search_warp">
		<span class="back" @click="back">返回</span>
		<input type="text" class="search" placeholder="搜索商家，分类，地点" v-model="search" @keyup.enter="submit">
		<span class="home_icon" v-link="{ name:'home' }"></span>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	#search_warp{
		width: 100%;
		height: px2rem(80px);
		line-height: px2rem(80px);
		text-align: center;
		background: #ff4683;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		.search{
			width: px2rem(450px);
			height: px2rem(50px);
			border: 0;
			padding-left: px2rem(10px);
			margin-left: px2rem(-50px);
		}
		.back{
			text-align: center;
			height: 100%;
			float: left;
			font-size: px2rem(30px);
			color: #fff;
			margin-left: px2rem(20px);
		}
		.home_icon{
			position: absolute;
			top:50%;
			right: px2rem(10px);
			width: px2rem(40px);
			height: px2rem(40px);
			margin-top: px2rem(-20px);
			background: url(../assets/images/home.png) no-repeat 0 0;
			background-size: contain;
		}
	}
</style>

<script>
import { co } from 'co';
 	export default {
 		props: {
 			catId: {
 				default: 326
 			}
 		},
 		ready () {
 			// console.log(this.catId);
 		},
		data () {
			return {
				search: ''
			}
		},
		methods: {
			back () {
				history.back();
			},

			submit () {
				// console.log(this.search);
				if(this.search){
					this.$router.go({
						name: 'search',
						params: {
							keyword: this.search,
							catId: this.catId,
							cityId: 100010000
						}
					})
				}else{
					alert('不能为空')
				}
			}
		}
	}
</script>