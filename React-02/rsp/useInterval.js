import { useRef, useEffect, useState } from 'react';
// 커스텀 훅 - 어떤 특정한 훅 두개 이상이 반복될 때 보통 커스텀 훅을 만든다.

//  활용의 예시
// const [isRunning, setRunning] = useState(true);
// useInterval(() => {
//    console.log('hello');
// }, isRunning ? 1000 : null); setRunning이 false를 하는 순간 isRunning false가 되고 그럼 null이 된다.

function useInterval(callback, delay) {
   const savedCallback = useRef();

   useEffect(() => {
      savedCallback.current = callback;
   });

   useEffect(() => {
      function tick() {
         savedCallback.current();
      }

      if (delay !== null){
         let id = setInterval(tick, delay);
         return () => clearInterval(id);
      }
   }, [delay]);

   return savedCallback.current;
}

export default useInterval;