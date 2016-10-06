<template>
	<div v-if="$loadingRouteData">
		<loading :show="true"></loading>
	</div>
	<div id="warp" v-if="!$loadingRouteData">
		<!-- 顶部开始 -->
		<header>
			<!-- 地区开始 -->
			<a href="###" class="city_link">
				<span class="city_name">
					深圳
				</span>
				<i class="city_icon"></i>
			</a>
			<!-- 地区结束 -->
			<span class="title">
				团购网
			</span>
			<!-- 用户登录开始 -->
			<a href="###" class="user_link">
				<span class="user_name">我的</span>
				<i class="user_icon"></i>
			</a>
			<!-- 用户登录结束 -->
		</header>
		<!-- 顶部结束 -->
		<!-- 搜索框开始 -->
		<!-- <div id="search_warp">
			<form>
				<input type="text" class="search" placeholder="搜索商家，分类，地点">
			</form>
		</div> -->
		<!-- 搜索框结束 -->
		<search top="50px"></search>
		<!-- 分类开始 -->
		<nav> 
			<ul>
				<li class="nav_item" v-for="cates in categories" v-link="{ name: 'list', params: { catId: cates.cat_id } }">
					<i class="nav_icon nav_icon_{{ $index }}"></i>
					<span class="nav_title">{{ cates.cat_name }}</span>
				</li>
				<li class="nav_item">
					<i class="nav_icon nav_icon_7"></i>
					<span class="nav_title">更多分类</span>
				</li>
			</ul>
		</nav>
		<!-- 分类结束 -->
		<div class="love_header">
				<span class="love_header_title">猜你喜欢</span>
				<span class="love_header_more">全部团购></span>
		</div>
		<loves :loves="loves"></loves>
	</div>
	 <actionsheet :show.sync="show1" :menus="menus1" @on-click-menu="click"></actionsheet>
</template>

<style lang="scss" scoped>
	@import '../assets/styles/common/px2rem.scss';
	#warp{
		width:px2rem(640px);
		margin: 0 auto;
	}
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
			width:px2rem(70px);
			height: 100%;
			@extend %font_color;
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

	/*== 搜索框样式开始 ==*/
	#search_warp{
		box-sizing: border-box;
		width: 100%;
		height: px2rem(70px);
		background: #eeeeee;
		padding:0 px2rem(52px) 0 px2rem(15px);
		.search{
			width: 100%;
			height: px2rem(45px);
			margin-top: px2rem(10px);
			border:0;
			border-radius: px2rem(20px);
			padding-left: px2rem(15px);
		}
	}
	/*== 搜索框样式结束 ==*/

	/*== 分类样式开始 ==*/
	nav{
		width: 100%;
		height: px2rem(300px);
		background: #fff;
		border-bottom: 1px solid #e0e0e0;
		.nav_item{
			float: left;
			// width: px2rem(125px);
			width: px2rem(150px);
			text-align: center;
			margin-top: px2rem(20px);
			.nav_icon{
				display: block;
				width: px2rem(80px);
				height: px2rem(80px);
				background-size: contain;
				position: relative;
				top: 0;
				left: 50%;
				margin-left: px2rem(-40px);
			}
			.nav_icon_0{
				background-image: url(../assets/images/nav_shenghuo.png);
			}
			.nav_icon_1{
				background-image: url(../assets/images/nav_xiuxiang.png);
			}
			.nav_icon_2{
				background-image: url(../assets/images/nav_jiudian.png);
			}
			.nav_icon_3{
				background-image: url(../assets/images/nav_meishi.png);
			}
			.nav_icon_4{
				background-image: url(../assets/images/nav_jiudian.png);
			}
			.nav_icon_5{
				background-image: url(../assets/images/nav_chongzhi.png);
			}
			.nav_icon_6{
				background-image: url(../assets/images/nav_chongzhi.png);
			}
			.nav_icon_7{
				background-image: url(../assets/images/nav_more.png);
			}
			.nav_title{
				display: block;
				margin-top: px2rem(5px);
			}
		}
	}
	/*== 分类样式结束 ==*/
	.love_header{
			width: 100%;
			height: px2rem(50px);
			line-height: px2rem(50px);
			.love_header_title{
				// @include font-dpr(16px);
				font-size: px2rem(26px);
			}
			.love_header_more{
				font-size: px2rem(26px);
				float: right;
				color: #666;
			}
		}
</style>

<script>
// import Api from '../../api/api.js';
import { getIndex } from '../../api/generatorApi.js';
import Loves from './Loves';
import Loading from '../components/Loading';
import { Search,Actionsheet } from 'vux/src/components/'
//加载co模块
import { co } from 'co';
export default {
  ready () {

  },
  data () {
  	return {
  		categories: null,
  		loves: []
  	}
  },
  components: {
    Loves,Loading,Search,Actionsheet
  },
  //组件路由控制
  route: {
  	data (transition) {
  		/* 第一种方法 */
		//vue-router参考地址：https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/data.md
		//路由器将会在这两个 Promise resolve 之后的值分别赋值给组件的 categories 和 loves 属性。
		//这是vue实现的一个语法糖
		/*return {
	      categories: Api.getCategories(this),
	      loves: Api.getLoves(this)
	    }*/
	    // var self= this;
	    
	    // 第二种方法 (好用)
	    // 采用生成器函数和co模块来处理异步流程
		co(getIndex.call(this,transition));

  	}
  },
  methods: {
  	click (key) {
      console.log(key)
    }
  }
}
</script>
