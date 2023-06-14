import React from 'react'
import '../App.css'

const ArgumentsList = ({argumentList, handleArgumentListChange}) => {

  const handleArgumentInputNameChange = (e, inputIndex) => {
    const newArgumentList = argumentList?.map((arg, index) => {
      if(index === inputIndex){
        return{
          ...arg, inputName: e.target.value
        }
      }
      return {...arg};
    })
    handleArgumentListChange(newArgumentList);
  }
  
  const handleArgumentBooleanValueChange = (e, inputIndex) => {
    console.log(e.target.value);
    const newArgumentList = argumentList?.map((arg, index) => {
      if(index === inputIndex){
        return{
          ...arg, booleanValue: e.target.value
        }
      }
      return {...arg};
    })
    handleArgumentListChange(newArgumentList);
  }

  const handleAddArgument = () => {
    const newArgumentList = [...argumentList, {inputName: `newarg${argumentList.length}`, booleanValue: 0}];
    handleArgumentListChange(newArgumentList);
  }
  
  return (
    <div className='argumentContainer'>
      <section className='argumentListContainer'>
      {
        argumentList.map((argument, index) => {
          const {inputName, booleanValue} = argument;
          return(
          <div key={index} className='singleArgument'>
            <input
              value={inputName}
              onChange={(e) => handleArgumentInputNameChange(e, index)}
              />
            <select value={booleanValue} onChange={(e) => handleArgumentBooleanValueChange(e, index)} className='booleanValueSelect'>
              <option value={0}>false</option>
              <option value={1}>true</option>
            </select>
          </div>
      )}
      )}
      </section>
      <button onClick={handleAddArgument}> + add argument </button>
    </div>
  )
}

export default ArgumentsList