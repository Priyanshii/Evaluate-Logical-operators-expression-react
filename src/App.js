import { useEffect, useState } from 'react';
import SelectOptionComponent from './SelectOptionComponent';
import './App.css';

function App() {
  
  const [argumentList, setArgumentList] = useState([{inputName: "My Arg", booleanValue: 0}]);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    console.log(argumentList);
  },[argumentList])

  const handleAddArgument = () => {
    setArgumentList((argumentList) => {
      return [...argumentList, {inputName: "newarg", booleanValue: 0}]
    })
  }

  const handleInputNameChange = (e, inputIndex) => {
    const newArgumentList = argumentList?.map((arg, index) => {
      if(index === inputIndex){
        return{
          ...arg, inputName: e.target.value
        }
      }
      return {...arg};
    })
    setArgumentList(newArgumentList);
  }
  
  const handleBooleanValueChange = (e, inputIndex) => {
    console.log(e.target.value);
    const newArgumentList = argumentList?.map((arg, index) => {
      if(index === inputIndex){
        return{
          ...arg, booleanValue: e.target.value
        }
      }
      return {...arg};
    })
    setArgumentList(newArgumentList);
  }
  
  const handleResult = ({id, value}) => {
    console.log(value);
    setResult((result) => {
      return value;
    });
  }

  return (
    <div>
      <section>
      {
      argumentList.map((argument, index) => {
        const {inputName, booleanValue} = argument;
        return(
          <div key={index}>
            <input
              value={inputName}
              onChange={(e) => handleInputNameChange(e, index)}
              />
            <select value={booleanValue} onChange={(e) => handleBooleanValueChange(e, index)}>
              <option value={0}>false</option>
              <option value={1}>true</option>
            </select>
          </div>
        )}
      )}
      <button onClick={handleAddArgument}> + add arg</button>
      </section>
      <section>
        <SelectOptionComponent id="0" handleResult={handleResult} argumentList={argumentList} /> 
      </section>

      <span>result: {`${result !== undefined ? (result == 1 ? 'true' : 'false') : undefined}`}</span>
    </div>
  );
}

export default App;
