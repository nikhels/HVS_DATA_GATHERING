import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import { PsipATSC1Header, PsipATSC1 } from "../PSIP/PsipATSC1";
import { CloseIcon } from "../DEFAULTS/ButtonIcons";
import { UpdateReducer } from "../DEFAULTS/UpdateReducer";

export default function DisplayPsip() {
  const { parametersDispatch, parameters } = useContext(
    GlobalContext
  );

  const {
    psipInformation: { info, PSIP1, PSIP2 },
  } = parameters;

  const updatePSIPData = {
    location: info,
    payload: "info",
    id: "psipInformation",
  };
  const updatePSIP1Data = {
    location: PSIP1,
    payload: "PSIP1",
    id: "psipInformation",
  };
  const updatePSIP2Data = {
    location: PSIP2,
    payload: "PSIP2",
    id: "psipInformation",
  };

  function psipAddRemove(toggle) {
    switch (toggle) {
      case "add":
        if (info.count < 2) {
          UpdateReducer(
            { count: info.count + 1 },
            updatePSIPData,
            parametersDispatch
          );
          UpdateReducer(
            { selected: true },
            updatePSIP2Data,
            parametersDispatch
          );
        }
        break;
      case "remove":
        UpdateReducer(
          { count: info.count - 1 },
          updatePSIPData,
          parametersDispatch
        );
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="display__background">
        <div className="display__channel-psip-container">
          <table>
            <thead>
              <tr>
                <HeaderBuilder
                  functionData={{addOrRemove:psipAddRemove}}
                  headerData={PsipATSC1Header}
                />
              </tr>
            </thead>
            <tbody>
              <RowBuilder
                rowData={PsipATSC1(PSIP1)}
                selected={PSIP1.selected}
                selectionKey={"selected"}
                updateData={updatePSIP1Data}
                changeFunction={parametersDispatch}
                updateFunction={UpdateReducer}
              />
              {info.count > 1 && (
                <RowBuilder
                  rowData={PsipATSC1(PSIP2)}
                  selected={PSIP2.selected}
                  selectionKey={"selected"}
                  updateData={updatePSIP2Data}
                  changeFunction={parametersDispatch}
                  updateFunction={UpdateReducer}
                />
              )}
            </tbody>
          </table>
          {info.count > 1 && PSIP2.selected && (
            <button
              className="btn-remove"
              onClick={() => psipAddRemove("remove")}
            >
              <CloseIcon /> Remove Unit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
