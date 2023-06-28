import React from 'react';
import NumberBaseball from '../숫자야구/NumberBaseball';
import Lotto from '../lotto/Lotto';
import Rsp from '../rsp/Rsp';
import {useLocation, useNavigate, Routes, Route} from 'react-router';

const GameMatcher = () => {
   const location = useLocation();
   const navigate = useNavigate();
   let urlSearchParams = new URLSearchParams(location.search.slice(1));
   console.log(urlSearchParams.get('hello'));
   console.log(urlSearchParams.get('page'));
   return (
      <Routes>
         <Route path='NumberBaseball' element={<NumberBaseball />} />
         <Route path='Lotto' element={<Lotto />} />
         <Route path='Rsp' element={<Rsp />} />
         <Route path='*' element={<div>일치하는 게임이 없습니다.</div>} />
      </Routes>
   );
}

export default GameMatcher;