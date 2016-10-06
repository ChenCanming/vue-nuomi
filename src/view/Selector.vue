<template>
	<div id="cate_warp">
		<ul class="cate_header">
			<li class="cate_header_item" v-text=" cate "></li>
			<li class="cate_header_item">全城</li>
			<li class="cate_header_item">默认排序</li>
			<li class="cate_header_item">筛选</li>
		</ul>
		<div class="cate_body">
			<ul class="cate_body_con supper" style="display: none">
				<li class="supper_item supper_item_cate" v-for="cate in categories" cateid="{{ cate.cat_id }}" v-link="{ name: 'list', params: { catId: cate.cat_id } }">{{ cate.cat_name }}</li>
				<!-- <li class="supper_item">美食</li>
				<li class="supper_item">休闲娱乐</li> -->
			</ul>
			<ul class="cate_body_con supper" style="display: none">
				<li class="supper_item supper_item_city">22222</li>
				<li class="supper_item supper_item_city">美食</li>
				<li class="supper_item supper_item_city">休闲娱乐</li>
			</ul>
			<ul class="cate_body_con supper" style="display: none">
				<li class="supper_item">3333</li>
				<li class="supper_item">美食</li>
				<li class="supper_item">休闲娱乐</li>
			</ul>
			<ul class="cate_body_con supper" style="display: none">
				<li class="supper_item">4444444</li>
				<li class="supper_item">美食</li>
				<li class="supper_item">休闲娱乐</li>
			</ul>
			<ul class="cate_body_con sub_cate" style="display: none">
				<li class="sub_item">小吃</li>
				<li class="sub_item">快餐</li>
				<li class="sub_item">火锅</li>
			</ul>
		</div>		
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	#cate_warp{
		position: fixed;
		top: px2rem(80px);
		left: 0;
		z-index: 99;
		width: 100%;
	}
	.cate_header{
		width: 100%;
		height: px2rem(70px);
		line-height: px2rem(70px);
		background: #fff;
		.cate_header_item{
			display: inline-block;
			padding: 0 px2rem(20px) 0 px2rem(20px);
			

		}
	}
	.cate_body{
		position: absolute;
		z-index: 99;
		width: 100%;
		// height: px2rem(500px);
		background: #666;
		border: 1px solid #666;
		.cate_body_con{
			background: #fff;
			width: 50%;
			height: 100%;
			float: left;
			.supper_item{
				height: px2rem(80px);
				line-height: px2rem(80px);
				border-bottom: 1px solid #666;
				text-align: center;
			}
			.sub_item{
				height: px2rem(80px);
				line-height: px2rem(80px);
				border-bottom: 1px solid #666;
				text-align: center;
			}
		}
	}
</style>

<script>
import { co } from 'co';
	export default {
		ready () {
			let _this= this;
			$('.cate_header_item').on('click',function(event){
				self= $(this);
				let idx= $(this).index();
				$('.supper').eq(idx).show().siblings().hide();
				
				// $('.supper').eq(idx).find('.supper_item').on('click',function(){
				// 	self.text($(this).text())
				// })
				$('.supper_item').on('click',function(){
					self.text($(this).text())
					$(this).parent().hide();
				})
				
				
			});


			
			co(function* (){
				let categories= yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/categories',{
					      headers:{
					          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
					      }
				    });
				this.categories= categories.body.categories;
			}.bind(this))
		},
		data () {
			return {
				categories: null,
				cate: '分类',
				cateId: 326
			}
		},
		methods: {
			
		}
	}
</script>