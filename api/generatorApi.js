/*==  采用ES6标准generator函数处理异步流程   ==*/


/**
 * 获取主页数据
 * @param {[Object]} transition    [data钩子函数的过渡参数]
 * @yield {[Promise]} [生成器暂停语法]
 */
exports.getIndex= function* (transition) {
	let categories= yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/categories',{
					      headers:{
					          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
					      }
				    });
	 		let loves=  yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchdeals?city_id=100010000&sort=0&page=1&page_size=30',{
				      headers:{
				          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
				      }
				    })
	this.categories= categories.body.categories;
	this.loves= loves.body.data.deals;
	transition.next();
}



/**
 * 获取团单详情页数据
 * @param {[Object]} transition    [data钩子函数的过渡参数]
 * @yield {[Promise]} [生成器暂停语法]
 */
exports.getDetail= function* (transition) {
	let deals= yield this.$http.get( 'http://apis.baidu.com/baidunuomi/openapi/dealdetail?deal_id='+this.$route.params.id,{
					headers: {
						'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
					}
				});
				
				let cityIds= deals.body.deal.city_ids[0];
				let catId= deals.body.deal.cat_id;
				let subcatIds= deals.body.deal.subcat_ids;	
				subcatIds= subcatIds.join(',');				
				let taocan= deals.body.deal.buy_contents_json && JSON.parse(deals.body.deal.buy_contents_json).group_content;
				//因为糯米api的数据问题，做一下相应的处理
				if(Object.prototype.toString.call(taocan) === "[object Array]"){
					taocan.forEach(function(item,index){
						if(item.group_content != undefined){
							taocan= null;
						}
					});
				}

				//根据当前分类获取相关数据
				let detailTuiJian= yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchdeals?city_id='+ cityIds +'&cat_ids='+ catId +'&subcat_ids='+ subcatIds +'&page=1&page_size=10',{
							headers: {
								'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
							}
						});
				
				let detailTips= JSON.parse(deals.body.deal.consumer_tips_json);
				if(detailTips.show === null){
					this.detailTips= null;
				}else{
					this.detailTips= detailTips;
				}
				this.deal= deals.body.deal;
				this.detailTuiJian= detailTuiJian.body.data.deals;
				this.detailTaoCan= taocan;
				transition.next();
};

/**
 * 根据不同的搜索条件获取数据
 * @param {[Object]} transition    [data钩子函数的过渡参数]
 * @param {[Object]} obj           [查询参数]
 * @yield {[Promise]} [生成器暂停语法]	
 */
exports.getList= function* (transition,obj) {
			obj= obj || {};
			// console.log(obj.catIds)
			let catIds= obj.catIds || 326 ;
			let cityId= obj.cityId || 100010000;
			let list= yield this.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchshops?city_id='+ cityId +'&cat_ids='+ catIds,{
				headers: {
					'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
				}
			});

			if(list.body.data === null){
					this.err= '没有数据';
					transition.next()
			}else{			
					this.shops= list.body.data.shops;
					transition.next()
			}

			

}

