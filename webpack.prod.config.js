const webpackBase = require('./webpack.base.config');
const webpackMerge = require('webpack-merge');
const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports = webpackMerge(webpackBase, {
    plugins:[
        new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
            onEnd: {
                delete: [   //首先需要删除项目根目录下的dist.zip
                    './architecture-demo.zip',
                ],
                archive: [ //然后我们选择dist文件夹将之打包成architecture-demo.zip并放在根目录
                    {source: './dist', destination: './architecture-demo.zip'},
                ]
            }
        })
    ]
});
