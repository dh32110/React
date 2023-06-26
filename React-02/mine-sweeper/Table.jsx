import React, { memo, useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSweeper';


const Table = memo(() => {
   const { tableData } = useContext(TableContext); // value.tableData를 가져온 것이다.
   return(
      <table>
         {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
      </table>
   );
});

export default Table;