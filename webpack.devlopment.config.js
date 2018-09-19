const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
})

const devMode = true;

module.exports = {
    mode: 'development',
    // resolve: {
    //     alias: {
    //         config: path.resolve(__dirname, 'config.development.js'),
    //         root: path.resolve(__dirname),
    //         app: path.resolve(__dirname, 'src')
    //     }
    // },
    entry: path.resolve('src/index.js'),
    output: {
        publicPath: '/public/',
        filename: 'bundle.js',
        path: path.join(__dirname, "public"),
        // hotUpdateChunkFilename: 'hot/hot-update.js',
        // hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },{
				test: filename => /^(?!.*module\.css$).*\.css/.test(filename),
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader'
				]
			}, {
				test: /\.module.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]_[local]_[hash:base64]',
							sourceMap: true,
							minimize: true
						}
					}
				]
			}

        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		}),
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]
}