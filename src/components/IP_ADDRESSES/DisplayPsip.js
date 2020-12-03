import React,{ useContext} from 'react'
import { GlobalContext } from '../App'
import { FiEdit } from 'react-icons/fi'

export default function DisplayPsip() {
  const {

    handleIpAddressesEditToggle,
    ipAddressEditToggle,

  } = useContext(GlobalContext)


  return (
    <>
    <div className="display__channel-ip-background">
    <table className="display__header-left">   
        <thead>
        <tr>
          {!ipAddressEditToggle &&
          <th className="display__channel-header edit" id ="edit-column-header" onClick={() => handleIpAddressesEditToggle(true) }>
          <FiEdit /><div className="display__edit-all-text">ALL</div></th>}
          {ipAddressEditToggle &&
          <th className="display__channel-header edit selected" id ="edit-column-header-selected" onClick={() => handleIpAddressesEditToggle(false)}>
          <FiEdit /><div className="display__edit-all-text">ALL</div></th>}
          <th className="display__channel-header">PSIP UNIT</th>  
          <th className="display__channel-header">IP ADDRESS</th>
          <th className="display__channel-header">SUBNET</th>
          <th className="display__channel-header">GATEWAY</th>
          <th className="display__channel-header">PORT</th>
          {/* <th className="display__channel-header">PORT</th> */}
          </tr>
      </thead>
      <tbody className = "display__channel-data">
      <tr>
        <td onClick={() => {}} id="edit-column"> <FiEdit /></td>
        <td className="display__text-box large">TEST</td>
        <td className="display__text-box large">TEST</td>
        <td className="display__text-box large">TEST</td>  
        <td className="display__text-box large">TEST</td>    
        <td className="display__text-box large">TEST</td>    
      </tr>
      
      </tbody>
      
      </table> 
</div>
    </>
  )
}
