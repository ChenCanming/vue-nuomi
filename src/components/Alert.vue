<template>
	<div class="alert" v-show="showAlert" transition="expand">
		<slot></slot>
		<button @click="alert" class="true">确定</button>
	</div>
</template>

<style lang="scss" scoped>
	@import '../assets/styles/common/px2rem.scss';
	.alert{
		box-sizing: border-box;
		width: px2rem(200px);
		height: px2rem(150px);
		background: rgba(0,0,0,.9);
		color: #fff;
		text-align: center;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 99;
		margin-top: px2rem(-75px);
		margin-left: px2rem(-100px);
		border-radius: px2rem(5px);
		font-size: px2rem(14px);
		padding: px2rem(10px);
	}
	.true{
		border: 0;
		width: px2rem(50px);
		height: px2rem(20px);
		position: absolute;
		bottom: px2rem(10px);
		left: 50%;
		margin-left: px2rem(-25px);
		background: #FF4683;
		color: #fff;
		border-radius: px2rem(5px);
	}
	/* 必需 */
	.expand-transition {
	  transition: all .5s ease;
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
		props: {
			showAlert: {
				default: true
			}
		},
		data () {
			return {

			}
		},
		methods: {
			alert () {
				this.showAlert= false;
				return true;
			}
		}
	}
</script>