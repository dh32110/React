import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
   const [state, setState] = useState('waiting'); // state안에 state들어갈 수 있다. 현재 배경색을 담당한다.
   const [message, setMessage] = useState('클릭해서 시작하세요.');
   const [result, setResult] = useState('[]');
   const timeout = useRef(null); // ref로 this의 속성인 timeout,startTime,endTime을 표현한다.
   const startTime = useRef(); // ref는 안에 current가 들어있다. ref는 current에 넣어준다. 값을 가져올때도 항상 current를 붙여준다.
   const endTime = useRef(); // useRef에는 화면에 영향을 주지 않는 것을 넣어주면 된다.
   // useState는 return부분이 다시 실행되지만 useRef는 바뀔 때 return 부분이 다시 실행되지 않는다. timeout이나 interval은 ref를 이용한다.

   const onClickScreen = () => {
      if(state === 'waiting'){
         timeout.current = setTimeout(() => { // ref에 대입 하는 것으로는 렌더링이 이루어지지 않는다.
            setState('now');
            setMessage('지금 클릭');
            startTime.current = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); //2초~3초 랜덤
         setState('ready');
         setMessage('초록색이 되면 클릭하세요.');
      } else if(state === 'ready'){ // ready에서는 클릭하면 안되서 클릭하는 코드가 없다. 성급하게 클릭
         clearTimeout(timeout.current); // 기존의 setTimeout을 없애줌
         setState('waiting');
         setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
      } else if(state === 'now'){ // 반응속도 체크
         endTime.current = new Date();
         setState('waiting');
         setMessage('클릭해서 시작하세요.');
         setResult((prevResult) => {
            return [...prevResult, endTime.current - startTime.current];
         });
      }
   };

   const onReset = () => {
      setResult([]);
   }

   const renderAverage = () => { // 가독성을 위해 밖으로 빼줌
      return result.length === 0 
         ? null 
         : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
         </>
      
   }
      // false, undefined, null은 jsx에서 태그없음을 의미합니다.
      // 조건문은 삼항 연산자로 작성한다.{this.state.result.length === 0 ? null}
      return (
         <>
            <div 
               id='screen' 
               className={state} 
               onClick={onClickScreen}
            >
               {message}
            </div>
            {renderAverage()}
            {/* jsx안에 if문 사용하기 */}
            {/* {(() => { 즉시 실행함수로 만들어서 그 안에 작성한다.
               if (result.length === 0){
                  return null;
               } else {
                  return <>
                     <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                     <button onClick={onReset}>리셋</button>
                  </>
               }
            })()}  */}
            {/* jsx 안에 for문 사용하기(숫자야구 활용) */}
            {/* {(() => { for문도 즉시 실행함수로 만들어서 그 안에 작성한다. if문 for문 둘 다 가독성이 좋아보이지는 않는다.지저분하다.
               const array = [];
               for (let i = 0; i < TimeRanges.length; i++){
                  array.push(<Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />);
               }
               return array;
            })()} */}

            {/* jsx 배열안에 jsx 담아서 return하기 */}
            {/* return [ 항상 key를 넣어줘야 한다. 거의 쓰이지는 않는다.
               <div key='사과'>사과</div>
               <div key='배'>배</div>
               <div key='감'>감</div>
               <div key='귤'>귤</div>
               <div key='딸기'>딸기</div>
            ] */}
         </>
      )
}

export default ResponseCheck;