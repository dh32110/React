import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
   state = {
      counter: 0,
      array: [],
   }

//   shouldComponentUpdate = (nextProps, nextState, nextContent) => { // React에서 지원을 하는 메서드이다.
//    if(this.state.counter !== nextState.counter){ //어떤 경우에 렌더링을 해줘야할지 적어줘야 한다.
//       return true;
//    }
//    return false;
//    } 이것과 같은 기능을 가진 것이 PureComponent다. return true할지 false할지 자동으로 구현한다.

   onClick = () => {
      const array = this.state.array;
      array.push(1);
      this.setState({
         array: [...this.state.array, 1], //PureComponent도 배열이나 객체같은 참조관계가 있는 구조가 생기면 어려워한다.
      }); // setState만 호출하면 렌더링 된다. 새로운 array를 만들고 싶다면 [...this.state.array, 1]이렇게 해야한다.
   } // {a: 1}에서 setState{a: 1}을 할 때 새로 렌더링하므로 state에 객체 구조를 안쓰는게 좋다.

   render(){
   console.log('렌더링', this.state);
   return (
      <div>
         <button onClick={this.onClick}>클릭</button>
      </div>
   )
   }
}

export default RenderTest;