<template>
	<!-- 团单详情固定底部开始 -->
		<div class="detail_footer">
			<span class="detail_price">
				<span class="promotion_price">
				<span class="promotion_price_sm">￥</span>{{ deal.promotion_price/100 }}</span>
				<del class="market_price">{{ deal.market_price/100 }}</del>
			</span>
			<span class="qiang_gou" @click="alert">
				立即抢购
			</span>
		</div>	
		<!-- 团单详情固定底部结束 -->
		<alert :show-alert.sync="showAlert">
		  <p style="text-align:center;">立即抢购暂不开放</p>
		</alert>
</template>

<style lang="scss" scoped>
	@import '../assets/styles/common/px2rem.scss';
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
	import Alert from '../components/Alert';
	export default {
		props:['deal'],
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