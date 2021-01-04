import React, { useContext } from "react";
import { GlobalContext, ACTIONS } from "../App";
import { HiPlus } from "react-icons/hi";
import { EditIcon, SaveIcon } from "../DEFAULTS/ButtonIcons";

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


  return (
    <>
      <div className="display__background">
        <div className="display__channel-psip-container">
          <table>
            <thead>
              <tr>
                <th
                  className="display__header-normal edit"
                  id="edit-column-header"
                  onClick={() => handleChanges({ secondaryPsipToggle: true })}
                >
                  <HiPlus />
                  <div className="display__edit-all-text">ADD</div>
                </th>
                <th className="display__header-normal medium ">PSIP UNIT</th>
                <th className="display__header-normal medium ">IP ADDRESS</th>
                <th className="display__header-normal medium ">SUBNET</th>
                <th className="display__header-normal medium ">GATEWAY</th>
                <th className="display__header-normal medium ">PORT</th>
                <th className="display__header-normal medium ">PROVIDER FTP</th>
                <th className="display__header-normal medium ">USERNAME</th>
                <th className="display__header-normal medium ">PASSWORD</th>
                {/* <th className="display__header-normal">PORT</th> */}
              </tr>
            </thead>
            {!psip1Selected && (
              <tbody className="display__channel-data">
                <tr>
                  <td
                    onClick={() => handleChanges({ psip1Selected: true })}
                    id="edit-column"
                  >
                    <EditIcon />
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
                    id="edit-column-selected"
                  >
                    {" "}
                    <SaveIcon />
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
                    <EditIcon />
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
                    id="edit-column-selected"
                  >
                    {" "}
                    <SaveIcon />
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
                  <td className="display__delete-line">
                    <button 
                    className="btn-secondary"
                    onClick={() => handleChanges({ psip2Selected: false, secondaryPsipToggle: false })}
                    >DELETE</button>
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
