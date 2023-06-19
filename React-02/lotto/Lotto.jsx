import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

// useMemo - 복잡한 함수 결과값을 기억(함수의 return 값 ex-getWinNumbers의 return값)
// useRef - 일반 값을 기억
// useCallback - 함수 자체를 기억, 재실행 되었을 경우 해당 함수가 새로 생성되지 않는다.
// useCallback에서 사용하는 state는 두번째 인자인 배열에 넣어주어야한다. 해당 배열은 useEffect와 같다.
// 해당 배열이 바뀌면 새로 시작된다.
// 자식 컴포넌트에 props로 함수를 넘겨줄 때에는 useCallback을 꼭 해주어야한다.
// useCallback이 없으면 매번 새로운 함수가 생성되는데 자식 컴포넌트는 그걸 받아 매번 새로운 렌더링을 한다.(memo의 경우만 해당)
const Lotto = () => {// Hooks는 선언해주는 순서가 중요하다.
   const lottoNumbers = useMemo(() => getWinNumbers(),[]); // 배열에 들어간 요소가 바뀌지 않는한 다시 실행되지 않는다.
   const [winNumbers, setWinNumbers] = useState(lottoNumbers);
   const [winBalls, setWinBalls] = useState([]);
   const [bonus, setBonus] = useState(null);
   const [redo, setRedo] = useState(false);
   const timeouts = useRef([]);

   useEffect(() => {
      for(let i = 0; i < winNumbers.length - 1; i++){
         timeouts.current[i] = setTimeout(() => { // 비동기에서 let을 사용하면 클로져문제가 안생긴다.(es6문법), timeouts.current[i] 바뀌는 거 아님 배열에 요소를 넣어주는 것
            setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]); // setState
         }, (i + 1) * 1000); // setTimeout
      } // for
      timeouts.current[6] = setTimeout(() => { // bonus
         setBonus(winNumbers[6]);
         setRedo(true);
      }, 7000); //setTimeout
      return () => {//componentWillUnmount 수행
         timeouts.current.forEach((v) => {
            clearTimeout(v);
         });
      };
   }, [timeouts.current]); //useEffect, 빈 배열이면 componentDidMount와 같다.
   // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

   const onClickRedo = () => { // 초기화
      setWinNumbers(getWinNumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);
      timeouts.current = []; //timeouts.current 바뀜
   }
      return (
         <>
            <div>당첨 숫자</div>
            <div id="result">
               {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
         </>
      ); // return
}// Lotto

export default Lotto;