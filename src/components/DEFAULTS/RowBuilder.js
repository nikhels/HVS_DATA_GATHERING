import React from "react";
import { EditIcon, SaveIcon } from "../DEFAULTS/ButtonIcons";

// import  { UpdateReducer } from '../DEFAULTS/UpdateReducer'

export function RowBuilder({
  rowData,
  selected,
  updateData,
  changeFunction,
  updateFunction,
}) {
  function handleChanges(e) {
    updateFunction(e, updateData, changeFunction);
  }

  let rowClass;

  if (!selected) {
    rowClass = "display__channel-data";
  } else {
    rowClass = "display__channel-data selected";
  }
  return (
    <>
      <tr className={rowClass}>
        {rowData.map(({ size = "large", keyRef, data, input, type }) => {
          switch (selected) {
            case false:
              if (type === "edit") {
                return (
                  <td
                    key={keyRef}
                    id="edit-column"
                    onClick={() => handleChanges({ selected: true })}
                  >
                    <EditIcon />
                  </td>
                );
              } else {
                return (
                  <td key={keyRef} className={"display__text-box " + size}>
                    {data}
                  </td>
                );
              }

            case true:
              if (type === "edit") {
                return (
                  <td
                    key={keyRef}
                    id="edit-column-selected"
                    onClick={() => handleChanges({ selected: false })}
                  >
                    <SaveIcon />
                  </td>
                );
              } else {
                if (input.type === "input") {
                  return (
                    <td
                      key={keyRef}
                      className={"display__edit-text-box " + size}
                    >
                      <input
                        type="text"
                        defaultValue={data}
                        onChange={(e) =>
                          handleChanges({ [keyRef]: e.target.value })
                        }
                      />
                    </td>
                  );
                }
                if (input.type === "select") {
                  return (
                    <td key={keyRef} className="display__edit-text-box large">
                      <select
                        onChange={(e) =>
                          handleChanges({ [keyRef]: e.target.value })
                        }
                        defaultValue={data}
                      >
                        {input.options.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                } else {
                  return null;
                }
              }
            default:
              return null;
          }
        })}
      </tr>
    </>
  );
}
