import React, { Component} from 'react';

const rspCoords = {//Coords는 좌표를 말함
   바위: '0',
   가위: '-142px',
   보: '-284px',
};

const scores = {
   가위: 1,
   바위: 0,
   보: -1,
}

const computerChoice = (imgCoord) => {
   return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
   })[0];
}

class Rsp extends Component {
   state = {
      result: '',
      imgCoord: rspCoords.바위,
      score: 0,
   };

   interval;
   // 라이프 사이클 - 컴포넌트가 client에서 불려와서 렌더링 될 때 컴포넌트가 DOM에 붙는 순간에 특정한 동작을 해줄 수 있다.(Hooks에는 없다.)
   // 클래스의 경우 -> constructor(state나 메서드 실행) -> render실행 -> ref를 사용했다면 ref를 설정하는 부분 실행 -> componentDidMount 실행 ->
   // (setState/props 바뀔 때 -> shouldComponentUpdate(return true인 경우) -> render실행 -> componentDidUpdate실행) -> 부모가 자식 컴포넌트 없앴을 때 -> componentWillUnmount 실행 -> 소멸
   componentDidMount() {// 렌더가 처음 실행되고 렌더가 성공적으로 실행되었다면 이 componentDidMount가 실행된다. 리렌더링이 일어날 때에는 실행되지 않는다.
      // setState를 사용해야하는데 어디서 써야할지 모를때 사용할 수 있다.
      // 여기에 비동기 요청을 많이 한다.
      // 예를 들어 setInterval() - 취소를 안해주면 계속 돌아감 그래서 this.interval에 넣어주고 위에 this.interval해주고 componentWillUnmount에 clearInterval해준다.
      // 취소 안해주면 계속 메모리를 먹어서 메모리 누수 현상이 생긴다. 항상 완료되지 않는 비동기 요청은 componentWillUnmount에서 정리를 해주어야한다.
      this.interval = setInterval(this.changeHand, 100);
   }

   // 비동기에서 밖의 변수 참조하면 클로져 문제 발생 - 안에 넣어줘서 해결

   // componentDidUpdate(){// 리렌더링 후에 실행된다.

   // }

   // 컴포넌트가 제거되는 경우
   componentWillUnmount() { // 컴포넌트가 제거되기 직전, 부모컴포넌트로 자식 컴포넌트를 지울 수 있다.
      // 여기서는 componentDidMount에서 했던 작업들을 제거하는 용도
      // 여기에는 비동기 요청 정리를 많이 한다.
      clearInterval(this.interval);
   }

   changeHand = () => {
      const {imgCoord} = this.state;
      if(imgCoord === rspCoords.바위){
         this.setState({
            imgCoord: rspCoords.가위,
         });
      } else if(imgCoord === rspCoords.가위){
         this.setState({
            imgCoord: rspCoords.보,
         });
      } else if(imgCoord === rspCoords.보){
         this.setState({
            imgCoord: rspCoords.바위,
         });
      }
   };

   // () => this.onClick('보') 에서 () =>를 지운 것을 아래의 onClick에 넣어 준다.
   // 그래서 onClick = (choice) => 에서 onClick = (choice) => () =>로 바뀐다.
   // React에서 많이 씀 (고차함수)
   onClick = (choice) => () => {
      const { imgCoord } = this.state;
      clearInterval(this.interval)
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터의 선택
      const diff = myScore - cpuScore;
      if (diff ===0){
         this.setState({
            result: '비겼습니다.!',
         });
      } else if ([-1, 2].includes(diff)){
         this.setState((prevState) => {
            return {
               result: '이겼습니다.!',
               score: prevState.score + 1,
            };
         });
      } else {
         this.setState((prevState) => {
            return {
               result: '졌습니다.!',
               score: prevState.score - 1,
            };
         });
      }
      setTimeout(() => {
         this.interval = setInterval(this.changeHand, 100);
      }, 1000);
   };
   render(){
      const {result, score, imgCoord} = this.state; //imgCoord 이미지의 좌표
      return(
         <>
         <div id='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
         <div>
            <button id='rock' className='btn' onClick={this.onClick('바위')}>바위</button>
            <button id='scissor' className='btn' onClick={this.onClick('가위')}>가위</button>
            <button id='paper' className='btn' onClick={() => this.onClick('보')}>보</button>
         </div>
         <div>{result}</div>
         <div>현재 {score}점</div>
         </>
         
      );
   }
}


export default RspClass;