import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumbers(){
   console.log(getWinNumbers);
   const candidate = Array(45).fill().map((v, i) => i + 1);
   const shuffle = [];
   while (candidate.length > 0){
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
   } //while
   const bonusNumber = shuffle[shuffle.length - 1];
   const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
   return [...winNumbers, bonusNumber];
} // function

class Lotto extends Component {
   state = {
      winNumbers: getWinNumbers(), // 당첨숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false, // 재실행 스테이트
   };

   timeouts = [];

   runTimeout = () => {
      const {winNumbers} = this.state
      for(let i = 0; i < winNumbers.length - 1; i++){
         this.timeouts[i] = setTimeout(() => { // 비동기에서 let을 사용하면 클로져문제가 안생긴다.(es6문법)
            this.setState((prevState) => { // winBalls에 당첨 숫자 넣어주기
               return {
                  winBalls: [...prevState.winBalls, winNumbers[i]],
               }
            }); // setState
         }, (i + 1) * 1000); // setTimeout
      } // for
      this.timeouts[6] = setTimeout(() => { // bonus
         this.setState({
            bonus: winNumbers[6],
            redo: true,
         })
      }, 7000); //setTimeout
   }

   componentDidMount(){
      this.runTimeout();
   } // componentDidMount

   componentDidUpdate(prevProps, prevState) {
      if (this.state.winBalls.length === 0){// 업데이트 하고 싶은 상황을 잘 처리해줘야한다.
         this.runTimeout();
      }
   }

   componentWillUnmount(){
      this.timeouts.forEach((v) => {
         clearTimeout(v);
      });
   } // componentWillUnmount

   onClickRedo = () => { // 초기화
      this.setState({
         winNumbers: getWinNumbers(), // 당첨숫자들
         winBalls: [],
         bonus: null, // 보너스 공
         redo: false, // 재실행 스테이트
      });
      this.timeouts = [];
   }

   render(){
      const {winBalls, bonus, redo} = this.state;
      return (
         <>
            <div>당첨 숫자</div>
            <div id="result">
               {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
         </>
      ); // return
   } // render
} // class

export default Lotto;