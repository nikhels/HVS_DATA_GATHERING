import React, { useContext } from 'react'
// import useToggle from './useToggle'
import { GlobalContext, ACTIONS, } from '../App'
import InputDropdown from '../INPUT/InputDropdown'
import TextField from '@material-ui/core/TextField'
import { FaCheck} from 'react-icons/fa'

export default function HeaderIpAddresses() {
  const {    
    auxiliaryInformationDispatch,
    auxiliaryInformation,
    loadOrCreateIpAddresses,
    equipmentSelection
  } = useContext(GlobalContext)

  const psipSourceData = {
    label:"PSIP Source",
    className:"input__dropdown large",
    functionCall: handlePsipSourceSelection,
    displayValue:auxiliaryInformation.psip,
    selection1: "Internal Spooling",
    selection2: "Downstream",
  }
  
  function handlePsipSourceSelection(e){
    if (equipmentSelection === "Harmonic X2S") {
      if (e === "Downstream"){
        auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{psip:e,ipAddressesCount:2}}) 
      }
      if (e === "Internal Spooling"){
        auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{psip:e,ipAddressesCount:3}}) 
      }
    }
   else {
    auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{psip:e,ipAddressesCount:1}}) 
   }
  }
   
  return (
    <>
    
    <div className="header">
    <div className="header__input-container six-column"> 
      <InputDropdown data = {psipSourceData}/> 
          {/* {auxiliaryInformation.psip === "Internal Spooling" &&
            <div> 
            <TextField id="filled-basic" 
              label="PSIP Port" 
              variant="filled" 
              type="text" 
              className="input__text-box small"
              defaultValue= {auxiliaryInformation.psipPort}
              size="small"
              color="secondary"
              onChange = {(e) => ipAddressesDispatch({type:ACTIONS.CHANGE,payload:{psipPort:parseInt(e.target.value)}})} /> 
            </div>
          } */}
          <div> 
            <TextField id="filled-basic" 
              label="DNS Server 1" 
              variant="filled" 
              type="text"
              className="input__text-box small"
              placeholder= "8.8.8.8"
              defaultValue= {auxiliaryInformation.dns1}
              size="small"
              color="secondary"
              onBlur = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{dns1:e.target.value}})} 
              /> 
          </div>
          <div> 
            <TextField id="filled-basic" 
              label="DNS Server 2" 
              variant="filled" 
              type="text"
              className="input__text-box small"
              placeholder= "8.8.4.4"
              defaultValue= {auxiliaryInformation.dns2}
              size="small"
              color="secondary"
              onBlur = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{dns2:e.target.value}})} 
              /> 
          </div>
          <div> 
            <TextField id="filled-basic" 
              label="NTP Server" 
              variant="filled" 
              type="text"
              className="input__text-box small"
              placeholder= "129.6.15.28"
              defaultValue= {auxiliaryInformation.ntp}
              size="small"
              color="secondary"
              onBlur = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{ntp:e.target.value}})} 
              /> 
            </div>

      <button className="btn-secondary header__apply-btn" onClick= {() => loadOrCreateIpAddresses()}><FaCheck /> APPLY</button>
    </div>
</div>
    </>
  )
}
