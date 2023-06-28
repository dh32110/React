import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
   return(
      <BrowserRouter>
         <div>
            {/* 공통인 부분 */}
            <Link to='/game/NumberBaseball'>숫자야구</Link>
            &nbsp;
            <Link to='/game/Lotto'>Lotto</Link>
            &nbsp;
            <Link to='/game/Rsp'>Rsp</Link>
            &nbsp;
            <Link to='/game/index'>게임 매쳐</Link>
         </div>
         {/* 화면에 보이는 부분 */}
         <div>
            <Routes>
               <Route path='/' element={<GameMatcher />} />
               <Route path='/game/:name' element={<GameMatcher />} />
               {/* name 앞에 콜론 붙은 것들을 parameter라고 부르며 줄여서 params라고 한다. 이 부분은 동적으로 바뀐다. */}
            </Routes>
         </div>
      </BrowserRouter>
   );
};

export default Games;