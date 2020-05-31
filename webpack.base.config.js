const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default ;//引用方式注意
const webpack = require('webpack')
module.exports = {
    mode: process.env.NODE_ENV,
    // 入口文件
    entry:path.resolve(__dirname, 'src/main.js'),
    //编译输出配置
    output: {
        path:path.resolve(__dirname,'dist'), // 输出文件夹
        filename: process.env.NODE_ENV !== 'production' ? 'js/[name].js' : 'js/[name]-[hash:8].js',
        chunkFilename: process.env.NODE_ENV !== 'production' ? 'js/[name].js' : 'js/[name]-[hash:8].js',//动态import文件名
    },
    devServer:{
        port:8082,  ///端口
        contentBase: path.join(__dirname, 'dist'),
        inline:true,
        open:true
    },
    resolve:{
        extensions: ['.js', '.vue'],  //js 和 vue 文件在import导入的时候不需要带扩展
        alias: {
            'vue$': 'vue/dist/vue.esm.js',  //vue官方指定写法，如果不写这个，则运行的时候会提示
            '@': path.resolve(__dirname, 'src')  //给src目录起个别名@ ，引用src目录的时候，可用@替代
        }
    },
    // 下面是loader的配置
    module:{
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader!style-loader', //
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'style-loader',//会在头部导入style标签，只针对.css文件
                    'css-loader'
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /(\.jpg|\.png|\.jpeg|\.gif)$/i,
                loader: 'url-loader',
                options:{
                    limit: 1024,
                    name: '[name]-[hash:7].[ext]'
                }
            }
        ]
    },
    // 插件的配置
    plugins:[
        new htmlPlugin({
            title: 'vue',
            filename:'index.html',//源文件名
            template:'./index.html',//指定打包压缩的文件
            minify:{
                removeComments:true,//清除注释
                collapseWhitespace:true//清理空格
            },
            hash: true
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),//清理构建文件夹
        new webpack.HotModuleReplacementPlugin(),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '95-100'
            }
        }),
        // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS的参数如下：
            test: /.js$/g,
            /*
            uglifyJS：用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。
            uglifyES：用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。
            */
            uglifyES: {
                    output: {
                        /*
                         是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
                         可以设置为false
                        */
                    beautify: false,
                    /*
                     是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                    */
                    comments: false
                },
                compress: {
                    /*
                     是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
                     不大的警告
                    */
                    warnings: false,
                    /*
                     是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                    */
                    drop_console: true,
                    /*
                     是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
                     转换，为了达到更好的压缩效果，可以设置为false
                    */
                    collapse_vars: true,
                    /*
                     是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
                     var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    */
                    reduce_vars: true
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV !== 'production' ? 'css/[name].css' : 'css/[name]-[hash:8].css',
            chunkFilename:  process.env.NODE_ENV !== 'production' ? 'css/[name].css' : 'css/[name]-[hash:8].css',
        })
    ]
}
