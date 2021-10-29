const path = require('path')

/* module.exports = {
  mode:'none',
  entry:path.join(__dirname, 'src/index.js'),
  output:{
    filename:'webpack-number.js',
    path: path.join(__dirname,'dist'),
    clean: true,
    library:{
      name:'webpackNumbers',
      type:'umd'  //可以与CommonJS AMD 以及script标签使用
    }
    // we exposed the entry point as webpackNumbers so users can use it through script tag
  }
} */


// -------------------- 外部化lodash --------------------
module.exports = {
  mode:'none',
  entry:path.join(__dirname, 'src/index.js'),
  output:{
    filename:'webpack-number.js',
    path: path.join(__dirname, 'dist'),
    clean:true,
    library:{
      name:'webpackNumbers',
      type:'umd'
    }
  },
  externals:{
    lodash:{
      commonjs:'lodash',
      commonjs2:'lodash',
      amd:'lodash',
      root:'_'
    }
  }
}
