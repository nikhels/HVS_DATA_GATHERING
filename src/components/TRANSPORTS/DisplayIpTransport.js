import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import {
  TransportATSC1Header,
  TransportATSC1,
} from "./TransportATSC1";
import { CloseIcon } from "../DEFAULTS/ButtonIcons";
import { UpdateReducer } from "../DEFAULTS/UpdateReducer";

export default function IpOutput() {
  const { parameters, parametersDispatch } = useContext(
    GlobalContext
  );

  const {
    transportInformation: { info, TS1, TS2 },
  } = parameters;

  const updateTSdata = {
    location: info,
    payload: "info",
    id: "transportInformation",
  };
  const updateTS1data = {
    location: TS1,
    payload: "TS1",
    id: "transportInformation",
  };
  const updateTS2data = {
    location: TS2,
    payload: "TS2",
    id: "transportInformation",
  };

  function transportAddRemove(toggle) {
    switch (toggle) {
      case "add":
        if (info.count < 2) {
          UpdateReducer(
            { count: info.count + 1 },
            updateTSdata,
            parametersDispatch
          );
          UpdateReducer(
            { selected: true },
            updateTS2data,
            parametersDispatch
          );
        }
        break;
      case "remove":
        UpdateReducer(
          { count: info.count - 1 },
          updateTSdata,
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
        <table className="display__transport-container">
          <thead>
            <tr>
              <HeaderBuilder
                headerData={TransportATSC1Header}
                functionData={{addOrRemove:transportAddRemove}}
                count={info.count}
              />
            </tr>
          </thead>
          <tbody>
            <RowBuilder
              rowData={TransportATSC1(TS1)}
              selected={TS1.selected}
              updateData={updateTS1data}
              changeFunction={parametersDispatch}
              updateFunction={UpdateReducer}
            />
            {info.count > 1 && (
              <RowBuilder
                rowData={TransportATSC1(TS2)}
                selected={TS2.selected}
                updateData={updateTS2data}
                changeFunction={parametersDispatch}
                updateFunction={UpdateReducer}
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
