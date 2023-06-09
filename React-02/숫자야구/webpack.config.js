const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//  process.env.NODE_ENV = 'production'; 실서비스로 배포할 때에는 추가해주어야 한다.

module.exports = {
   name: 'numBaseball-setting',
   mode: 'development',
   devtool: 'eval',
   resolve: {
      extensions: ['.js', '.jsx']
   },
   //중요
   entry: {
      app: ['./client'],
   }, //입력
   module: {
      rules: [{
         test: /\.jsx?/,
         loader: 'babel-loader',
         options: {
            presets: [
               ['@babel/preset-env', {
                     targets: {
                        browsers: ['> 1% in KR'],
                     },
                     debug: true,
                  }], 
               '@babel/preset-react'
            ],
            plugins: [
               '@babel/plugin-proposal-class-properties',
               'react-refresh/babel'
            ],
         },
      }],
   }, //연결
   plugins: [
      new RefreshWebpackPlugin()
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/dist/'
   }, //출력
   devServer: {
      devMiddleware: { publicPath: '/dist/' },
	   static: {
         directory: path.resolve(__dirname)
      },
      hot: true,
   },
};
