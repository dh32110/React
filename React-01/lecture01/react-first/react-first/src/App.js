import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from 'react';

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {console.log("i run only once.");}, []); //useEffect function은 쉽게 말해서 우리 코드가 딱 한번만 실행될 수 있도록 보호해준다.
  useEffect(() => {
    if (keyword !== '' && keyword.length > 5){console.log('keyword가 바뀔때만 바뀝니다.');}
  }, [keyword]); // []는 []안의 keyword가 변화할 때 코드를 실행할 거라고 react에게 알려준다.
  useEffect(() => {console.log('counter가 바뀔 때만 바뀝니다.');}, [counter]);
  useEffect(() => {console.log('counter & keyword가 바뀔 때만 바뀝니다.');}, [counter, keyword]);
  return (
    <div>
      <input value={keyword} onChange={onChange} type='text' placeholder='Search here...' />
      <h1>{counter}</h1>
      <button onClick={onClick}>클릭</button>
    </div>
  );
}

export default App;
