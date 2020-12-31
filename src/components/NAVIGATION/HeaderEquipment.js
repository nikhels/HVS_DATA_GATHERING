import React, { useContext, useState } from 'react'
import { GlobalContext, NAVIGATION, ACTIONS } from '../App'
import TextField from '@material-ui/core/TextField'
import InputDropdown from '../INPUT/InputDropdown';
import StationSelection from '../INPUT/StationSelection'
// import useToggle from '../useToggle'
import { FaCheck} from 'react-icons/fa'
export default function HeaderEquipment() {
  const {
    setEquipmentTypeSelection,
    setEquipmentSelection,
    auxiliaryInformationDispatch,
    equipmentSelection,
    equipmentTypeSelection,
    navigationDispatch,
    resetEquipmentSheet
  } = useContext(GlobalContext)
  
  
 const [newEquipmentToggle,setNewEquipmentToggle] = useState()
 const [existingEquipmentToggle,setExistingEquipmentToggle] = useState()


function handleSetNewEquipmentToggle(){
  // window.localStorage.clear();
  resetEquipmentSheet()
  // window.location.reload();
  setNewEquipmentToggle(true)
  setExistingEquipmentToggle(false)
}
function handleSetExistingEquipmentToggle(){
  setNewEquipmentToggle(false)
  setExistingEquipmentToggle(true)
}



  function handleEquipmentTypeSelection(e){
   setEquipmentTypeSelection(e)
  }
  function handleEquipmentSelection(e){
    setEquipmentSelection(e)
    
  }

  function handleEquipmentApply(){
    // window.location.reload()
    navigationDispatch({type:NAVIGATION.CHANNELS})
  }
  
  // function handleExistingEquipmentSelection(e){
  //   setExistingParameters(e)
  // }

  const equipmentTypeSelectionData = {
    label:"Equipment Type",
    className:"input__dropdown large",
    functionCall: handleEquipmentTypeSelection,
    displayValue:equipmentTypeSelection,
    selection1:"Encoding",
    selection2:"PSIP",
    selection3:"Microwave",
    selection4:"Keying"
  }
  const equipmentSelectionData = {
    label:"Equipment",
    className:"input__dropdown large",
    functionCall: handleEquipmentSelection,
    displayValue:equipmentSelection,
    selection1:"Harmonic X2S",
    selection2:"Harmonic 9200",
    selection3:"Other Encoder",
  }

  return (
    <>
      <div className="header">
      <div className="header__input-container two-column">
      <div className="header__button-container">
        <button className="btn-secondary " onClick= {() => handleSetNewEquipmentToggle()}> ADD NEW</button> 
        <button className="btn-secondary " onClick= {() => handleSetExistingEquipmentToggle()}> FIND EXISTING </button>
      </div>
        <div className="header__input-container four-column">
        
        {!newEquipmentToggle && existingEquipmentToggle && <StationSelection />}
        
        {newEquipmentToggle && !existingEquipmentToggle && 
        <div className="">
            <TextField id="filled-basic"
              label="Call Letters"
              variant="filled"
              type="text"
              className="input__text-box large"
              size="small"
              color="secondary"
              onChange={(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{callLetters:(e.target.value)}})} />
          </div>}
          {newEquipmentToggle && !existingEquipmentToggle && <InputDropdown data={equipmentTypeSelectionData} />}
          
          {equipmentTypeSelection === "Encoding" && !existingEquipmentToggle && newEquipmentToggle && <InputDropdown data={equipmentSelectionData} />}
          
          {equipmentTypeSelection === "Microwave" && <div className="coming-soon"> MICROWAVE COMING SOON </div>}
          {equipmentTypeSelection === "PSIP" && <div className="coming-soon"> PSIP COMING SOON </div>}
          {equipmentTypeSelection === "Keying" && <div className="coming-soon"> KEYING COMING SOON </div>}
          
          {newEquipmentToggle &&  <button className="btn-secondary header__apply-btn " onClick={() => handleEquipmentApply()}><FaCheck /> APPLY </button>}
          {existingEquipmentToggle &&  <button className="btn-secondary header__apply-btn" onClick={() => handleEquipmentApply()} ><FaCheck /> APPLY </button>}
        </div>
        </div>
      </div>
    </>
  )
}
