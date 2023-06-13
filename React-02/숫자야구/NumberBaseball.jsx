import React,{ Component } from 'react';
import Try from '/Try';

function getNumbers(){ // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수, this를 사용하지 않는 경우 함수를 class 밖에서 선언할 수 있다.
   const candidate = [1,2,3,4,5,6,7,8,9];
   const array = [];
   for (let i = 0; i < 4; i += 1){
      const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
   }
   return array;
}

class NumberBaseball extends Component {
   state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: [], // push 쓰면 안된다. 불변성과 관련, react가 무엇이 바뀌었는지 감지를 하지 못한다. 그래서 새로운 변수로 배열을 만들어서 기존의 배열을 복사한 후 새로운 값을 넣는다.
      // React의 렌더링하는 기준이 예전 state랑 현재 state랑 다를 때 렌더링을 한다.
   };

   onSubmit = (e) => { // 화살표 함수를 사용하지 않으면 this를 사용할 때 에러가 생긴다. 화살표함수를 쓰지 않으려면 constructor를 사용해야한다.
      const { result, value, tries, answer } = this.state; // 구조분해로 this.state를 지울 수 있다.
      e.preventDefault();
      if(value === answer.join('')){ // 답을 비교
         this.setState({
            result: '홈런!',
            tries: [...tries, { try: value, result: '홈런!' }]
         });
         alert('게임을 다시 시작합니다!');
         this.setState({ // 초기화 하여 숫자를 새로 뽑음
            value: '',
            answer: getNumbers(),
            tries: [],
         });
      } else { // 답이 틀렸을 때
         const answerArray = value.split('').map((v) => parseInt(v));
         let strike = 0;
         let ball = 0;
         if(tries.length >= 9){ // 10번 이상 틀렸을 때
            this.setState({
               result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
            });
            alert('게임을 다시 시작합니다!');
            this.setState({ // 초기화 하여 숫자를 새로 뽑음
               value: '',
               answer: getNumbers(),
               tries: [],
            });
         } else { // 10번 이내로 틀렸을 때
            for (let i = 0; i < 4; i += 1){
               if (answerArray[i] === answer[i]){
                  strike += 1;
               } else if (answer.includes(answerArray[i])){
                  ball += 1;
               }
            }
            this.setState({ // 몇 볼 몇 스트라이크인지 알려주고 기회 더 준다.
               tries: [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
               value: '',
            });
         }
      }
   }

   onChange = (e) => {
      console.log(this.state.answer);
      this.setState({
         value: e.target.value,
      });
   }

   render(){
      const { result, value, tries} = this.state; // 구조분해로 this.state를 지울 수 있다.
      return(
         <>
            <h1>{result}</h1>
            <form onSubmit={this.onSubmit}>
               <input maxLength={4} value={value} onChange={this.onChange} />
               <button type='submit'>입력</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
               {tries.map((v, i) => { // v = {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`} 이런 객체가 된다.
                  return (
                     <Try key={`${i + 1}차 시도:`} tryInfo={v} />
                  );
               })}
            </ul>
         </>
      );
   }
}

//es2015문법, 노드의 모듈과 es2015의 모듈은 다르지만 일부분 호환이 되어서 이렇게 사용가능함.
export default  NumberBaseball; // default로 export한거는 import NumberBaseball로 가져오고
// default로 export하지 않고 export const hello = 'hello'이런 방식으로 한 것들은 import { hello }로 가져온다
// default는 한번만 쓸 수 있다.
// module.exports과 export default는 호환이 된다고 보면되지만 깊게 들어가면 좀 다르다.
// 노드 모듈 시스템에서 module.exports = {hello:'a'};와 exports.hello='a'는 같습니다.