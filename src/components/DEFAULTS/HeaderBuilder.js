import React from "react";
// import { GlobalContext} from "../App";
import { SaveAllIcon, PlusIcon } from "../DEFAULTS/ButtonIcons";
import { v4 as uuidv4 } from "uuid";
// import { UpdateReducer } from '../DEFAULTS/UpdateReducer'


export function HeaderBuilder({functionData, headerData }) {
console.log(functionData)

  return (
    <>
      {headerData.map(({ size="large", data, type }) => {
        
        if (type === "edit") {
          const {editAll,editing} = functionData
          if (!editing) {
            return (
              <th
                key={uuidv4()}
                id="edit-column-header"
                className="display__header-normal edit"
                onClick={() => editAll(true)}
              >
                <div className="display__edit-all-text">EDIT ALL</div>
              </th>
            );
          } else {
            return (
              <th
                key={uuidv4()}
                id="edit-column-header-selected"
                className="display__header-normal edit selected"
                onClick={() => editAll(false)}
              >
                <SaveAllIcon />
              </th>
            );
          }
        }
        if (type === "add") {
          const {addOrRemove} = functionData
          return (
            <th
              key={uuidv4()}
              className="display__header-normal edit"
              id="edit-column-header"
              onClick={() => addOrRemove("add")}
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
