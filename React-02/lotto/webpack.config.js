const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
   name: 'Lotto-setting',
   mode: 'development',
   devtool: 'eval',
   resolve: {
      extensions: ['.js', '.jsx']
   },
		//중요
   entry: {
      app: ['./client.jsx'],
   }, //입력
   module: {
      rules: [{
         test: /\.jsx?/,
         loader: 'babel-loader',
         options: {
            presets: [
               ['@babel/preset-env', {
                  targets: {
                     browsers: ['> 1% in KR','last 2 chrome versions'],
                  }, // targets
                  debug: true,
               }], //presets inner
               '@babel/preset-react'
            ], // presets
            plugins: [
               '@babel/plugin-proposal-class-properties',
               'react-refresh/babel',
            ], // plugins
         }, // option
      }] //rules
   }, // module
   plugins: [
      new RefreshWebpackPlugin(),
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/dist/',
   },
   devServer: {
      devMiddleware: {publicPath: '/dist/'},
      static: {
         historyApiFallback: true,
         directory: path.resolve(__dirname)
      },
      hot: true,
   }
}; // module.exports