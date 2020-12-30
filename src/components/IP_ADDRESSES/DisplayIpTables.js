import React, { useContext } from "react";
import { GlobalContext } from "../App";
import DisplayIpData from "./DisplayIpData";
import { FiEdit } from "react-icons/fi";
import { ACTIONS } from "../App";
import { FaCheckCircle } from "react-icons/fa";
export default function IpDisplay() {
  const {
    ipAddresses,
    auxiliaryInformation,
    handleIpAddressesEditToggle,
    ipAddressEditToggle,
    auxiliaryInformationDispatch,
  } = useContext(GlobalContext);

  const { subnet,gateway, dns1, dns2, ntp } = auxiliaryInformation.ipAuxiliary;
  console.log(auxiliaryInformation.ipAuxiliary)

  const ipData = ipAddresses.map((ipAddress) => {
    return <DisplayIpData key={ipAddress.id} {...ipAddress} />;
  });
  
  const  {ipAuxiliary} = auxiliaryInformation
 
  function updateIpAuxiliary(e){
    const updatedIpAuxiliary = {...ipAuxiliary,...e,};
    auxiliaryInformationDispatch({type:ACTIONS.CHANGE, payload:{ipAuxiliary:updatedIpAuxiliary}})
  }
  
  return (
    <>
      <div className="display__channel-ip-background">
        <div className="display__channel-ip-container">
          <table className="display__header-left">
            <thead>
              <tr>
                {!ipAddressEditToggle && (
                  <th
                    className="display__channel-header edit"
                    id="edit-column-header"
                    onClick={() => handleIpAddressesEditToggle(true)}
                  >
                    <div className="display__edit-all-text"> EDIT ALL</div>
                  </th>
                )}
                {ipAddressEditToggle && (
                  <th
                    className="display__channel-header edit selected"
                    id="edit-column-header-selected"
                    onClick={() => handleIpAddressesEditToggle(false)}
                  >
                    <FiEdit />
                    <div className="display__edit-all-text">ALL</div>
                  </th>
                )}
                <th className="display__channel-header">IP INTERFACE</th>
                <th className="display__channel-header">IP ADDRESS</th>
                {/* <th className="display__channel-header">PORT</th> */}
              </tr>
            </thead>
            {ipData}
          </table>
                  <div>
            <table className="display__ip-auxiliary">
              <thead>
                <tr>
                  <th
                    className="display__channel-header edit"
                    id="edit-column-header"
                    
                  >
                    <div className="display__edit-all-text"> </div>
                  </th>
                  <th className="display__channel-header">SUBNET</th>
                  <th className="display__channel-header">GATEWAY</th>
                  <th className="display__channel-header">DNS 1</th>
                  <th className="display__channel-header">DNS 2</th>
                  <th className="display__channel-header">NTP SERVER</th>
                </tr>
              </thead>
                  
              {!ipAuxiliary.selected &&
              <tbody className="display__channel-data">
                <tr>
                  <td
                    onClick= {(e) => updateIpAuxiliary({selected:true}) }
                    id="edit-column"
                  >
                    {" "}
                    <FiEdit />
                  </td>
                  <td className="display__text-box large" id="subnet ">
                    {subnet}
                  </td>
                  <td className="display__text-box large" id="gateway">
                    {gateway}
                  </td>
                  <td className="display__text-box large" id="dns1">
                    {dns1}
                  </td>
                  <td className="display__text-box large" id="dns2">
                    {dns2}
                  </td>
                  <td className="display__text-box large" id="ntp">
                    {ntp}
                  </td>
                </tr>
              </tbody>}
              {ipAuxiliary.selected && (
        
        <tbody className="display__channel-data selected">
          <tr>
            <td
                onClick= {(e) => updateIpAuxiliary({selected:false}) }
              className="channel__edit-field"
              id="edit-column-selected"
            >
              {" "}
              <FaCheckCircle />
            </td>
            <td className="display__edit-text-box large">
              <input
                type="text"
                id="subnet"
                placeholder={subnet}
                onChange= {(e) => updateIpAuxiliary({subnet:e.target.value}) }
              />
            </td>
            <td className="display__edit-text-box large">
              <input
                type="text"
                id="gateway"
                placeholder={gateway}
                onChange= {(e) => updateIpAuxiliary({gateway:e.target.value}) }
              />
            </td>
            <td className="display__edit-text-box large">
              <input
                type="text"
                id="dns1"
                placeholder={dns1}
                onChange= {(e) => updateIpAuxiliary({dns1:e.target.value}) }
              />
            </td>
            <td className="display__edit-text-box large">
              <input
                type="text"
                id="dns2"
                placeholder={dns2}
                onChange= {(e) => updateIpAuxiliary({dns2:e.target.value}) }
              />
            </td>
            <td className="display__edit-text-box large">
              <input
                type="text"
                id="ntp"
                placeholder={ntp}
                onChange= {(e) => updateIpAuxiliary({ntp:e.target.value}) }
              />
            </td>
            </tr>
            </tbody>)}
            </table>
            </div>
        </div>
      </div>
    </>
  );
}
