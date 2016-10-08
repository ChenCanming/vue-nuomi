<template>
	<!-- 顶部开始 -->
		<header>
			<!-- 地区开始 -->
			<a href="###" class="city_link">
				<span class="city_name" v-link="{name: 'city'}">
					{{ cityName }}
				</span>
				<i class="city_icon"></i>
			</a>
			<!-- 地区结束 -->
			<span class="title">
				团购网
			</span>
			<!-- 用户登录开始 -->
			<a href="###" class="user_link" @click="alert">
				<span class="user_name">我的</span>
				<i class="user_icon"></i>
			</a>
			<!-- 用户登录结束 -->
			<alert :show-alert.sync="showAlert">
			  <p style="text-align:center;">用户登录暂不开放</p>
			</alert>
		</header>
	<!-- 顶部结束 -->
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	%font_color{
		color: #fff;
	}
	/*== 头部样式开始 ==*/
	header{
		width:100%;
		height:px2rem(70px);
		line-height: px2rem(70px);
		background: #FF4683;
		text-align: center;
		font-size: px2rem(18px);
		.city_link{
			float:left;
			// width:px2rem(100px);
			height: 100%;
			font-size: px2rem(16px);
			padding-left: px2rem(10px);
		}
		.title{
			font-size: px2rem(26px);
			font-weight: bold;
			@extend %font_color;
		}
		.user_link{
			float: right;
			width: px2rem(60px);
			height: 100%;
			margin-right: px2rem(14px);
			position: relative;
			.user_name{
				margin-left: px2rem(15px);
			}
			.user_icon{
				position: absolute;
				top: 50%;
				left: 0;
				width: px2rem(30px);
				height: px2rem(20px);
				margin-top: px2rem(-10px);
				background: url(../assets/images/user.png) no-repeat 0 0;
				background-size: contain;
				// background:blue;
			}
		}
	}
	/*== 头部样式结束 ==*/
</style>

<script>
import Alert from '../components/Alert';
	export default {
		props: ['cityName'],
		data () {
			return {
				showAlert: false
			}
		},
		components: {
			Alert
		},
		methods: {
			alert () {
				this.showAlert= true
			}
		}
	}
</script>