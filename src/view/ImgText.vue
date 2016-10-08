<template>
	<div v-if="$loadingRouteData">
		<loading></loading>
	</div>
	<div id="img_text" v-if="deal" v-if="!$loadingRouteData">
		<x-header style="background: #ff568e;opacity: 1">
			<p style="text-align: center;">图文详情</p>
		</x-header>
		{{{ deal.buy_details }}}
		<!-- 团单详情固定底部开始 -->
			<detail-footer :deal="deal"></detail-footer>
		<!-- 团单详情固定底部结束 -->	
	</div>
</template>

<style lang="scss" scoped>
	@import '../assets/styles/common/px2rem.scss';
	#img_text{
		width: px2rem(500px);
		margin: px2rem(80px) auto;
	}
</style>

<script>
import { getDetail } from '../../api/generatorApi.js';
import XHeader from '../components/XHeader';
import Loading from '../components/Loading';
import DetailFooter from './DetailFooter';
import co from 'co';
	export default {
		data () {
			return {
				deal: null
			}
		},
		components: {
			XHeader,Loading,DetailFooter
		},
		methods: {
			alert () {

			}
		},
		route: {
			data (transition){
				co(getDetail.call(this,transition));
			}
		}
	}
</script>