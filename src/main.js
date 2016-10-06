import Vue from 'vue' ;
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueResource);

/*实例化路由*/
const router = new VueRouter({
    saveScrollPosition: true,
    transitionOnLoad: true
});

//重定向到首页
router.redirect({
	'*': '/'
})

//路由映射
router.map({
	//首页
	'/': {
		name: 'home',
		component: function (resolve) {
			require(['./view/Index'], resolve)
		}
	},
	//团单详情页
	'/dealdetail/:id/:score/:commentNum/:reservationRequired': {
		name: 'dealdetail',
		component: function (resolve) {
			require(['./view/DealDetail'],resolve);
		}
	},
	//分类详情页
	'/list/:catId/:cityId': {
		name: 'list',
		component: function (resolve) {
			require(['./view/List'],resolve);
		}
	},
	//搜索列表页
	'/search/:deals/:catId': {
		name: 'search',
		component: function (resolve) {
			require(['./view/Loves'],resolve);
		}
	}
});

router.start(App,"#app");
