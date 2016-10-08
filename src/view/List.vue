<template>
	<div v-if="$loadingRouteData">
		<loading></loading>
	</div>
	<div id="list_warp" v-if="!$loadingRouteData">
		<search :cat-id="$route.params.catId"></search>
		<!-- <selector></selector> -->
		<!-- 商户与其下的团单列表开始 -->
	  	<div class="shops_warp" v-for="(index, shop) in shops" v-if="shops">
	  		<div class="shops">
	  			<div class="list_shop_title">
  				  {{ shop.shop_name }}
	  			</div>
	  		
			  	<div class="list_shop_info">
			  		<span class="list_shop_score" v-if="shop.average_score">{{ Math.round(shop.average_score*10)/10 }}分</span>
			  		<span class="list_shop_score" v-else>暂无评分</span>
			  		<span class="list_shop_comment" v-if="shop.comment_num">{{ shop.comment_num }}人评价</span>
			  		
			  	</div>
	  		</div>
			
			<!-- 相应商户的团单列表 -->
		  	<div class="list" v-for="deal in shop.deals.slice(0,3) " v-link="{ name: 'dealdetail',params:{id:deal.deal_id,score:deal.score,commentNum:deal.comment_num}}">
	  	
		  		<div class="list_pic">
		  			<img :src="deal.image">
		  		</div>
		  		<div class="list_text">
		  			<div class="desc">
		  				{{ deal.description }}
		  			</div>
		  			<div class=" price ">
		  				<span class="promotion_price">￥{{ deal.promotion_price/100 }}</span><del class="market_price">/{{ deal.market_price/100 }}</del>
		  			</div>
		  		</div>

			</div>
			<div class="list list_slice" v-for="deal in shop.deals.slice(3) " v-link="{ name: 'dealdetail',params:{id:deal.deal_id,score:deal.score,commentNum:deal.comment_num}}">
	  	
		  		<div class="list_pic">
		  			<img :src="deal.image">
		  		</div>
		  		<div class="list_text">
		  			<div class="desc">
		  				{{ deal.description }}
		  			</div>
		  			<div class=" price ">
		  				<span class="promotion_price">￥{{ deal.promotion_price/100 }}</span><del class="market_price">/{{ deal.market_price/100 }}</del>
		  			</div>
		  		</div>

			</div>
			
			<div class="other down" v-show="shop.deals.slice(3).length !== 0">
				其它{{ shop.deals.slice(3).length }}个团购
			</div>
			<div class="other up">
				收起
			</div>
			
	  	</div>	
	  	<div v-if="err">  		
	  		<alert>
			  <p style="text-align:center;">{{ err }}</p>
			</alert>
	  	</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	#list_warp{
		background: #ededed;
		padding-top: px2rem(80px);
		width: px2rem(640px);
		margin: 0 auto;
	}
	.shops_warp{
		background: #fff;
		margin-bottom: px2rem(20px);
		.other{
			width: 100%;
			height: px2rem(70px);
			line-height: px2rem(70px);
			text-align: center;
		}
	}
	.shops{
		border-bottom: 1px solid #666;
		.list_shop_title{
			height: px2rem(50px);
			line-height: px2rem(50px);
			font-size: px2rem(32px);
			padding-left: px2rem(10px);
		}
		.list_shop_comment{
			color: #666;
			font-size: px2rem(14px);
		}
		.list_shop_info{
			margin:0 0 px2rem(10px) px2rem(10px);
			font-size: px2rem(20px);
			.list_shop_score{
				color: #ff9c00;
				margin-right: px2rem(30px);
				font-size: px2rem(14px);
			}
		}
	}
	.list{
		box-sizing: border-box;
		border-bottom: 1px solid #666;
		height: px2rem(200px);
		padding-left: px2rem(10px);
		.list_pic{
			float: left;
			width: px2rem(200px);
			height: px2rem(150px);
			position: relative;
			top: 50%;
			margin-top: px2rem(-75px);
			padding-left: px2rem(10px);
			img{
				width:100%;
				height:100%;
			}
		}
		.list_text{
			float: left;
			width: px2rem(400px);
			height: px2rem(150px);
			position: relative;
			top: 50%;
			margin-top: px2rem(-75px);
			margin-left: px2rem(10px);
			.desc{
				color: #666;
				font-size: px2rem(20px);
			}
			.price{
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: px2rem(16px);
				.promotion_price{
					color: #ff568e;
				}
				.market_price{
					color: #666;
				}
			}
		}
	}
	.list_slice{
		display: none;
	}
	.up{
		display: none;
	}
</style>

<script>
import { getList } from '../../api/generatorApi.js';
import co from 'co';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import Selector from './Selector';
import Search from '../components/Search';
	export default {
		ready () {
			//因为元素是动态生成的，所以要用事件委托，否则绑定不了事件（在一直存在的上级元素上监听事件）
			$(document).on('click','.down',function(){
				$(this).siblings('.list_slice').show();
				$(this).hide().siblings('.up').show();
			});
			$(document).on('click','.up',function(){
				$(this).siblings('.list_slice').hide();
				$(this).hide().siblings('.down').show()
			})
			
		},
		data () {
			return {
				shops: null,
				err: ''
			}
		},
		components: {
			Loading,Selector,Search,Alert
		},
		methods: {
			
		}
		,
		route: {
			data (transition) {
				co(getList.call(this,transition,{ catIds: this.$route.params.catId }))
			}
		}
	}
</script>