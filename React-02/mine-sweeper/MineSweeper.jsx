import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
   MINE: -7,
   NORMAL: -1,
   QUESTION: -2,
   FLAG: -3,
   QUESTION_MINE: -4,
   FLAG_MINE: -5,
   CLICKED_MINE: -6,
   OPENED: 0, // 0이상이면 다 OPENED
};

export const TableContext = createContext({ // 초기값
   tableData: [],
   halted: true,
   dispatch: () => {},
});

const initialState = {
   tableData: [],
   data: {
      row: 0,
      cell: 0,
      mine: 0,
   },
   timer: 0,
   result: '',
   halted: true,
   openedCount: 0,
}

const plantMine = (row, cell, mine) => {
   console.log(row, cell, mine);
   const candidate = Array(row * cell).fill().map((arr, i) => {
      return i;
   });

   const shuffle = [];
   while (candidate.length > row * cell - mine){
      const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
      shuffle.push(chosen);
   }
   // table data
   const data = [];
   for (let i = 0; i < row; i++){
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++){
         rowData.push(CODE.NORMAL);
      }
   }
   for (let k = 0; k < shuffle.length; k++){ // 위치를 찾아 지뢰를 심음
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
   }
   console.log(data);
   return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER'

const reducer = (state, action) => {
   switch (action.type){
      case START_GAME:
         return {
            ...state,
            data: {
               row: action.row,
               cell: action.cell,
               mine: action.mine,
            },
            openedCount: 0,
            tableData: plantMine(action.row, action.cell, action.mine),
            halted: false,
            timer: 0,
         };
      case OPEN_CELL: {
         const tableData = [...state.tableData];
         tableData.forEach((row, i) => {
            tableData[i] = [...row];
         });
         const checked = [];
         let openedCount = 0;
         const checkAround = (row, cell) => {
            if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){// 상하좌우 칸이 아닌 경우 필터링
               return;
            }
            if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])){
               return;
            }// 닫힌 칸만 열기
            if (checked.includes(row + '/' + cell)){ // 이미 검사한 칸이면 리턴
               return;
            } else {
               checked.push(row + '/' + cell);
            } // 한 번 연칸은 무시하기
            let around = [
               tableData[row][cell - 1], tableData[row][cell + 1],
            ];
            if (tableData[row - 1]){ // 내 윗 줄이 있으면 그 윗줄 세칸을 검사 대상에 넣어줌
               around = around.concat( 
                  tableData[row - 1][cell - 1], 
                  tableData[row - 1][cell],
                  tableData[row - 1][cell + 1],
                  );
            }
            if (tableData[row + 1]){ // 내 아랫줄이 있으면 그 아랫줄 세칸을 검사 대상에 넣어줌
               around = around.concat( 
                  tableData[row + 1][cell - 1], 
                  tableData[row + 1][cell],
                  tableData[row + 1][cell + 1],
                  );
            }
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;// 지뢰의 갯수를 셈
            console.log(count)
            if (count === 0){
               if (row > -1){
                  const near = [];
                  if(row - 1 > -1){// 제일 윗칸을 클링하면 해당 칸보다 윗 칸은 없으므로 아래의 코드에 해당하는 칸을 없애주는 것
                     near.push([row - 1, cell - 1]);
                     near.push([row - 1, cell]);
                     near.push([row - 1, cell + 1]);
                  }
                  near.push([row, cell - 1]);
                  near.push([row, cell + 1]);
                  if(row + 1 < tableData.length){// 제일 아래칸을 클링하면 해당 칸보다 아래칸은 없으므로 아래의 코드에 해당하는 칸을 없애주는 것
                     near.push([row + 1, cell - 1]);
                     near.push([row + 1, cell]);
                     near.push([row + 1, cell + 1]);
                  }
                  near.forEach((n) => {
                     if (tableData[n[0]][n[1]] !== CODE.OPENED){
                        checkAround(n[0], n[1]);
                     }
                  });
               }
            }  // 내 기준으로 주변칸 검사, 매개변수화 시켰기 때문에 action 삭제
            if (tableData[row][cell] === CODE.NORMAL){ // 내 칸이 닫힌 칸이면 카운트 증가
               openedCount +=1;
            }
            tableData[row][cell] = count;
         };
         checkAround(action.row, action.cell);
         let halted = false;
         let result = '';
         if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){ // 승리
            halted = true;
            result = `${state.timer}초만에 승리하셨습니다.`;
         }
         return {
            ...state,
            tableData,
            openedCount: state.openedCount + openedCount,
            halted,
            result,
         }
      }
      case CLICK_MINE:{
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         tableData[action.row][action.cell] = CODE.CLICKED_MINE;
         return {
            ...state,
            tableData,
            halted: true,
         }
      }
      case FLAG_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if (tableData[action.row][action.cell] === CODE.MINE){
            tableData[action.row][action.cell] = CODE.FLAG_MINE;
         } else {
            tableData[action.row][action.cell] = CODE.FLAG;
         }
         return {
            ...state,
            tableData,
         };
      }
      case QUESTION_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if (tableData[action.row][action.cell] === CODE.FLAG_MINE){
            tableData[action.row][action.cell] = CODE.QUESTION_MINE;
         } else {
            tableData[action.row][action.cell] = CODE.QUESTION;
         }
         return {
            ...state,
            tableData,
         };
      }
      case NORMALIZE_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if (tableData[action.row][action.cell] === CODE.QUESTION_MINE){
            tableData[action.row][action.cell] = CODE.MINE;
         } else {
            tableData[action.row][action.cell] = CODE.NORMAL;
         }
         return {
            ...state,
            tableData,
         };
      }
      case INCREMENT_TIMER: {
         return {
            ...state,
            timer: state.timer + 1,
         }
      }
      default:
         return state;
   }
};

const MineSweeper = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const {tableData, halted, timer, result} = state;

   const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]); // 성능 최적화를 위해 객체 값을 useMemo로 묶어준다.
   // dispatch는 항상 같게 유지된다.
   useEffect(() => {
      let timer;
      if (halted === false){
         timer = setInterval(() => {
            dispatch({type: INCREMENT_TIMER});
         }, 1000);
      }
      return () => {
         clearInterval(timer);
      }
   }, [halted]);

   return(
      <TableContext.Provider value={value}> {/* 자식컴포넌트들이 접근할 수 있는 데이터 */}
         <Form />
         <div>{timer}</div>
         <Table />
         <div>{result}</div>
      </TableContext.Provider>
   );
}

export default MineSweeper;