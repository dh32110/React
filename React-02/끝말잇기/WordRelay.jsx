const React = require('react'); //npm에서 react를 불러온다.
// 분리할 때 주의할 점 - 쓰이는 애들을 꼭 불러와야한다.
const { useState, useRef } = React;

const WordRelay = () => {
   const [word,setWord] = useState('자동차');
   const [value,setValue] = useState('');
   const [result,setResult] = useState('');
   const inputRef = useRef(null);

   const onSubmit = (e) => {
      e.preventDefault();
      if(word[word.length - 1] === value[0]){
         setResult('딩동댕');
         setWord(value);
         setValue('');
         inputRef.current.focus();
      } else {
         setResult('땡');
         setValue('');
         inputRef.current.focus();
      }
   };

   const onChange = (e) => {
      // target 대신 currentTarget 사용해도 됨(정확하게 하기위해)
      setValue(e.target.value);
   };

// input에 value와 onChange는 세트이다. 그게 아니면 defaultValue={value}이다.
      return (
         <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
               <input ref={inputRef} value={value} onChange={onChange} type="text" />
               <button>입력</button>
               <div>{result}</div>
            </form>
         </>
      )
}

// 쪼갠 파일에서 사용하는 컴포넌트를 밖에서도 사용가능하게 함.
module.exports = WordRelay;