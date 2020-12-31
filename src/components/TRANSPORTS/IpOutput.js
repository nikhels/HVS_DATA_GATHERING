import React from "react";
import { FiEdit } from "react-icons/fi";

export default function IpOutput() {
  return (
    <>
     <div className="display__background">
      <table className="display__transport-container">
        <thead>
          <tr>
            <th
              className="display__header-normal edit"
              id="edit-column-header"
              onClick={() => ""}
            >
              <div className="display__edit-all-text">EDIT ALL</div>
            </th>

            {/* <th className="display__header-normal edit selected" id ="edit-column-header-selected" onClick={() => ""}>
        <FiEdit /><div className="display__edit-all-text">ALL</div>
        </th> */}
            <th className="display__header-normal large">MAIN TRANSPORT TYPE</th>
            <th className="display__header-normal large">SECONDARY TRANSPORT TYPE</th>
            <th className="display__header-normal large">OUTPUT IP ADDRESS</th>
            <th className="display__header-normal large">PORT</th>
            <th className="display__header-normal large">BITRATE</th>
            <th className="display__header-normal large">TSID</th>
          </tr>
        </thead>
        <tbody className="display__channel-data">
          <tr>
            <td onClick={() => ""} id="edit-column">
              {" "}
              <FiEdit />
            </td>
            <td className="display__text-box small">IP OUT</td>
            <td className="display__text-box large">ASI OUT x 4</td>
            <td className="display__text-box small">225.0.0.0</td>
            <td className="display__text-box small">3000</td>
            <td className="display__text-box small ">19.392658</td>
            <td className="display__text-box small ">1234</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}
