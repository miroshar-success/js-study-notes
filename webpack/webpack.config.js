const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    target:'web',
    entry:{
        index:path.join(__dirname,'src/index.js'),
        app:path.join(__dirname,'src/app.js'),
    },
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:40*1024,
                            mimetype:'image/png'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            hash:true
        })
    ]
}