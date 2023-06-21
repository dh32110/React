import React, {useCallback, useEffect, useRef, memo} from 'react';
import { CLICK_CELL } from './TicTacToe'

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
   // 무엇 때문에 전부 리렌더링 되는지 알기 위해 작성
   const ref = useRef([]);
   useEffect(() => {
      console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
      console.log(cellData, ref.current[3]);
      ref.current = [rowIndex, cellIndex, dispatch, cellData];
   }, [rowIndex, cellIndex, dispatch, cellData]);

   const onClick = useCallback(() => {
      console.log(rowIndex, cellIndex);
      if (cellData){
         return;
      }
      dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
   }, [cellData]);
   return (
      <td onClick={onClick}>{cellData}</td>
   ); // return
}); // Td

export default Td;