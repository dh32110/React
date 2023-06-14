import React, { Component } from 'react';

class ResponseCheck extends Component {
   state = {
      state: 'waiting', // state안에 state들어갈 수 있다. 현재 배경색을 담당한다.
      message: '클릭해서 시작하세요.',
      result: [],
   };

   timeout; // setTimeout 초기화
   startTime; // state를 사용할 때 렌더링되는 현상이 필요없을 때는 이렇게 해준다.
   endTime;

   onClickScreen = () => {
      const { state, message, result } = this.state;
      if(state === 'waiting'){
         this.setState({
            state: 'ready',
            message: '초록색이 되면 클릭하세요.',
         });
         this.timeout = setTimeout(() => {
            this.setState({
               state: 'now',
               message: '지금 클릭',
            });
            this.startTime = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); //2초~3초 랜덤
      } else if(state === 'ready'){ // ready에서는 클릭하면 안되서 클릭하는 코드가 없다. 성급하게 클릭
         clearTimeout(this.timeout); // 기존의 setTimeout을 없애줌
         this.setState({
            state: 'waiting',
            message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
         });
      } else if(state === 'now'){ // 반응속도 체크
         this.endTime = new Date();
         this.setState((prevState) => {
            return {
               state: 'waiting',
               message: '클릭해서 시작하세요.',
               result: [...prevState.result, this.endTime - this.startTime],
            }
         });
      }
   };

   renderAverage = () => { // 가독성을 위해 밖으로 빼줌
      const { result } = this.state;
      return result.length === 0 
         ? null 
         : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
   }

   render(){
      const { state, message } = this.state;
      // render 안에서는 반복문과 조건문을 사용할 수 없어 다른 방식으로 사용한다. 정확하게는 render의 return안의 jsx에서...
      // 빈 배열에서는 this.state.result.reduce((a, c) => a + c)이렇게 합계구하는 것을 못 쓴다.
      // false, undefined, null은 jsx에서 태그없음을 의미합니다.
      // 조건문은 삼항 연산자로 작성한다.{this.state.result.length === 0 ? null}
      return (
         <>
            <div 
               id='screen' 
               className={state} 
               onClick={this.onClickScreen}
            >
               {message}
            </div>
            {this.renderAverage()}
         </>
      )
   }
}

export default ResponseCheck;