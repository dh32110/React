import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]); //toDo를 담는 array
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [...currentArray, toDo]); // ...currentArray로 작성하면 currentArray를 돌려준다.
    setToDo("");
  };
  const deleteBtn = (index) => {
    setToDos(
      (currentToDos) =>
        currentToDos.filter((_, currentIndex) => currentIndex !== index) // (_, currentIndex)에서 _는 명목변수 또는 자리변수등으로 불리며 여러가지 사용법 중에 사용하지 않는 변수를 표기할 때도 사용한다.
    );
  };
  return (
    <div>
      <h1>My To Dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do"
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteBtn(index)}>❌</button>{" "}
            {/* () => deleteBtn(index)이렇게 쓰는 이유는 바로 실행되지 않게 하기 위함. */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
