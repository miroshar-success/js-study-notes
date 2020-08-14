const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool:'inline-source-map',
    target:'web',
    entry:path.join(__dirname,'src/app.js'),
    output:{
        filename:'bundle.js',
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
            hash:true,
            title:'Output Management'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer:{
        port:'8081',
        host:"localhost",
        compress:true,
        overlay:{
            errors:true
        },
        open:true,
        hot:true,
        contentBase:path.join(__dirname,"dist")
    }
}