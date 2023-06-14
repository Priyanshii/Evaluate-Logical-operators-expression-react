import React, { useEffect, useState } from 'react'
import '../App.css'

const SelectOptionComponent = ({id, handleResult, argumentList}) => {

  const [selectOption, setSelectOption] = useState("select");
  const [constantBooleanValue, setConstantBooleanValue] = useState(0);
  const [argumentSelectedInputName, setArgumentSelectedInputName] = useState(0);
  const [activeArgumentIndex, setActiveArgumentIndex] = useState(0);
  const [selectBoxBooleanValue, setSelectBoxBooleanValue] = useState({0: undefined, 1: undefined});
  const [index, setIndex] = useState(2);

  useEffect(() => {
    handleArguementListUpdate();
  },[argumentList])

  const handleArguementListUpdate = () => {
    if(selectOption === "argument"){
      const boolValue = argumentList[activeArgumentIndex].booleanValue;
      handleResult({id, value: boolValue});
    }
  }
  
  const resetSelectedOption = () => {
    setSelectOption("select");
    handleResult({id, value:undefined});
  }

  const handleConstantSelectOption = (e) => {
    setConstantBooleanValue((prevValue) => {
      return e.target.value
    });
    handleResult({id, value: e.target.value});
  }
  
  const handleSelectArgumentInputName = (e) => {
    const boolValue = argumentList[e.target.value].booleanValue;
    setArgumentSelectedInputName(e.target.value);
    setActiveArgumentIndex(e.target.value);
    handleResult({id, value: boolValue});
  }
  
  const handleSelectOption = (e) => {
    setSelectOption(e.target.value);
    if(e.target.value === "constant"){
      handleResult({id, value: 0});
    }
    else if(e.target.value === "argument"){
      const boolValue = argumentList[0].booleanValue;
      handleResult({id, value: boolValue});
    }
    else if(e.target.value === "and"){
      const boolValue = Object.values(selectBoxBooleanValue).reduce((total, current) => total = total & current ,1);

      handleResult({id, value: boolValue});
    }
    else if(e.target.value === "or"){
      const boolValue = Object.values(selectBoxBooleanValue).reduce((total, current) => total = total | current ,0);

      handleResult({id, value: boolValue});
    }
  }
  
  useEffect(() =>{
    if(selectOption === "and"){
      const boolValue = Object.values(selectBoxBooleanValue).reduce((total, current) => total = total & current , 1);

      handleResult({id, value: boolValue});
    }
    if(selectOption === "or"){
      const boolValue = Object.values(selectBoxBooleanValue).reduce((total, current) => total = total | current , 0);

      handleResult({id, value:boolValue});
    }
  },[selectBoxBooleanValue, selectOption])
  
  const handleSelectBoxBooleanValue = ({id, value}) => {
    setSelectBoxBooleanValue((prevValue) => {
      return {...prevValue, [id]: value}
    });
    console.log(selectBoxBooleanValue);
  }
  
  const handleAddOp = () => {
    setSelectBoxBooleanValue((prevValue) => {
      return {...prevValue, [index]: undefined}
    });
    setIndex((index)=> index+1);
  }
  
  return (
    <section className='operatorWithArgumentContainer'> 
        {
          selectOption === "select"
          &&
          <div className='selectOperatorContainer'>
            <select value={selectOption} onChange={e => handleSelectOption(e)} >
              <option value="select" disabled>select...</option>
              <option value="constant">constant</option>
              <option value="argument">argument</option>
              <option value="and">and</option>
              <option value="or">or</option>
            </select> 
            <button onClick={()=>{resetSelectedOption()}}>
              &#215;
            </button>
          </div>
        }
        {
          selectOption === "constant"
          &&
          <div className='selectOperatorContainer'>
            <select value={constantBooleanValue} onChange={(e) => handleConstantSelectOption(e)}>
              <option value={0}>false</option>
              <option value={1}>true</option>
            </select>
            <button onClick={()=>{resetSelectedOption()}}>&#215;</button>
          </div>
        }
        {
          selectOption === "argument"
          &&
          <div className='selectOperatorContainer'>
            <select value={argumentSelectedInputName} onChange={(e) => handleSelectArgumentInputName(e)}>
              <option value="select" disabled>select...</option>
              {
                argumentList.map((arg, index) => {
                  return(<option value={index} key={index}>{arg.inputName}</option>);
                })
              }
            </select>
            <button onClick={()=>{resetSelectedOption()}}>&#215;</button>
          </div>
        }
        {
          (selectOption === "and" || selectOption === "or")
          &&
          <>
            <section className='logicalOperatorContainer'>
              <select value={selectOption} onChange={e => handleSelectOption(e)} >
                <option value="select" disabled>select...</option>
                <option value="constant">constant</option>
                <option value="argument">argument</option>
                <option value="and">and</option>
                <option value="or">or</option>
              </select> 
              <button onClick={()=>{resetSelectedOption()}}>&#215;</button>
            </section>
            <section className='subSection'>
              {
                Object.keys(selectBoxBooleanValue).map((input) => {
                  return(
                    <SelectOptionComponent id={input} key={input} handleResult={handleSelectBoxBooleanValue} argumentList={argumentList} />
                  )
                })
              }
            </section>
            <button onClick={()=>{(handleAddOp())}} className='addOperatorButton'>+ add op</button>
          </>
        }
    </section>
  )
}

export default SelectOptionComponent;
