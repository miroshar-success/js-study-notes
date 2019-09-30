const {seller,goods,ratings} = require("./data.json");

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      scss:{
        data: `@import "~@/common/scss/variable.scss";`
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer:{
    before(app){
      app.get("/api/goods",function(req,res){
        res.json({
          msg:'ok',
          goods
        })
      }),
      app.get("/api/ratings",function(req,res){
        res.json({
          msg:"ok",
          ratings
        })
      }),
      app.get("/api/seller",function(req,res){
        res.json({
          msg:"ok",
          seller
        })
      })
    }
  }
}
