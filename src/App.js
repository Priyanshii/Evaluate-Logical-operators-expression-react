import { useState } from 'react';
import SelectOptionComponent from './SelectOptionComponent';
import ArgumentsList from './SelectOptionComponent/ArgumentsList';
import './App.css';

function App() {
  
  const [argumentList, setArgumentList] = useState([{inputName: "My Arg", booleanValue: 0}]);
  const [result, setResult] = useState(undefined);

  const handleResult = ({id, value}) => {
    console.log(value);
    setResult((result) => {
      return value;
    });
  }

  const handleArgumentListChange = (updatedArgumentList) => {
    setArgumentList(updatedArgumentList);
  }

  return (
    <div className='mainContainer'>
      <h1 className='mainTitle'>Nested Logical Expression Evaluation</h1>
      <article>
        <section className='argumentList'>
          <span className='argumentListHeading'>Boolean Arguments List (argument name and its boolean value)</span>
          <ArgumentsList argumentList={argumentList} handleArgumentListChange={handleArgumentListChange}/>
        </section>
        <section className='selectContainer'>
          <span>Select from below and see the changes in Result:</span>
          <SelectOptionComponent id="0" handleResult={handleResult} argumentList={argumentList} /> 
        </section>
        <h3 className='result'>Result:  {`${result !== undefined ? (result == 1 ? 'TRUE' : 'FALSE') : undefined}`}</h3>
      </article>
    </div>
  );
}

export default App;
