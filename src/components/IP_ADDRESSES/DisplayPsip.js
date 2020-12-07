import React, { useContext } from "react";
import { GlobalContext, ACTIONS } from "../App";
import { FiEdit } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

export default function DisplayPsip() {
  const { 
    auxiliaryInformationDispatch,
    auxiliaryInformation 
  } = useContext(GlobalContext);



  // const [psipData, setPsipData] = useState(initialPsipData);

  function handleChanges(e) {
    const psipChanges = { ...auxiliaryInformation.psipInformation, ...e };
    auxiliaryInformationDispatch({
      type: ACTIONS.CHANGE,
      payload: { psipInformation: psipChanges},
    });
  }

  const {
    psip1Name,
    psip1Ip,
    psip1Subnet,
    psip1Gateway,
    psip1Port,
    psip1Selected,
    secondaryPsipToggle,
    psip2Name,
    psip2Ip,
    psip2Subnet,
    psip2Gateway,
    psip2Port,
    psip2Selected,
    psipProvider,
    psipUsername,
    psipPassword,
  } = auxiliaryInformation.psipInformation

  console.log(auxiliaryInformation.psipInformation)

  return (
    <>
      <div className="display__channel-psip-background">
        <div className="display__channel-psip-container">
          <table className="display__header-left">
            <thead>
              <tr>
                <th
                  className="display__channel-header edit"
                  id="edit-column-header"
                  onClick={() => handleChanges({ secondaryPsipToggle: true })}
                >
                  <HiPlus />
                  <div className="display__edit-all-text">ADD</div>
                </th>
                <th className="display__channel-header">PSIP UNIT</th>
                <th className="display__channel-header">IP ADDRESS</th>
                <th className="display__channel-header">SUBNET</th>
                <th className="display__channel-header">GATEWAY</th>
                <th className="display__channel-header">PORT</th>
                <th className="display__channel-header">PROVIDER</th>
                <th className="display__channel-header">USERNAME</th>
                <th className="display__channel-header">PASSWORD</th>
                {/* <th className="display__channel-header">PORT</th> */}
              </tr>
            </thead>
            {!psip1Selected && (
              <tbody className="display__channel-data">
                <tr>
                  <td
                    onClick={() => handleChanges({ psip1Selected: true })}
                    id="edit-column"
                  >
                    <FiEdit />
                  </td>
                  <td className="display__text-box large">{psip1Name}</td>
                  <td className="display__text-box large">{psip1Ip}</td>
                  <td className="display__text-box large">{psip1Subnet}</td>
                  <td className="display__text-box large">{psip1Gateway}</td>
                  <td className="display__text-box large">{psip1Port}</td>
                  <td className="display__text-box large">{psipProvider}</td>
                  <td className="display__text-box large">{psipUsername}</td>
                  <td className="display__text-box large">{psipPassword}</td>
                </tr>
              </tbody>
            )}

            {psip1Selected && (
              <tbody className="display__channel-data selected">
                <tr>
                  <td
                    onClick={() => handleChanges({ psip1Selected: false })}
                    className="channel__edit-field"
                    id="edit-column-selected"
                  >
                    {" "}
                    <FaCheckCircle />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="ip-address"
                      placeholder={psip1Name}
                      onChange={(e) =>
                        handleChanges({ psip1Name: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="ip-address"
                      placeholder={psip1Ip}
                      onChange={(e) =>
                        handleChanges({ psip1Ip: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip1Subnet}
                      onChange={(e) =>
                        handleChanges({ psip1Subnet: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip1Gateway}
                      onChange={(e) =>
                        handleChanges({ psip1Gateway: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip1Port}
                      onChange={(e) =>
                        handleChanges({ psip1Port: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psipProvider}
                      onChange={(e) =>
                        handleChanges({ psipProvider: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psipUsername}
                      onChange={(e) =>
                        handleChanges({ psipUsername: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psipPassword}
                      onChange={(e) =>
                        handleChanges({ psipPassword: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            )}
            {/* SECONDART PSIP UNIT */}
            {secondaryPsipToggle && !psip2Selected && (
              <tbody className="display__channel-data">
                <tr>
                  <td
                    onClick={() => handleChanges({ psip2Selected: true })}
                    id="edit-column"
                  >
                    <FiEdit />
                  </td>
                  <td className="display__text-box large">{psip2Name}</td>
                  <td className="display__text-box large">{psip2Ip}</td>
                  <td className="display__text-box large">{psip2Subnet}</td>
                  <td className="display__text-box large">{psip2Gateway}</td>
                  <td className="display__text-box large">{psip2Port}</td>
                </tr>
              </tbody>
            )}
            {secondaryPsipToggle && psip2Selected && (
              <tbody className="display__channel-data selected">
                <tr>
                  <td
                    onClick={() => handleChanges({ psip2Selected: false })}
                    className="channel__edit-field"
                    id="edit-column-selected"
                  >
                    {" "}
                    <FaCheckCircle />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="ip-address"
                      placeholder={psip2Name}
                      onChange={(e) =>
                        handleChanges({ psip2Name: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="ip-address"
                      placeholder={psip2Ip}
                      onChange={(e) =>
                        handleChanges({ psip2Ip: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip2Subnet}
                      onChange={(e) =>
                        handleChanges({ psip2Subnet: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip2Gateway}
                      onChange={(e) =>
                        handleChanges({ psip2Gateway: e.target.value })
                      }
                    />
                  </td>
                  <td className="display__edit-text-box large">
                    <input
                      type="text"
                      id="subnet"
                      placeholder={psip2Port}
                      onChange={(e) =>
                        handleChanges({ psip2Port: e.target.value })
                      }
                    />
                  </td>   
                     </tr> 
                      </tbody>
                      )}
          </table>
        </div>
      </div>
    </>
  );
}
