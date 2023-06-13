import React from 'react';

const Try = ({ tryInfo }) => { // Component를 사용하는 이유는 재사용성 때문이다. , props를 {tryInfo}로 구조분해 할 수 있다.
      return (
         <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
         </li>
      );
}

export default Try;