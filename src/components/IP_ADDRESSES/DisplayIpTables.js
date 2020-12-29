import React,{ useContext} from 'react'
import { GlobalContext } from '../App'
import DisplayIpData from './DisplayIpData'
import { FiEdit } from 'react-icons/fi'
import { ACTIONS } from '../App'
export default function IpDisplay() {
  const {
    ipAddresses,
    auxiliaryInformation,
    handleIpAddressesEditToggle,
    ipAddressEditToggle,
    auxiliaryInformationDispatch 
  } = useContext(GlobalContext)
  
  const {dns1,dns2,ntp,notes} = auxiliaryInformation

 
  const ipData = ipAddresses.map(ipAddress => {
    return <DisplayIpData key = {ipAddress.id} {...ipAddress} />
  })
  

return (
    <>
    <div className="display__channel-ip-background">
      <div className="display__channel-ip-container">
        <table className="display__header-left">   
        <thead>
        <tr>
          {!ipAddressEditToggle &&
          <th className="display__channel-header edit" id ="edit-column-header" onClick={() => handleIpAddressesEditToggle(true) }>
          <div className="display__edit-all-text"> EDIT ALL</div></th>}
          {ipAddressEditToggle &&
          <th className="display__channel-header edit selected" id ="edit-column-header-selected" onClick={() => handleIpAddressesEditToggle(false)}>
          <FiEdit /><div className="display__edit-all-text">ALL</div></th>}
          <th className="display__channel-header">IP INTERFACE</th>  
          <th className="display__channel-header">IP ADDRESS</th>
          <th className="display__channel-header">SUBNET</th>
          <th className="display__channel-header">GATEWAY</th>
          {/* <th className="display__channel-header">PORT</th> */}
          </tr>
      </thead>
       {ipData}
      </table>
      
      <div>
      <table className="display__header-center">
        <thead>
          <tr>
            <th className="display__channel-header">DNS 1</th>
            <th className="display__channel-header">DNS 2</th>
            <th className="display__channel-header">NTP SERVER</th>
          </tr>
        </thead>
          <tbody className = "display__channel-data">
          <tr>
            <td className="display__text-box large" id="dns1">{dns1}</td>
            <td className="display__text-box large" id="dns2">{dns2}</td>
            <td className="display__text-box large" id="ntp">{ntp}</td>
          </tr>        
          </tbody>
      </table>
      </div>
      </div>  
      <div className="display__text-area-container">
            <textarea rows="4" cols="32" wrap="hard" 
            onChange = {(e) => auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{notes:e.target.value}})}
            value={notes}
            placeholder = "Additional Notes"

            />
            
            {/* <textarea rows="4" cols="32" wrap="hard" placeholder = "Additional Notes" /> */}

      </div>

      </div>
    </>
  )
}
