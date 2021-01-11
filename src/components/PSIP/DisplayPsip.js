import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import { PsipATSC1Header, PsipATSC1 } from "../PSIP/PsipATSC1";
import { CloseIcon } from "../DEFAULTS/ButtonIcons";
import { UpdateAuxiliary } from "../DEFAULTS/UpdateAuxiliary";

export default function DisplayPsip() {
  const { auxiliaryInformationDispatch, auxiliaryInformation } = useContext(
    GlobalContext
  );

  const {
    psipInformation: { info, PSIP1, PSIP2 },
  } = auxiliaryInformation;

  const updatePSIPData = {
    location: info,
    payload: "info",
    id: "psip",
  };
  const updatePSIP1Data = {
    location: PSIP1,
    payload: "PSIP1",
    id: "psip",
  };
  const updatePSIP2Data = {
    location: PSIP2,
    payload: "PSIP2",
    id: "psip",
  };

  function psipAddRemove(toggle) {
    switch (toggle) {
      case "add":
        if (info.count < 2) {
          UpdateAuxiliary(
            { count: info.count + 1 },
            updatePSIPData,
            auxiliaryInformationDispatch
          );
          UpdateAuxiliary(
            { selected: true },
            updatePSIP2Data,
            auxiliaryInformationDispatch
          );
        }
        break;
      case "remove":
        UpdateAuxiliary(
          { count: info.count - 1 },
          updatePSIPData,
          auxiliaryInformationDispatch
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
                  setCount={psipAddRemove}
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
                changeFunction={auxiliaryInformationDispatch}
                updateFunction={UpdateAuxiliary}
              />
              {info.count > 1 && (
                <RowBuilder
                  rowData={PsipATSC1(PSIP2)}
                  selected={PSIP2.selected}
                  selectionKey={"selected"}
                  updateData={updatePSIP2Data}
                  changeFunction={auxiliaryInformationDispatch}
                  updateFunction={UpdateAuxiliary}
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
