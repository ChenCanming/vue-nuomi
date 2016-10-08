<template>
	<div class="back_top" @click="backTop" v-show="isShow" transition="expand"></div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/common/px2rem.scss';
	.back_top{
		width: px2rem(78px);
		height: px2rem(78px);
		background: url(../assets/images/back_top.png) no-repeat 0 0;
		background-size: contain;
		position: fixed;
		bottom: px2rem(100px);
		right: px2rem(10px);
	}
	/* 必需 */
	.expand-transition {
	  transition: all 1s ease;
	  opacity: 1;
	}

	/* .expand-enter 定义进入的开始状态 */
	/* .expand-leave 定义离开的结束状态 */
	.expand-enter, .expand-leave {
	  opacity: 0;
	}
</style>
	
<script>
	export default {
		ready () {
			document.addEventListener('scroll',() => {
				if(document.body.scrollTop > 1000) {
					this.isShow= true;					
				}else{
					this.isShow= false;
				}
			})
		},
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			backTop () {
				window.scroll(0,0);
			}
		}
	}
</script>