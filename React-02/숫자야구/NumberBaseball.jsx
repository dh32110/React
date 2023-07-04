import React, { useState, useRef, useCallback } from 'react';
import Try from './Try';

const getNumbers = () => { // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수, this를 사용하지 않는 경우 함수를 class 밖에서 선언할 수 있다., Hooks로 바꿀 때에도 영향을 받지 않아 독립적으로 존재 가능
   const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   const array = [];
   for (let i = 0; i < 4; i += 1){
      const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
   }
   return array;
}

const NumberBaseball = () => {
   const [answer, setAnswer] = useState(getNumbers); //getNumbers()이렇게 넣으면 안된다. 함수컴포넌트 특성 상 전체가 리렌더링 되는데 getNumbers()는 처음 한번만 적용되기 때문에 쓸데없이 매번 실행된다.
   // useState는 값을 넣으면 data에 값이 설정되지만 함수를 넣으면 함수의 return 값이 data로 들어가고 그 다음부터는 실행되지 않는다.
   //getNumbers() 이렇게 써도 문제되지는 않는다 초기값이기 때문에 useState가 알아서 첫번째 값만 넣어준다. 다만, 쓸데없이 리렌더링 되는게 문제다. 비효율적임 lazy init이라고 한다.
   const [value, setValue] = useState('');
   const [result, setResult] = useState('');
   const [tries, setTries] = useState([]);
   const inputEl = useRef(null);

   const onSubmit = useCallback((e) => { // 화살표 함수를 사용하지 않으면 this를 사용할 때 에러가 생긴다. 화살표함수를 쓰지 않으려면 constructor를 사용해야한다.
      e.preventDefault();
      if(value === answer.join('')) { // 답을 비교
         setTries((prevTries) => ([// 옛날 값으로 현재 값을 할 때에는 함수형 setState 사용
            ...prevTries,
            {
               try: value, 
               result: '홈런!',
            }
         ]));
         setResult('홈런!');
         alert('게임을 다시 시작합니다!');
         setValue('');
         setAnswer(getNumbers());
         setTries([]);
         inputEl.current.focus();
      } else { // 답이 틀렸을 때
         const answerArray = value.split('').map((v) => parseInt(v));
         let strike = 0;
         let ball = 0;
         if(tries.length >= 9){ // 10번 이상 틀렸을 때
            setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
         } else { // 10번 이내로 틀렸을 때
            for (let i = 0; i < 4; i += 1){
               if (answerArray[i] === answer[i]){
                  strike += 1;
               } else if (answer.includes(answerArray[i])){
                  ball += 1;
               }
            }
            // 몇 볼 몇 스트라이크인지 알려주고 기회 더 준다.
            setTries((prevTries) => ([
               ...prevTries,
               {
                  try: value,
                  result: `${strike} 스트라이크, ${ball} 볼입니다.`
               }
            ]));
            // input 창에 입력할 때 이 부분이 리렌더링 되는 이유는
            // 부모컴포넌트 numberBaseball이 리렌더링 될 때 자식 컴포넌트도 리렌더링 되기 때문이다.
            setValue('');
            inputEl.current.focus();
         }
      }
   }, [value, answer]);

   const onChange = useCallback((e) => setValue(e.target.value), []);

   return (
      <>
         <h1>{result}</h1>
         <form onSubmit={onSubmit}>
            <input ref={inputEl} maxLength={4} value={value} onChange={onChange} />
            <button>입력</button>
         </form>
         <div>시도: {tries.length}</div>
         <ul>
            {tries.map((v, i) => (// v = {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`} 이런 객체가 된다.
               <Try key={`${i + 1}차 시도: ${v.try}`} tryInfo={v} />
            ))}
         </ul>
      </>
   );
};

export default  NumberBaseball;
//es2015문법, 노드의 모듈과 es2015의 모듈은 다르지만 일부분 호환이 되어서 이렇게 사용가능함.
// default로 export한거는 import NumberBaseball로 가져오고
// default로 export하지 않고 export const hello = 'hello'이런 방식으로 한 것들은 import { hello }로 가져온다
// default는 한번만 쓸 수 있다.
// module.exports과 export default는 호환이 된다고 보면되지만 깊게 들어가면 좀 다르다.
// 노드 모듈 시스템에서 module.exports = {hello:'a'};와 exports.hello='a'는 같습니다.