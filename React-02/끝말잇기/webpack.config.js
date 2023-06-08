const path = require('path'); // 경로조작(node)
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
   name: 'wordRelay-setting', // 웹팩 설정의 이름
   mode: 'development', // 실서비스에서는 production으로 바꿔주면 된다.
   devtool: 'eval', //빠르게 하겠다는 뜻
   resolve: {
      extensions: ['.js', '.jsx']
   },
   //중요
   entry: {
      // 배열로 입력한 다음 코드는 배열 안에 파일들을 합쳐 아래 filename의 app.js로 만들어 준다.
      // './WordRelay.jsx'을 지운 이유는 client.jsx에서 이미 불러와 사용하고 있기 때문에 webpack에서 처리해준다.
      // 확장자를 지워도 된다. 위의 resolve옵션이 확장자를 찾아준다.
      app: ['./client'],
   }, //입력

module: {
   rules: [{
      test: /\.jsx?/, // 정규 표현식으로 js파일과 jsx파일에 이 룰을 적용하겠다는 뜻
      loader: 'babel-loader', //'babel-loader' 이 룰을 적용하겠다.
      options: {
         // plugin들의 모음이 presets이다.
         presets: [
            ['@babel/preset-env', {
                  targets: {
                     browsers: ['> 1% in KR'],
                  },
                  debug: true,
               }], 
            '@babel/preset-react'
         ], // 기본적으로는 presets만 설정하고 에러가 난다면 에러에서 말하는 plugins를 설치해주면 된다.
         plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel' // 핫 리로딩 기능 추가
         ],
      }, // babel의 옵션들을 이곳에 넣어줌
   }], // 규칙을 적용할 파일들
}, //연결
   plugins: [
      new RefreshWebpackPlugin() // plugin 장착
   ],
   output: {
      // path는 실제의 경로, publicPath는 가상의 경로
      path: path.join(__dirname, 'dist'), // path.join 경로를 알아서 합쳐준다., __dirname - 현재 폴더 경로
      // (__dirname, 'dist')의미는 현재 폴더 경로 안에 있는 dist폴더이다.
      filename: 'app.js',
      publicPath: '/dist/'
   }, //출력
   devServer: {
      // webpack이 생성해주는 경로
      devMiddleware: {publicPath: '/dist/'}, // publicPath 옵션이 devMiddleware객체로 들어갔다.
      static: {directory: path.resolve(__dirname)}, // 실제로 존재하는 정적파일들(index.html)의 경로
      hot: true,
   },
};