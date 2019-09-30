const {goods,ratings,seller} = require('./data.json');
module.exports =  {
	devServer:{
		before(app){
			app.get('/api/goods',function(req,res){
				res.json({
					msg:200,
					goods
				})
			}),
			app.get('/api/ratings',function(req,res){
				res.json({
					msg:200,
					ratings
				})
			}),
			app.get('/api/seller',function(req,res){
				res.json({
					msg:200,
					seller
				})
			})
		}
	}
}