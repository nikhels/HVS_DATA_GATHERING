import React,{ useContext } from 'react'
import { GlobalContext } from '../App'

export default function DisplayHeader() {
  const {
    equipmentTypeSelection,
    equipmentSelection,
    auxiliaryInformation
  } = useContext(GlobalContext)
  
  const {tsid,callLetters} = auxiliaryInformation


  return (

    <>
    
    <div className="display__sheet-header-container">
      <div className="display__sheet-header">{equipmentSelection} - Primary </div>
      <div className="display__sheet-header">{callLetters} {equipmentTypeSelection} Parameters </div>
      <div className="display__sheet-branding">
        Heartland Video Systems <br />
        1-800-332-7088
      </div> 
    
    </div>
    <div className="display__sheet-header-secondary">
      <div className="display__sheet-sub-header">TSID: {tsid}</div>
      {/* {channels[0].selected && <div className="display__editing-text"> EDITING CHANNELS</div>} */}
    </div>


  
    </>
  )
}
