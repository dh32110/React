import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from 'react';

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("i run all the time");
  const iRunOnlyOnce = () => {
    console.log("i run only once.");
  };
  useEffect(iRunOnlyOnce, []); //useEffect function은 쉽게 말해서 우리 코드가 딱 한번만 실행될 수 있도록 보호해준다.
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>클릭</button>
    </div>
  );
}

export default App;
