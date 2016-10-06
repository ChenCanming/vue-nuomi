var Api= {
	/**
	 * 获取主页的分类数据
	 * @param  {[Object]} self [更改this的指向]
	 * @return {[Object]}      [Promise]
	 */
	getCategories (self) {
		return new Promise((resolve,reject) => {
					self.$http.get('http://apis.baidu.com/baidunuomi/openapi/categories',{
					      headers:{
					          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
					      }
				    }).then(function(res){
				    	resolve(res.body.categories);
				    });
				})
	},
	/**
	 * 获取主页的猜你喜欢数据
	 * @param  {[Object]} self [更改this的指向]
	 * @return {[Object]}      [Promise]
	 */
	getLoves (self) {
		return new Promise((resolve,reject) => {
					self.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchdeals?city_id=100010000&sort=0&page=1&page_size=30',{
				      headers:{
				          'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
				      }
				    }).then(function(res){
				    	// console.log(res.body.data.deals)
				    	resolve(res.body.data.deals);
				    });
				})
	},
	/**
	 * 获取团单详情数据
	 * @param  {[Object]} self [this的指向]
	 * @return {[Object]}      [promise]
	 */
	getDetail (self) {
		return new Promise((resolve,reject) => {
				self.$http.get( 'http://apis.baidu.com/baidunuomi/openapi/dealdetail?deal_id='+self.$route.params.id,{
					headers: {
						'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
					}
				}).then(function(res){
						var cityIds= res.body.deal.city_ids[0];
						var catId= res.body.deal.cat_id;
						var subcatIds= res.body.deal.subcat_ids;	
						subcatIds= subcatIds.join(',');
						var deal= res.body.deal;
						var detailTips= JSON.parse(res.body.deal.consumer_tips_json);
						var taocan= res.body.deal.buy_contents_json && JSON.parse(res.body.deal.buy_contents_json).group_content;
						//因为糯米api的数据问题，做一下相应的处理
						if(Object.prototype.toString.call(taocan) === "[object Array]"){
							taocan.forEach(function(item,index){
								if(item.group_content != undefined){
									taocan= null;
								}
							});
						}						

						self.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchdeals?city_id='+ cityIds +'&cat_ids='+ catId +'&subcat_ids='+ subcatIds +'&page=1&page_size=10',{
							headers: {
								'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
							}
						}).then(function(res){
							var detailTuiJian= res.body.data.deals;
							self.$http.get('http://apis.baidu.com/baidunuomi/openapi/dealshops?city_id='+ cityIds +'&deal_id='+ self.$route.params.id,{
								headers: {
									'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
								}
							}).then(function(res){
								var shops= res.body.shops;
								// console.log(shops)
								resolve({
									detailTaoCan: taocan,
									deal: deal,
									detailTips: detailTips,
									detailTuiJian: detailTuiJian,
									// shops: shops
								});
							})
							
						})


					})
				})
	},

	getList (self,obj) {
		return new Promise(function(resolve,reject){
			// console.log(typeof obj === "object")
			// console.log(obj)
			obj= obj || {};
			// console.log(obj.catIds)
			var catIds= obj.catIds || 326 ;
			var cityId= obj.cityId || 100010000;
			self.$http.get('http://apis.baidu.com/baidunuomi/openapi/searchshops?city_id='+ cityId +'&cat_ids='+ catIds,{
				headers: {
					'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
				}
			}).then(function(res){
				// console.log(res.body.data);
				if(res.body.data === null){
					reject('没有数据')
				}else{			
					resolve(res.body.data.shops);
				}
				
			})
		})
	},

	getCities (self) {
		return new Promise(function(resolve,reject){
			self.get('http://apis.baidu.com/baidunuomi/openapi/cities',{
				headers: {
					'apikey': '3d2bc7f8b79698ac42d48aa13bd4e135'
				}
			}).then(function(res){
				resolve(res.cities)
			})
		})
	}

}


module.exports= Api