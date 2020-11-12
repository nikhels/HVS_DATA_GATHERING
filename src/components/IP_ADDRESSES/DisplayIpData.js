import React,{ useContext } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GlobalContext } from '../App'
// import IpInputField from './IpInputField'
import { ACTIONS } from '../App'
import { FaCheckCircle } from 'react-icons/fa'
export default function IpDisplayList(ipAddress) {
  const {
    name,
    ip,
    subnet,
    gateway,
  } = ipAddress
  
  
  const {
    ipAddressesDispatch,
    auxiliaryInformation,
    setIpAddressesEditCount,
    ipAddressesEditCount,
    ipAddresses,
    setIpAddressEditToggle
  } = useContext(GlobalContext) 
 
  function handleChanges(changes){
    if (changes.selected === true){
      setIpAddressesEditCount(ipAddressesEditCount + 1)
      if (ipAddressesEditCount === ipAddresses.length-1)  setIpAddressEditToggle(true)
    }
    if (changes.selected === false) {
      if (ipAddressesEditCount >= 1) setIpAddressEditToggle(false)
      setIpAddressesEditCount(ipAddressesEditCount - 1)
    }
    ipAddressesDispatch({type:ACTIONS.CHANGE, payload: {id:ipAddress.id, ipAddress:{...ipAddress,...changes}}})
  }

  return (
    <>
    {!ipAddress.selected && <tbody className = "display__channel-data">
    <tr>
      <td onClick={() => handleChanges({selected:true})} id="edit-column"> <FiEdit /></td>
      <td className="display__text-box large">{name}</td>
      <td className="display__text-box large">{ip}</td>
      <td className="display__text-box large">{subnet}</td>  
      <td className="display__text-box large">{gateway}</td>    
      { name === "IP 3 - PSIP" &&
      <td className="display__text-box small">{auxiliaryInformation.psipPort}</td>}  
      { name !== "IP 3 - PSIP" &&
      <td className="display__text-box small">N/A</td>}  
    </tr>
    </tbody>}
    
    {ipAddress.selected && <tbody className = "display__channel-data selected">
    <tr>
      <td onClick={() => handleChanges({selected:false})} className="channel__edit-field" id="edit-column-selected" > <FaCheckCircle /></td>
      <td className="display__text-box large">{name}</td>
      <td className="display__edit-text-box large">
          <input 
          type="text" 
          id="ip-address"
          placeholder={ip} 
          onChange={(e) => handleChanges({ip:e.target.value})}
           /> 
      </td>
      <td className="display__edit-text-box large">
      <input 
        type="text"
        id="subnet"
    
        placeholder={subnet} 
        onChange={(e) => handleChanges({subnet:e.target.value})}
           /> 
      </td>  
      <td className="display__edit-text-box large">
      <input type="text"
        id="gateway"
   
        placeholder={gateway} 
        onChange={(e) => handleChanges({gateway:e.target.value})}
           /> 
      </td>    
      { name === "IP 3 - PSIP" &&
      <td className="display__text-box small">{auxiliaryInformation.psipPort}</td>}  
      { name !== "IP 3 - PSIP" &&
      <td className="display__text-box small">N/A</td>}  
      
    </tr>
    </tbody>}
    </>
  )

}
