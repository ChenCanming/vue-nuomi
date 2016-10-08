<template>
	<div v-if="$loadingRouteData">
		<loading></loading>
	</div>
	<div id="city" v-if="!$loadingRouteData">		
		<x-header>
			<h1 class="city_title">全部城市</h1>
		</x-header>
		<ul class="city_pinyin">
			<li v-for="(index,city) in cities" class="city_pinyin_item">		
				<div class="city_py">{{ index }}</div>
				<div class="city_con">
					<span v-for="ct in city" class="city_con_item" v-link="{ name: 'home', params: { cityId: ct.city_id, cityName: ct.city_name } }">{{ ct.city_name }}</span>
				</div>
			</li>
		</ul>
		<back-top></back-top>
	</div>

</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	#city{
		width: px2rem(640px);
		margin: 0 auto;
		box-sizing: border-box;
		.city_title{
			text-align: center;
			color: #FFF;
		}
		.city_pinyin{
			padding-top: px2rem(80px);
		}
		.city_pinyin_item{
			overflow: hidden;
			padding: 0 px2rem(10px) 0 px2rem(10px);
			.city_py{
				width: 100%;
				height: px2rem(50px);
				line-height: px2rem(50px);
				text-align: center;
				color: #296da1;
				background: #eee;
				font-size: px2rem(30px);
				font-weight: bold;
			}
			.city_con_item{
				float: left;
				padding: px2rem(15px);
				margin: px2rem(10px);
				border: 1px solid #666;
			}
		}
	}
</style>

<script>
import { getCities } from '../../api/generatorApi.js';
import Loading from '../components/Loading';
import XHeader from '../components/XHeader';
import BackTop from '../components/BackTop';
import co from 'co';
	export default {
		ready () {
			
		},
		data () {
			return{
				cities: null
			}
		},
		components: {
			Loading,XHeader,BackTop
		},
		route: {
			data (transition) {
				co(getCities.call(this,transition));
				// console.log(this.cities)
				
			}
		}
	}
</script>