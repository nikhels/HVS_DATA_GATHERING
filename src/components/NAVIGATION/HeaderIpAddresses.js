import React, { useContext } from 'react'
// import useToggle from './useToggle'
import { GlobalContext, } from '../App'
import InputDropdown from '../INPUT/InputDropdown'
// import TextField from '@material-ui/core/TextField'
import { FaCheck} from 'react-icons/fa'

export default function HeaderIpAddresses() {
  const {    

    auxiliaryInformation,
    loadOrCreateIpAddresses,
    // equipmentSelection,
    handlePsipSourceSelection,
    setIpAddressesCount,
    ipAddressesCount,
  } = useContext(GlobalContext)

  const psipSourceData = {
    label:"PSIP Source",
    className:"input__dropdown large",
    functionCall: handlePsipSourceSelection,
    displayValue:auxiliaryInformation.psipInformation.psip,
    selection1: "Internal Spooling",
    selection2: "Downstream",
  }
  const ipCountSelection = {
    label:"IP Addresses Required ",
    className:"input__dropdown large",
    functionCall: setIpAddressesCount,
    displayValue:ipAddressesCount,
    selection1: "1",
    selection2: "2",
    selection3: "3",
    selection4: "4",
    selection5: "5",
    selection6: "6",
  }
  
 
 
  return (
    <>
    
    <div className="header">
    <div className="header__input-container six-column"> 
      <InputDropdown data = {psipSourceData}/> 
      <InputDropdown data = {ipCountSelection}/> 

          {/* <div> 
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
            </div> */}

      <button className="btn-secondary header__apply-btn" onClick= {() => loadOrCreateIpAddresses()}><FaCheck /> APPLY</button>
    </div>
</div>
    </>
  )
}
