const React = require('react'); //npm에서 react를 불러온다.
// 분리할 때 주의할 점 - 쓰이는 애들을 꼭 불러와야한다.
const { Component } = React;

class WordRelay extends Component {
   state = {
      // 바뀌는 부분을 state로 한다.
      word: '자동차',
      value: '',
      result: '',
   };

   onSubmit = (e) => {
      e.preventDefault();
      if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
         this.setState({
            result: '딩동댕',
            word: this.state.value,
            value:'',
         });
         this.input.focus();
      } else {
         this.setState({
            result: '땡',
            value:'',
         });
         this.input.focus();
      }
   };

   onChange = (e) => {
      // target 대신 currentTarget 사용해도 됨(정확하게 하기위해)
      this.setState({value: e.target.value});
   };

   input;
   onRefInput = (c) => {
      this.input = c;
   };


// input에 value와 onChange는 세트이다. 그게 아니면 defaultValue={this.state.value}이다.
   render(){
      return (
         <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmit}>
               <input ref={this.onRefInput} value={this.state.value} onChange={this.onChange} type="text" />
               <button>입력</button>
               <div>{this.state.result}</div>
            </form>
         </>
      )
   }
}

// 쪼갠 파일에서 사용하는 컴포넌트를 밖에서도 사용가능하게 함.
module.exports = WordRelay;