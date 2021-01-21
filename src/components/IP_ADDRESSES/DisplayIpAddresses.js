import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { UpdateReducer } from "../DEFAULTS/UpdateReducer";
import { ACTIONS } from "../DEFAULTS/Defaults";
import {
  IpAddressHeader,
  IpAuxiliaryHeader,
  IpAddresses,
  IpAuxiliary,
} from "./IpAddresses";
export default function IpDisplay() {
  const {
    ipAddresses,
    parameters,
    setIpAddressEditToggle,
    ipAddressEditToggle,
    setIpAddressesEditCount,
    parametersDispatch,
    ipAddressesDispatch,
    ipAddressesCount
  } = useContext(GlobalContext);



  function handleEditAll(editing) {
    if (editing === true) {
      setIpAddressEditToggle(true);
      setIpAddressesEditCount(ipAddressesCount);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_START,
        info: parameters,
        count: ipAddressesCount,
      });
    }
    if (editing === false) {
      setIpAddressEditToggle(false);
      setIpAddressesEditCount(0);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_STOP,
        info: parameters,
      });
    }
  }


  const updateAuxiliaryData = {
    location: parameters.ipAuxiliary,
    payload: "ipAuxiliary",
    info: parameters,
  };
  return (
    <>
      <div className="display__background">
        <div className="display__channel-ip-container">
          <div>
            <table>
              <thead>
                <tr>
                  <HeaderBuilder
                    headerData={IpAddressHeader}
                    functionData={{ editAll: handleEditAll,editing:ipAddressEditToggle }}
                  />
                </tr>
              </thead>
              <tbody>
                {ipAddresses.map((ipAddress) => {
                  const updateData = {
                    location: ipAddress,
                    payload: "ipAddress",
                    info: parameters,
                    key: ipAddress.id,
                  };
                  return (
                    <RowBuilder
                      key={ipAddress.id}
                      rowData={IpAddresses(ipAddress)}
                      selected={ipAddress.selected}
                      updateData={updateData}
                      changeFunction={ipAddressesDispatch}
                      updateFunction={UpdateReducer}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table className="display__ip-auxiliary">
              <thead>
                <tr>
                  <HeaderBuilder
                    headerData={IpAuxiliaryHeader}
                    functionData={{}}
                  />
                </tr>
              </thead>
              <tbody>
                <RowBuilder
                  // key={ipAddress.id}
                  rowData={IpAuxiliary(parameters.ipAuxiliary)}
                  selected={parameters.ipAuxiliary.selected}
                  updateData={updateAuxiliaryData}
                  changeFunction={parametersDispatch}
                  updateFunction={UpdateReducer}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
