<template>
	<div class="header">
		<slot></slot>
		<span class="back" @click="back"></span>
		<span class="home" v-link="{ name: 'home' }"></span>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	.header{
		box-sizing: border-box;
		width: 100%;
		height: px2rem(60px);
		line-height: px2rem(60px);
		background: #666;
		opacity: .6;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		color: #fff;
		padding: 0 px2rem(10px) 0 px2rem(10px);
		// background: rgba(100,100,100,.3);
		.back{
			position: absolute;
			top:50%;
			width: px2rem(50px);
			height: px2rem(50px);
			margin-top: px2rem(-25px);
			background: url(../assets/images/back.png) no-repeat 0 0;
			background-size: contain;
		}
		.home{
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
	export default {
		props: {
			showBack : {
				default: true
			}
		},
		methods: {
			back () {
				history.back();
			}
		}
	}
</script>