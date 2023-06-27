import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../숫자야구/NumberBaseball';
import Lotto from '../lotto/Lotto';
import Rsp from '../rsp/Rsp'
import GameMatcher from './GameMatcher';

const Games = () => {
   
   return(
      <BrowserRouter>
         <div>
            {/* 공통인 부분 */}
            <Link to='game/숫자야구/NumberBaseball.jsx'>숫자야구</Link>
            &nbsp;
            <Link to='game/lotto/Lotto.jsx'>Lotto</Link>
            &nbsp;
            <Link to='game/rsp/Rsp.jsx'>Rsp</Link>
         </div>
         {/* 화면에 보이는 부분 */}
         <div>
            <Route path='/game/:name' Component={GameMatcher} />
            {/* name 앞에 콜론 붙은 것들을 parameter라고 부르며 줄여서 params라고 한다. 이 부분은 동적으로 바뀐다. */}
         </div>
      </BrowserRouter>
   );
}

export default Games;