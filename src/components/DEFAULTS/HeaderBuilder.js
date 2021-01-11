import React, { useContext } from "react";
import { GlobalContext} from "../App";
import { SaveAllIcon, PlusIcon } from "../DEFAULTS/ButtonIcons";
import { v4 as uuidv4 } from "uuid";
// import { UpdateAuxiliary } from '../DEFAULTS/UpdateAuxiliary'

export function HeaderBuilder({setCount, headerData }) {
  const { auxiliaryInformation } = useContext(
    GlobalContext
  );

  const { transport1Selected } = auxiliaryInformation.transportInformation;

  function handleChanges(event){
    // location.map((item) => {
    //   UpdateAuxiliary(event,functionData,changeFunction) 
    };
   


  return (
    <>
      {headerData.map(({ size="large", data, type }) => {
        
        if (type === "edit") {
          if (!transport1Selected) {
            return (
              <th
                key={uuidv4()}
                id="edit-column-header"
                className="display__header-normal edit"
                onClick={() => handleChanges({ selected: true })}
              >
                <div className="display__edit-all-text">EDIT ALL</div>
              </th>
            );
          } else {
            return (
              <th
                key={uuidv4()}
                className="display__header-normal edit selected"
                id="edit-column-header-selected"
                onClick={() => handleChanges({ selected: false })}
              >
                <SaveAllIcon />
              </th>
            );
          }
        }
        if (type === "add") {
          return (
            <th
              key={uuidv4()}
              className="display__header-normal edit"
              id="edit-column-header"
              onClick={() => setCount("add")}
            >
              <PlusIcon />
            </th>
          );
        } else {
          return <th 
          key={uuidv4()}
          className={"display__header-normal " + size}>{data}</th>;
        }
      })}
    </>
  );
}
