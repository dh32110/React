import React, { memo } from 'react'; // memo는 PureComponent와 같은 기능을 해준다.
// memo의 역할 - 자식 컴포넌트는 state가 바뀌었을 때 props가 바뀌었을 때 부모컴포넌트가 리렌더링 됐을때 리렌더링 되는데 memo는 부모 컴포넌트 리렌더링 시 자식 컴포넌트가 리렌더링 되는 것을 막아준다.
const Try = memo(({ tryInfo }) => { // Component를 사용하는 이유는 재사용성 때문이다. , props를 {tryInfo}로 구조분해 할 수 있다.
      // 부모로 받은 props(tryInfo)는 직접 값을 바꾸면 안된다. props는 부모가 바꿔줘야 한다.
      // 만약 바꿔줘야 한다면 props를 state에 넣어준다. 그리고 state를 바꿔준다. 그래야 부모에 영향을 안준다.
      // 예시 - const [result, setResult] = useState(tryInfo.result);
      //       const onClick = () => {
      //          setResult('1');
      //  }
      //       return (
      //    <li>
      //       <div>{tryInfo.try}</div>
      //       <div onClick={onClick}>{result}</div>
      //    </li>
      // );
      return (
         <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
         </li>
      );
});
//Try.displayName = 'Try'; // memo를 씌우면 개발자 도구에서 컴포넌트 이름이 바뀌기 때문에 다시 원래대로 돌려주는 기능을 한다.

export default Try;