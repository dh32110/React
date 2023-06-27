import React from 'react';
import { WithRouter } from 'react-router-dom';

const GameMatcher = () => {
   console.log(props.history, props.match);
   return (
      <div>게임메쳐</div>
   );
}

export default WithRouter(GameMatcher);