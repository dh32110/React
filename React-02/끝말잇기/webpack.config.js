const path = require('path'); // 경로조작(node)

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
         presets: ['@babel/preset-env', '@babel/preset-react'],
         plugins: ['@babel/plugin-proposal-class-properties'],
      }, // babel의 옵션들을 이곳에 넣어줌
   }], // 규칙을 적용할 파일들
}, //연결

   output: {
      path: path.join(__dirname, 'dist'), // path.join 경로를 알아서 합쳐준다., __dirname - 현재 폴더 경로
      // (__dirname, 'dist')의미는 현재 폴더 경로 안에 있는 dist폴더이다.
      filename: 'app.js'
   }, //출력
};