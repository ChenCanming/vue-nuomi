<template>
	<div v-if="$loadingRouteData">
		<loading></loading>
	</div>
	<div id="detail" v-if="deal" v-if="!$loadingRouteData">
		<!-- <x-header :left-options="{showBack: true,backText: '返回'}" style="background:#666">
			<span class="home" v-link="{name:'home'}">首页</span>
		</x-header> -->
		<x-header></x-header>
		<div class="detail_header">
			<img :src="deal.image">
			<div class="buy_details" v-link="{name: 'imgtext',params:{id:$route.params.id}}">点击查看图文详情</div>
		</div>
		<!-- 团单详情主体开始 -->
		<div class="detail_body">
			<!-- 团单标题开始 -->
			<h1 class="detail_title">{{ deal.title }}</h1>
			<!-- 团单标题结束 -->
			<!-- 团单小标题开始 -->
			<h3 class="detail_desc">{{ deal.long_title }}</h3>
			<!-- 团单小标题结束 -->

			<!-- 团单购买情况开始 -->
			<div class="detail_sale">
				<span class='sale_suibiantui'>
					<i class="sale_suibiantui_icon"></i>
					<span class="sale_suibiantui_title">未消费，随便退</span>
				</span>
				<span class="sale_num">
					<i class="sale_num_icon"></i>
					<span class="sale_num_title">已售:{{deal.sale_num}}</span>
				</span>
				<span class="sale_mianyuyue">
					<i class="sale_mianyuyue_icon"></i>
					<!-- 判断是否需要预约 -->
					<span class="sale_mianyuyue_title" v-if="deal.is_reservation_required">免预约</span>
					<span class="sale_mianyuyue_title" v-else>需要预约</span>
				</span>
			</div>
			<!-- 团单购买情况结束 -->
			<!-- 评分开始 -->
			<div class="rater_warp">
			    <rater :value="rater" active-color="#ff9c00" disabled v-if="rater"></rater>
			    <span class="rater" v-else>暂无评分</span>
			    <span class="rater" v-if="rater">{{ rater }}</span>
			    <span class="comment" v-if="$route.params.commentNum != 0">{{ $route.params.commentNum }}人评论></span>
			    <span class="comment" v-else>暂无评论</span>
			</div>
			<!-- 评分结束 -->
			<!-- 套餐内容开始 -->
			<div class="taocan"  v-if="detailTaoCan">
				<h1 class="tips">套餐内容</h1>
				<ul>
					<li class="detail_tips_item" v-for=" taocan in detailTaoCan ">
						<span class="detail_tips_title">
							{{ taocan.fuwu_name }}
						</span>
						<span class="detail_tips_info">
							<span class="measurement">
								1{{ taocan.measurement }}
							</span>
							<span class="tips_info_price">
								￥{{ taocan.price/1000 }}
							</span>
						</span>
					</li>
				</ul>
				<div class="price_num">
					小计:<span style="color:#ff2244 ">￥{{ deal.promotion_price/100 }}</span>/<del>{{ deal.market_price/100 }}</del>
				</div>
			</div>
			<!-- 套餐内容结束 -->
			<!-- 消费提示开始 -->
			<div class="tips_warp" v-if="detailTips">
				<h1 class="tips">消费提示</h1>
				<dl v-for="tip in detailTips">
					<dt>{{ tip.name }}:</dt>
					<dd>{{ tip.show }}</dd>
				</dl>

			</div>
			<!-- 消费提示结束 -->

			<!-- 为你推荐开始 -->
			<div class="tui_jian">
				<h1 class="tui_jian_header" v-if="detailTuiJian">为你推荐</h1>
				<ul>
					<li class="tui_jian_item" v-for="tuijian in detailTuiJian" v-link="{ name: 'dealdetail',params:{id:tuijian.deal_id}}" v-if="detailTuiJian">
						<a href="###" class="tui_jian_pic">
							<img :src=" tuijian.image ">
						</a>
						<div class="tui_jian_title">
							{{ tuijian.min_title }}
						</div>
						<div class="tui_jian_desc">
							{{ tuijian.description }}
						</div>
						<div class="tui_jian_price">
							<span class="current_price">￥{{ tuijian.promotion_price/100 }}</span><del>/{{ tuijian.market_price/100 }}</del>
						</div>
					</li>
				</ul>
			</div>
			<!-- 为你推荐结束 -->
			
		</div>	
		<!-- 团单详情主体结束 -->
		<detail-footer :deal="deal"></detail-footer>
		<back-top></back-top>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	#detail{
		box-sizing: border-box;
		width: px2rem(640px);
		margin: 0 auto;
		padding-bottom: px2rem(100px);
	}
	.home{
		float: right;
	}
	//头部
	.detail_header{
		width: 100%;
		height: px2rem(350px);
		position: relative;
		img{
			width: 100%;
			height: 100%;
		}
		.buy_details{
			width: 100%;
			height: px2rem(50px);
			line-height: px2rem(50px);
			text-align: center;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0,0,0,.3);
			color: #fff;
			font-size: px2rem(18px);
		}
	}
	//内容主体
	.detail_body{
		width:100%;
		//大标题
		.detail_title{
			box-sizing: border-box;
			width: 100%;
			height: px2rem(60px);
			line-height: px2rem(60px);
			border-bottom: 1px solid #e0e0e0;
			font-size: px2rem(30px);
			font-weight: bold;
			padding: 0 px2rem(10px) 0 px2rem(10px);
		}
		//小标题
		.detail_desc{
			font-size: px2rem(10px);
			color: #88888d;
			padding: px2rem(10px);
			border-bottom: 1px solid #e0e0e0;
		}

		//已购买的情况
		.detail_sale{
			color: #666;
			padding: px2rem(10px);
			border-bottom: 1px solid #e0e0e0;
			font-size: px2rem(14px);
			position: relative;
			i{
				display: inline-block;
				width: px2rem(30px);
				height: px2rem(30px);
				position: absolute;
				top: 50%;
				margin-top: px2rem(-15px);
			}
			.sale_suibiantui{
				.sale_suibiantui_icon{
					background: url(../assets/images/detail.png) no-repeat 0 0;
					background-size: contain;
				}
				.sale_suibiantui_title{
					margin-left: px2rem(35px);
					font-size: px2rem(10px);
				}
			}
			.sale_num{
				.sale_num_icon{
					background: url(../assets/images/detail02.png) no-repeat 0 0;
					background-size: contain;
				}
				.sale_num_title{
					margin-left: px2rem(35px);
					font-size: px2rem(10px);
				}
			}
			.sale_mianyuyue{
				.sale_mianyuyue_icon{
					background: url(../assets/images/detail03.png) no-repeat 0 0;
					background-size: contain;
				}
				.sale_mianyuyue_title{
					margin-left: px2rem(35px);
					font-size: px2rem(10px);
				}
			}
		}
		
		//评分样式
		.rater_warp{
			position: relative;
			padding-left: px2rem(10px);
			padding-right: px2rem(10px);
			height: px2rem(50px);
			line-height: px2rem(50px);
			.rater{
				font-size: px2rem(20px);
				color: #ff9c00;
			}
			.comment{
				position: absolute;
				right:0;
				color: #666;
				font-size: px2rem(16px);
			}
		}
		
		//套餐列表
		.detail_tips_item{
			box-sizing: border-box;
			width: 100%;
			height: px2rem(50px);
			line-height: px2rem(50px);
			border-bottom: 1px solid #e0e0e0;
			font-size: px2rem(14px);
			padding: 0 px2rem(10px) 0 px2rem(10px);
			position: relative;
			.detail_tips_info{
				position: absolute;
				right: 0;
				top: 0;
				font-size: px2rem(16px);
				span{
					display: inline-block;
					width: px2rem(50px);
					text-align: center;
				}
			}
		}
		.price_num{
			width: 100%;
			height: px2rem(50px);
			line-height: px2rem(50px);
			text-align: right;
			font-size: px2rem(18px);
		}

		//消费提示
		.tips{
				width: 100%;
				height: px2rem(50px);
				line-height: px2rem(50px);
				background-color: #FF4683;
				color: #FFF;
				padding-left: px2rem(10px);
				font-size: px2rem(26px);
				font-weight: bold;
		}
		.tips_warp{
			
			dl{
				padding: px2rem(20px) px2rem(10px) px2rem(20px) px2rem(10px);
				border-bottom: 1px solid #e0e0e0;
				dt{
					font-size: px2rem(14px);
					font-weight: bold;
					margin-bottom: px2rem(10px);
				}
				dd{
					font-size: px2rem(12px);
					padding-left: px2rem(20px);
				}
			}
		}
		
		.detail_tips{
			padding: px2rem(10px) px2rem(10px) 0 px2rem(10px);
			font-size: px2rem(16px);
		}

		//
		.tui_jian{
			// float: left;
			overflow: hidden;//清除浮动
			.tui_jian_header{
				width: 100%;
				height: px2rem(70px);
				line-height: px2rem(70px);
				padding-left: px2rem(10px);
				font-weight: bold;
				font-size: px2rem(30px);
			}
			ul{
				padding: 0 px2rem(10px) 0 px2rem(30px);
				overflow: hidden;
				.tui_jian_item{
					box-sizing: border-box;
					float: left;
					width: 45%;
					height: px2rem(330px);
					// background: red;
					margin-right: px2rem(20px);
					margin-bottom: px2rem(10px);
					position: relative;
					.tui_jian_pic{
						display:block;
						width: 100%;
						height: px2rem(180px);
						img{
							width: 100%;
							height: 100%;
						}
						// background: blue;
					}
					.tui_jian_title{
						width: 100%;
						font-size: px2rem(20px);
						font-weight: bold;
						padding: px2rem(5px) 0 px2rem(5px) px2rem(10px);
					}
					.tui_jian_desc{
						width: 100%;
						font-size: px2rem(16px);
						padding: 0 0 px2rem(5px) px2rem(10px);
					}
					.tui_jian_price{
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						text-align: right;
						width: 100%;
						.current_price{
							font-size: px2rem(18px);
							color: #FF4683;
							font-weight: bold;
						}
						del{
							color: #666;
							font-size: px2rem(14px);
						}
					}
				}
			}			
		}
		
		
	}
	//固定底部
	.detail_footer{
		box-sizing: border-box;
		position: fixed;
		left: 50%;
		bottom: 0;
		width: px2rem(640px);
		margin-left: px2rem(-320px);
		height: px2rem(100px);
		line-height: px2rem(100px);
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		background: #fff;
		padding: px2rem(10px);
		.qiang_gou{
			position: absolute;
			top: 50%;
			right: px2rem(10px);
			width: px2rem(200px);
			text-align: center;
			height: px2rem(70px);
			margin-top: px2rem(-35px);
			line-height: px2rem(70px);
			color: #fff;
			background-color: #ff2244;
			border-radius: px2rem(10px);
		}
		.promotion_price{
			color: #ff2244;
			font-size: px2rem(40px);
			font-weight: bold;
			.promotion_price_sm{
				font-size: px2rem(22px);
			}
		}
		.market_price{
			color: #666;
		}
	}
</style>

<script>
import { getDetail } from '../../api/generatorApi.js';
import Loading from '../components/Loading';
import Rater from '../components/Rater';
import XHeader from '../components/XHeader';
import Alert from '../components/Alert';
import BackTop from '../components/BackTop';
import DetailFooter from './DetailFooter';
import co from 'co';
export default {
	ready () {
		
	},
	data () {
		return {
			deal: null,
			detailTaoCan: null,
			detailTips: null,
			detailTuiJian: null,
			shops: null,
			rater: Math.floor(this.$route.params.score*10)/10,
			showAlert: false,
			// reservationRequired: this.$route.params.reservationRequired//是否支持预约
		}
	},
	components: {
		Loading,Rater,XHeader,Alert,BackTop,DetailFooter
	},
	route: {
		data (transition) {
			co(getDetail.call(this,transition));
		}
	}

}

</script>