import React, {useState, useCallback, useContext, memo} from 'react';
import { START_GAME, TableContext } from './MineSweeper';

const Form = memo(() => {
   const [row, setRow] = useState(10);
   const [cell, setCell] = useState(10);
   const [mine, setMine] = useState(20);
   const { dispatch } = useContext(TableContext);

   const onChangeRow = useCallback((e) => { // 불필요한 렌더링을 막기위해 useCallback을 넣어줌
      setRow(e.target.value);
   }, []);

   const onChangeCell = useCallback((e) => {
      setCell(e.target.value);
   }, []);

   const onChangeMine = useCallback((e) => {
      setMine(e.target.value);
   }, []);

   const onClickBtn = useCallback(() => {
      dispatch({type: START_GAME, row, cell, mine});
   }, [row, cell, mine]);

   return (
      <div>
         <input type="number" placeholder='세로' value={row} onChange={onChangeRow} />
         <input type="number" placeholder='가로' value={cell} onChange={onChangeCell} />
         <input type="number" placeholder='지뢰' value={mine} onChange={onChangeMine} />
         <button onClick={onClickBtn}>시작</button>
      </div>
   );
});

export default Form;