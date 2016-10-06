<template>
	<div class="loading-warp">
		<div class="loading">
	        <span></span>
	        <span></span>
	        <span></span>
	        <span></span>
	        <span></span>
		</div>
		<!-- <div class="loading-tl">
		    正在加载中......
		</div> -->
	</div>	
</template>
<style lang="scss" scoped> 
	@import '../assets/styles/common/px2rem.scss';
	.loading-warp{
		width:px2rem(300px);
		height: px2rem(200px);
		position:fixed;
		left:50%;
		top:50%;
		margin-top:px2rem(-100px);
		margin-left: px2rem(-150px);
		text-align: center;
        z-index: 99;
		.loading-tl{
			width: 100%;
			position: absolute;
			left: 50%;
			bottom: 0;
			margin-left: px2rem(-150px);
			color: #4caf50;
			font-weight: bold;
			@include font-dpr(12px);
		}
	}
	.loading{
            // width: 80px;
            width: px2rem(100px);
            height: px2rem(40px);
            // height: 40px;
            margin: 0 auto;
            position:fixed;
			left:50%;
			top:50%;
			margin-top:px2rem(-20px);
			margin-left: px2rem(-50px);
        }
        .loading span{
            display: inline-block;
            // width: 8px;
            width: px2rem(8px);
            height: 100%;
            // border-radius: 4px;
            border-radius: px2rem(4px);
            background: lightgreen;
            -webkit-animation: load 1s ease infinite;
        }
        @-webkit-keyframes load{
            0%,100%{
                // height: 40px;
                height: px2rem(40px);
                background: lightgreen;
            }
            50%{
                // height: 70px;
                height: px2rem(70px);
                // margin: -15px 0;
                margin: px2rem(-15px) 0;
                background: lightblue;
            }
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.2s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.4s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.6s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.8s;
        }
</style>