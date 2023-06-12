import React,{ Component } from 'react';

function getNumbers(){ // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball {
   state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: [],
   };

   onSubmit = () => {

   }

   onChange = () => {

   }

   render(){
      return(
         <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmit}>
               <input maxLength={4} value={this.state.value} onChange={this.onChange} />
               <button>입력</button>
            </form>
            <div>시도: {this.state.tries.length}</div>
            <ul>
               {['like','like','like','like','like'].map((v) => { //React에서는 반복문을 map메서드로 사용하면 된다. 달라지는 부분을 배열로 만들면된다.(v)
                  return (
                     <li>{v}</li> // v를 받아오면 map의 배열에 v가 되서 받아오는 순서대로 배열로 들어간다.
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