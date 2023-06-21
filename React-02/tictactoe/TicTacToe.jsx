import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
   winner: '',
   turn: 'O',
   tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
   ],// ['', '', '']가 rowData가 된다.
   recentCell: [-1, -1], //최근 눌렀던 cell을 기억 초기화는 없는 칸으로
};

export const SET_WINNER = 'SET_WINNER'; // action의 이름은 대문자로 하고 상수로 따로 빼놓는 것이 보통의 규칙이다.
export const CLICK_CELL = 'CLICK_CELL'; // export를 붙이면 모듈이 된다.
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
   switch (action.type){
      // 기존 initialState를 직접 바꾸면 안됨. state.winner = action.winner; 이렇게 하면 안됨. 새로운 객체를 만들어서 바뀐 값만 바꿔줘야함 예시는 아래 return
      case SET_WINNER:
         return {
            ...state, // 객체를 새롭게 복사 - 스프레드 문법, 기존 state가 얕은 복사가 됨
            winner: action.winner, // 바뀔 부분만 새롭게 바꿔준다.
         };
      case CLICK_CELL: {
         const tableData = [...state.tableData]; //기존의 테이블데이터 얕은 복사
         tableData[action.row] = [...tableData[action.row]];
         tableData[action.row][action.cell] = state.turn;
         return {
            ...state,
            tableData,
            recentCell: [action.row, action.cell],
         };
      }
      case CHANGE_TURN: {
         return {
            ...state,
            turn: state.turn === 'O' ? 'X' : 'O',
         }
      }
      case RESET_GAME: {
         return {
            ...state,
            turn: 'O',
            tableData: [
               ['', '', ''],
               ['', '', ''],
               ['', '', ''],
            ],
            recentCell: [-1, -1],
         };
      }
      default:
         return state;
   }
} // action을 해석해서 state를 직접 바꿔주는 역할을 한다.

const TicTacToe = () => {
   const [state, dispatch] = useReducer(reducer, initialState); // 자식 컴포넌트에게 넘겨줄 것이 많다면 useReducer를 이용하요 하나로 통일시킬 수 있다.
   // const [winner, setWinner] = useState('');
   // const [turn, setTurn] = useState('O');
   // const [tableData, setTableData] = useState([['', '', ''],['', '', ''],['', '', '']]); // 3x3이기 떄문에 2차원 배열로 만들어줌
   // state는 부모컴포넌트에서 관리
   const { tableData, turn, winner, recentCell } = state;

   const onClick = useCallback(() => {
      // dispatch안에 들어가는 것은 action객체라고 부른다. 리덕스에서 따온 개념이다.
      // dispatch안에 있는 action객체를 dispatch가 실행시켜준다.
      dispatch({ type: SET_WINNER, winner: 'O' });
   }, []);

   useEffect(() => {
      const [row, cell] = recentCell;
      if (row < 0){
         return;
      }
      let win = false;
      if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
         win = true;
      }
      if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
         win = true;
      }
      if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
         win = true;
      }
      if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
         win = true;
      }
      if (win){ // 승리
         dispatch({type: SET_WINNER, winner: turn});
         dispatch({type: RESET_GAME});
      } else { //무승부 검사
         let all = true; // 무승부라는 뜻
         tableData.forEach((row) => {
            row.forEach((cell) => {
               if (!cell){
                  all = false;
               }
            });
         });
         if (all){
            dispatch({type: RESET_GAME});
         } else {
            dispatch({ type: CHANGE_TURN });
         }
      }
   }, [recentCell]); // 비동기인 state에서 뭔가를 처리하려면 useEffect를 사용하여야 한다.

      return (
         <>
            <Table onClick={onClick} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
         </>
      ); // return
} // TicTacToe

export default TicTacToe;