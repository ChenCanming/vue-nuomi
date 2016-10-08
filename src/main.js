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
	'*': '/:cityId/:cityName'
})

//路由映射
router.map({
	//首页
	'/:cityId/:cityName': {
		name: 'home',
		component: function (resolve) {
			require(['./view/Index'], resolve)
		}
	},
	//团单详情页
	'/dealdetail/:id/:score/:commentNum': {
		name: 'dealdetail',
		component: function (resolve) {
			require(['./view/DealDetail'],resolve);
		}
	},
	//团单图文详情页
	'/imgtext/:id': {
		name: 'imgtext',
		component: function (resolve) {
			require(['./view/ImgText'],resolve);
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
	'/search/:keyword/:catId/:cityId': {
		name: 'search',
		component: function (resolve) {
			require(['./view/Loves'],resolve);
		}
	},
	//城市列表页
	'/city': {
		name: 'city',
		component: function (resolve) {
			require(['./view/City'],resolve);
		}
	}
});

router.start(App,"#app");
