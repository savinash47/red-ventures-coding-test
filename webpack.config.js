var path = require('path');
var webpack = require('webpack');
module.exports = {
	devtool: "cheap-module-source-map",
	entry: './client/App.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public/'
		// path: "/", // this is for dev server
		// filename: "bundle.js"
	},
	plugins: [
    	new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
     		test: /\.js?$/, 
    		loader: 'babel', 
      		exclude: /node_modules/,
      		query: {
            	presets: ['react', 'es2015']
        	}
    	},{ 
    		test: /\.css$/, 
    		loader: "style-loader!css-loader" 
    	}]
	}
}