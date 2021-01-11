import React, { useContext } from "react";
import { GlobalContext } from "../App";
import DisplayIpData from "./DisplayIpData";
import { ACTIONS } from '../DEFAULTS/Defaults'
import {EditIcon,SaveIcon, SaveAllIcon } from "../DEFAULTS/ButtonIcons";


export default function IpDisplay() {
  const {
    ipAddresses,
    auxiliaryInformation,
    handleIpAddressesEditToggle,
    ipAddressEditToggle,
    auxiliaryInformationDispatch,
  } = useContext(GlobalContext);

  const { subnet, gateway, dns1, dns2, ntp } = auxiliaryInformation.ipAuxiliary;


  const ipData = ipAddresses.map((ipAddress) => {
    return <DisplayIpData key={ipAddress.id} {...ipAddress} />;
  });

  const { ipAuxiliary } = auxiliaryInformation;

  function updateIpAuxiliary(e) {
    const updatedIpAuxiliary = { ...ipAuxiliary, ...e };
    auxiliaryInformationDispatch({
      type: ACTIONS.CHANGE,
      payload: { ipAuxiliary: updatedIpAuxiliary },
    });
  }

  return (
    <>
      <div className="display__background">
        <div className="display__channel-ip-container">
          <div>
          <table>
            <thead>
              <tr>
                {!ipAddressEditToggle && (
                  <th
                    className="display__header-normal edit"
                    id="edit-column-header"
                    onClick={() => handleIpAddressesEditToggle(true)}
                  >
                  
                    <div className="display__edit-all-text"> EDIT ALL</div>
                  </th>
                )}
                {ipAddressEditToggle && (
                  <th
                    className="display__header-normal edit selected"
                    id="edit-column-header-selected"
                    onClick={() => handleIpAddressesEditToggle(false)}
                  >
                    <SaveAllIcon />
                    
                  </th>
                )}
                <th className="display__header-normal large">IP INTERFACE</th>
                <th className="display__header-normal large">IP ADDRESS</th>
                {/* <th className="display__header-normal">PORT</th> */}
              </tr>
            </thead>
            <tbody>
            {ipData}
            </tbody>
          </table>
          </div>
          <div>
            <table className="display__ip-auxiliary">
              <thead>
                <tr>
                  <th
                    className="display__header-normal edit"
                    id="edit-column-header"
                  >
                    <div className="display__edit-all-text"> </div>
                  </th>
                  <th className="display__header-normal medium">SUBNET</th>
                  <th className="display__header-normal medium">GATEWAY</th>
                  <th className="display__header-normal medium">DNS 1</th>
                  <th className="display__header-normal medium">DNS 2</th>
                  <th className="display__header-normal medium">NTP SERVER</th>
                </tr>
              </thead>

              {!ipAuxiliary.selected && (
                <tbody>
                  <tr className="display__channel-data">
                    <td
                      onClick={(e) => updateIpAuxiliary({ selected: true })}
                      id="edit-column"
                    >
                      {" "}
                      <EditIcon />
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
                </tbody>
              )}
              {ipAuxiliary.selected && (
                <tbody>
                  <tr className="display__channel-data selected">
                    <td
                      onClick={(e) => updateIpAuxiliary({ selected: false })}
                      id="edit-column-selected"
                    >
                      {" "}
                      <SaveIcon />
                    </td>
                    <td className="display__edit-text-box large">
                      <input
                        type="text"
                        id="subnet"
                        defaultValue={subnet}
                        onChange={(e) =>
                          updateIpAuxiliary({ subnet: e.target.value })
                        }
                      />
                    </td>
                    <td className="display__edit-text-box large">
                      <input
                        type="text"
                        id="gateway"
                        defaultValue={gateway}
                        onChange={(e) =>
                          updateIpAuxiliary({ gateway: e.target.value })
                        }
                      />
                    </td>
                    <td className="display__edit-text-box large">
                      <input
                        type="text"
                        id="dns1"
                        defaultValue={dns1}
                        onChange={(e) =>
                          updateIpAuxiliary({ dns1: e.target.value })
                        }
                      />
                    </td>
                    <td className="display__edit-text-box large">
                      <input
                        type="text"
                        id="dns2"
                        defaultValue={dns2}
                        onChange={(e) =>
                          updateIpAuxiliary({ dns2: e.target.value })
                        }
                      />
                    </td>
                    <td className="display__edit-text-box large">
                      <input
                        type="text"
                        id="ntp"
                        defaultValue={ntp}
                        onChange={(e) =>
                          updateIpAuxiliary({ ntp: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
