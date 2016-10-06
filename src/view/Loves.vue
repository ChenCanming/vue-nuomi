<template>
	<!-- 猜你喜欢开始 -->
		<div id="love_warp" v-if="loves">
			<ul class="love_list">
				<li class="love_item" v-for="love in loves" v-link="{ name: 'dealdetail',params:{id:love.deal_id,score:love.score,commentNum:love.comment_num,reservationRequired:love.is_reservation_required}}">
					<div class="love_item_imgtext">
						<a href="###" class="love_item_imgtext_pic">
							<img :src="love.image" >
						</a>
						<div class="love_item_imgtext_text">
							<p class="title">{{ love.title }}</p>
							<p class="desc">{{ love.description }}</p>
							<p class="price">
								<span class="current_price">
									￥{{ love.promotion_price/100 }}
								</span>
								<del>{{ love.market_price/100 }}</del>
								<span class="sale_num">已售{{ love.sale_num }}</span>
							</p>
						</div>
					</div>
				</li>
				<li class="all">查看全部团购</li>
			</ul>
		</div>
		<!-- 猜你喜欢结束 -->
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	/* == 猜你喜欢样式开始 == */
	#love_warp{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 0 px2rem(10px) 0 px2rem(10px);
		.love_list{
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			.love_item{
				width: 100%;
				height: px2rem(200px);
				border-bottom: 1px solid #e0e0e0;
				.love_item_imgtext{
					float: left;
					height: 100%;
					.love_item_imgtext_pic{
						float: left;
						width: px2rem(230px);
						height: px2rem(140px);
						position: relative;
						top: 50%;
						margin-top: px2rem(-70px);
						img{
							width: 100%;
							height: 100%;
						}
					}
					.love_item_imgtext_text{
						float: left;
						width: px2rem(350px);
						height: px2rem(140px);
						position: relative;
						top: 50%;
						margin-top: px2rem(-70px);
						margin-left: px2rem(10px);
						.title{
							font-size: px2rem(20px);
							font-weight: bold;
							margin-bottom: px2rem(5px);
						}
						.desc{
							font-size: px2rem(16px);
							color: #666;
						}
						.price{
							width: 100%;
							position: absolute;
							left: 0;
							bottom: 0;
							.current_price{
								color: #FF4683;
								font-weight: bold;
							}
							del{
								color: #666;
								font-size: px2rem(16px);
							}
							.sale_num{
								position: absolute;
								right: 0;
								top: 0;
								color: #666;
								font-size: px2rem(18px);
							}
						}

					}
				}
			}
		}
	}
	/* == 猜你喜欢样式结束 == */
	.all{
		height: px2rem(70px);
		line-height: px2rem(70px);
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		color: #666;
		@include font-dpr(16px)
	}
</style>

<script>
import { co } from 'co';
	export default {
		// props: ['loves'],
		props: {
			loves: {
				default: null
			}
		},
		ready () {
			
		},
		data () {
			return {
				
			}
		},
		route: {
			data () {
				console.log(this.$route.params.deals);
				if(this.$route.params.deals){
					co(function* () {
						let search= yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchdeals?city_id=100010000&cat_ids='+ this.$route.params.catId +'&keyword='+ this.$route.params.deals +'&page=1&page_size=10',{
						      headers:{
						          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
						      }
					   		});
						let deals= search.body.data && search.body.data.deals
						if(deals instanceof Array) {
							if(deals.length !=0 ){
								this.loves= deals;
							}
						}						
					}.bind(this))	
				}
				
			}
		}
	}
</script>