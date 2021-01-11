import React, { useContext } from 'react'
import { GlobalContext } from '../App'
import { ACTIONS } from '../DEFAULTS/Defaults'
import TextField from '@material-ui/core/TextField'
// import InputDropdown from '../INPUT/InputDropdown';
// import { ACTIONS } from './App'
import { FaCheck} from 'react-icons/fa'
export default function HeaderChannels() {
  const {
    auxiliaryInformation,
    auxiliaryInformationDispatch,
    // auxiliaryInformation,
    loadOrCreateChannels
    
  } = useContext(GlobalContext)
  
 
  return (
  <>
    {/* {equipmentSelection === "Harmonic X2S" && */}
    <div className="header">
      <div className="header__input-container six-column"> 
      <div className=""> 

        <TextField id="filled-basic" 
              label="Channel Count" 
              variant="filled" 
              type="text" 
              className="input__text-box small"
              size="small"
              color="secondary"
              // defaultValue={channelCount}
              onChange = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{channelCount:parseInt(e.target.value),info:auxiliaryInformation,}})} />
        </div>
        {/* <InputDropdown data = {unitCountData}/> */}
        <div className=""> 
        <TextField id="filled-basic" 
              label="Virtual Channel" 
              variant="filled" 
              type="text" 
              className="input__text-box small"
              size="small"
              color="secondary"
              
              onChange = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{virtual:parseInt(e.target.value),info:auxiliaryInformation}})}  /> 
        </div>
        <div className=""> 
        <TextField id="filled-basic" 
              label="Physical Channel" 
              variant="filled" 
              type="text" 
              className="input__text-box small"
              size="small"
              color="secondary"
              onChange = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{physical:parseInt(e.target.value)}})}
              /> 
        </div>
        {/* <div className=""> 
        <TextField id="filled-basic" 
              label="TSID" 
              variant="filled" 
              type="text" 
              className="input__text-box small"
              size="small"
              color="secondary"
              onChange = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{tsid:(e.target.value)}})}

              /> 
        </div> */}
                                  
        <div>
            <button className="btn-secondary header__apply-btn " onClick={() => loadOrCreateChannels()}><FaCheck /> APPLY </button>
        </div>
    </div>
    </div>
  {/* } */}
  </>
  )
}
