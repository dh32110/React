import React, {Component} from 'react';

class Try extends Component { // Component를 사용하는 이유는 재사용성 때문이다.
   render() {
      const { tryInfo } = this.props; // 비구조화 할당으로 Hooks처럼 만들 수 있다.
      return (
         <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
         </li>
      );
   }
}

export default Try;