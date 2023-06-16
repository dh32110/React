import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {//Coords는 좌표를 말함
   바위: '0',
   가위: '-142px',
   보: '-284px',
};

const scores = {
   가위: 1,
   바위: 0,
   보: -1,
};

const computerChoice = (imgCoord) => {
   return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
   })[0];
}

const Rsp = () => {
   const [result, setResult] = useState('');
   const [imgCoord, setImgCoord] = useState(rspCoords.바위);
   const [score, setScore] = useState(0);
   const interval = useRef();

   useEffect(() => { // useEffect도 useState나 useRef처럼 함수컴포넌트 안에 적어줘야한다. , 라이프 사이클 대체
      // componentDidMount, componentDidUpdate들과 비슷한 역할을 할 수 있다.(1 대 1 대응은 아니다.), useEffect는 여러번 쓸 수 있다.
      //console.log('다시 실행');
      interval.current = setInterval(changeHand, 100);
      return () => { // componentWillUnmount역할
         //console.log('종료');
         clearInterval(interval.current);
      }
// useEffect의 첫번째 인수는 함수고 두번째는 배열이다. 배열은 클로져 문제를 해결해준다.
// 배열에는 useEffect를 실행하고 싶은 state를 넣어줍니다. 넣은 값들이 바뀔 때 useEffect가 실행됩니다.
// 배열을 비워두면 처음 한번만 실행되고 그 뒤엔 실행되지 않는다., 여러개 넣어도 된다.
// 배열에는 꼭 useEffect를 다시 실행할 값만 넣어야 된다.
   }, [imgCoord]); // 매번 clearInterval을 하기 때문에 그냥 setTimeout을 하는 것과 동일합니다.


   const changeHand = () => {
      if(imgCoord === rspCoords.바위){
         setImgCoord(rspCoords.가위,);
      } else if(imgCoord === rspCoords.가위){
         setImgCoord(rspCoords.보,);
      } else if(imgCoord === rspCoords.보){
         setImgCoord(rspCoords.바위,);
      }
   };

   // () => this.onClick('보') 에서 () =>를 지운 것을 아래의 onClick에 넣어 준다.
   // 그래서 onClick = (choice) => 에서 onClick = (choice) => () =>로 바뀐다.
   // React에서 많이 씀 (고차함수)
   const onClick = (choice) => () => {
      clearInterval(interval.current)
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터의 선택
      const diff = myScore - cpuScore;
      if (diff === 0){
         setResult('비겼습니다.!');
      } else if ([-1, 2].includes(diff)){
         setResult('이겼습니다.!');
         setScore((prevScore) => prevScore + 1);
         console.log(score);
      } else {
         setResult('졌습니다.!');
         setScore((prevScore) => prevScore - 1);
         console.log(score);
      }
      setTimeout(() => {
         interval.current = setInterval(changeHand, 100);
      }, 1000);
   };
      return(
         <>
         <div id='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
         <div>
            <button id='rock' className='btn' onClick={onClick('바위')}>바위</button>
            <button id='scissor' className='btn' onClick={onClick('가위')}>가위</button>
            <button id='paper' className='btn' onClick={onClick('보')}>보</button>
         </div>
         <div>{result}</div>
         <div>현재 {score}점</div>
         </>
         
      );
   }


export default Rsp;