import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import {
  TransportATSC1Header,
  TransportATSC1,
} from "../TRANSPORTS/TransportATSC1";
import { CloseIcon } from "../DEFAULTS/ButtonIcons";
import { UpdateAuxiliary } from "../DEFAULTS/UpdateAuxiliary";

export default function IpOutput() {
  const { auxiliaryInformation, auxiliaryInformationDispatch } = useContext(
    GlobalContext
  );

  const {
    transportInformation: { info, TS1, TS2 },
  } = auxiliaryInformation;

  const updateTSdata = {
    location: info,
    payload: "info",
    id: "transport",
  };
  const updateTS1data = {
    location: TS1,
    payload: "TS1",
    id: "transport",
  };
  const updateTS2data = {
    location: TS2,
    payload: "TS2",
    id: "transport",
  };

  function transportAddRemove(toggle) {
    switch (toggle) {
      case "add":
        if (info.count < 2) {
          UpdateAuxiliary(
            { count: info.count + 1 },
            updateTSdata,
            auxiliaryInformationDispatch
          );
          UpdateAuxiliary(
            { selected: true },
            updateTS2data,
            auxiliaryInformationDispatch
          );
        }
        break;
      case "remove":
        UpdateAuxiliary(
          { count: info.count - 1 },
          updateTSdata,
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
        <table className="display__transport-container">
          <thead>
            <tr>
              <HeaderBuilder
                headerData={TransportATSC1Header}
                setCount={transportAddRemove}
                count={info.count}
              />
            </tr>
          </thead>
          <tbody>
            <RowBuilder
              rowData={TransportATSC1(TS1)}
              selected={TS1.selected}
              updateData={updateTS1data}
              changeFunction={auxiliaryInformationDispatch}
              updateFunction={UpdateAuxiliary}
            />
            {info.count > 1 && (
              <RowBuilder
                rowData={TransportATSC1(TS2)}
                selected={TS2.selected}
                updateData={updateTS2data}
                changeFunction={auxiliaryInformationDispatch}
                updateFunction={UpdateAuxiliary}
              />
            )}
          </tbody>
        </table>
        {info.count > 1 && TS2.selected && (
          <button
            className="btn-remove"
            onClick={() => transportAddRemove("remove")}
          >
            <CloseIcon /> Remove Transport
          </button>
        )}
      </div>
    </>
  );
}
