import React,{ useContext} from 'react'
import { GlobalContext } from '../App'
import DisplayIpData from './DisplayIpData'
import { FiEdit } from 'react-icons/fi'
export default function IpDisplay() {
  const {
    ipAddresses,
    auxiliaryInformation,
    handleIpAddressesEditToggle,
    ipAddressEditToggle 
  } = useContext(GlobalContext)
  
  const {dns1,dns2,ntp} = auxiliaryInformation
 
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
          <FiEdit /><div className="display__edit-all-text">ALL</div></th>}
          {ipAddressEditToggle &&
          <th className="display__channel-header edit selected" id ="edit-column-header-selected" onClick={() => handleIpAddressesEditToggle(false)}>
          <FiEdit /><div className="display__edit-all-text">ALL</div></th>}
          <th className="display__channel-header">INTERFACE</th>  
          <th className="display__channel-header">IP ADDRESS</th>
          <th className="display__channel-header">SUBNET</th>
          <th className="display__channel-header">GATEWAY</th>
          <th className="display__channel-header">PORT</th>
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
            <td className="display__text-box large">{dns1}</td>
            <td className="display__text-box large">{dns2}</td>
            <td className="display__text-box large">{ntp}</td>
          </tr>        
          </tbody>
      </table>
      </div>
      </div>  
      <div className="display__text-area-container">
            <textarea rows="4" cols="32" wrap="hard" placeholder = "Additional Notes" />
      </div>
      
      </div>
    </>
  )
}
