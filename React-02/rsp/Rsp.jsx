import React, { useState } from 'react';
import useInterval from './useInterval';

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
};

const Rsp = () => {
   const [result, setResult] = useState('');
   const [imgCoord, setImgCoord] = useState(rspCoords.바위);
   const [score, setScore] = useState(0);
   const [isRunning, setIsRunning] = useState(true); // interval을 멈추기 위한 state, true면 interval 돌아감

   const changeHand = () => {
      if(imgCoord === rspCoords.바위){
         setImgCoord(rspCoords.가위);
      } else if(imgCoord === rspCoords.가위){
         setImgCoord(rspCoords.보);
      } else if(imgCoord === rspCoords.보){
         setImgCoord(rspCoords.바위);
      }
   };

   useInterval(changeHand, isRunning ? 100 : null);

   // () => this.onClick('보') 에서 () =>를 지운 것을 아래의 onClick에 넣어 준다.
   // 그래서 onClick = (choice) => 에서 onClick = (choice) => () =>로 바뀐다.
   // React에서 많이 씀 (고차함수)
   const onClick = (choice) => () => {
      if (isRunning){ // 멈췄을 때 또 클릭하는 것을 막기
         setIsRunning(false);
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
         }
         setTimeout(() => {
            setIsRunning(true);
         }, 1000);
      }
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