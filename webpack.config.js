const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['./index.ts'],
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				  {
					loader: MiniCssExtractPlugin.loader,
					options: {
					  hmr: true,
					  reloadAll: true
					}
				  },
				  'css-loader',
				  'sass-loader'
				],
			  },
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
			'@utils': path.resolve(__dirname, 'src/utils')
		}
	},
	devServer: {
		port: 3000,
		hot: true
	  },
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	]
}
