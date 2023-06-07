const React = require('react'); //npm에서 react를 불러온다.
// 분리할 때 주의할 점 - 쓰이는 애들을 꼭 불러와야한다.
const { Component } = React;

class WordRelay extends Component {
   state = {
      text: 'Hello, webpack',
   };

   render(){
      return <h1>{this.state.text}</h1>
   }
}

// 쪼갠 파일에서 사용하는 컴포넌트를 밖에서도 사용가능하게 함.
module.exports = WordRelay;