import React, { useContext } from "react";
import { GlobalContext } from "../App";
import {NAVIGATION, ACTIONS } from '../DEFAULTS/Defaults'
// import { GlobalContext } from './App'
import DisplayChannels from "../CHANNELS/DisplayChannels";
import DisplayIpAddresses from "../IP_ADDRESSES/DisplayIpAddresses";
import DisplayHeader from "./DisplayHeader";
import DisplayPsip from "../PSIP/DisplayPsip";
import { FiEdit } from "react-icons/fi";
import { FaChevronCircleRight } from "react-icons/fa";
import { HiPlus, HiX } from "react-icons/hi";
// import { RiShareForwardFill } from 'react-icons/ri'

export default function Display() {
  // const {handleCollapseSub1} = useContext(GlobalContext)
  const {
    channels,
    ipAddresses,
    equipmentSelection,
    handleChannelEditToggle,
    handleIpAddressesEditToggle,
    navigation,
    navigationDispatch,
    channelEditCount,
    ipAddressesEditCount,
    parameters,
    parametersDispatch,
  } = useContext(GlobalContext);

  const { notes } = parameters;

  function handleChanges(e) {
    const psipChanges = { ...parameters.psipInformation, ...e };
    parametersDispatch({
      type: ACTIONS.CHANGE,
      payload: { psipInformation: psipChanges },
    });
  }

  function updateNoteAuxiliary(e) {
    const updatedNoteAuxiliary = { ...notes, ...e };
    parametersDispatch({
      type: ACTIONS.CHANGE,
      payload: { notes: updatedNoteAuxiliary },
    });
  }

  return (
    <>
      {/* CHANNELS CALL TO ACTION BANNER */}
      {channels.length > 0 && navigation.channels && (
        <div className="call-to-action">
          <div></div>
          <div>
            <button
              onClick={() => handleChannelEditToggle(true)}
              className="btn-secondary"
            >
              {" "}
              <FiEdit /> EDIT ALL CHANNELS
            </button>
          </div>

          <div>
            {channelEditCount > 0 && (
              <button
                onClick={() => handleChannelEditToggle(false)}
                className="btn-secondary"
              >
                {" "}
                <FiEdit /> FINISH EDITING{" "}
              </button>
            )}
          </div>
          {/* <div></div> */}
          <div></div>
          <div>
            <span className="button-text">
              <button
                className="btn-secondary"
                onClick={() =>
                  navigationDispatch({ type: NAVIGATION.IPADDRESSES })
                }
              >
                CONTINUE
                <i className="large-icon">
                  <FaChevronCircleRight />
                </i>
              </button>
            </span>
          </div>
        </div>
      )}
      {/* IP ADDRESS CALL TO ACTION BANNER */}
      {ipAddresses.length > 0 && navigation.ipAddresses && (
        <div className="call-to-action">
          <div></div>
          <div>
            <button
              onClick={() => handleIpAddressesEditToggle(true)}
              className="btn-secondary"
            >
              {" "}
              <FiEdit /> EDIT ALL IP ADDRESSES
            </button>
          </div>
          <div>
            {ipAddressesEditCount > 0 && (
              <button
                onClick={() => handleIpAddressesEditToggle(false)}
                className="btn-secondary"
              >
                {" "}
                <FiEdit /> FINISH EDITING{" "}
              </button>
            )}
          </div>
          {/* <div>
            <button
              onClick={() => setIpAddressesCount(6)}
              className="btn-secondary"
            >
              {" "}
              <HiPlus /> ADD SECONDARY
            </button>
          </div> */}
          <div>
            {!parameters.psipInformation.psipToggle && (
              <button
                onClick={() => handleChanges({ psipToggle: true })}
                className="btn-secondary"
              >
                {" "}
                <HiPlus /> ADD PSIP SECTION{" "}
              </button>
            )}

            {parameters.psipInformation.psipToggle && (
              <button
                onClick={() => handleChanges({ psipToggle: false })}
                className="btn-secondary"
              >
                {" "}
                <HiX /> REMOVE PSIP SECTION{" "}
              </button>
            )}
          </div>

          {/* <div></div> */}
          {/* <div></div> */}
          <div>
            <span className="button-text">
              <button
                className="btn-secondary"
                onClick={() => navigationDispatch({ type: NAVIGATION.SUBMIT })}
              >
                CONTINUE
                <i className="large-icon">
                  <FaChevronCircleRight />
                </i>
              </button>
            </span>
          </div>
        </div>
      )}

      <div className="page-content">
        {equipmentSelection && (
          <div className="display__container">
            {" "}
            <DisplayHeader />
            {/* <DisplayHeader /> */}
            {ipAddresses.length > 0 && <DisplayIpAddresses />}
            {parameters.psipInformation.psipToggle && <DisplayPsip />}
            {/* <DisplayPsip /> */}
            {channels.length > 0 && <DisplayChannels />}
          </div>
        )}
        {!notes.display && channels.length > 0 && (
          <button
            className="btn-secondary "
            onClick={() => updateNoteAuxiliary({ display: true })}
            id="note-button"
          >
            {" "}
            <HiPlus /> Additional Notes {" "}
          </button>
        )}

        {notes.display && channels.length > 0 && (
          <div className="display__text-area-container">
          <button
            className="btn-remove "
            onClick={() => updateNoteAuxiliary({ display: false })}
            id="note-button"
          >
         <HiX />
          </button> 
          
            <textarea
              rows="3"
              cols="170"
              wrap="hard"
              onChange={(e) => updateNoteAuxiliary({ content: e.target.value })}
              value={notes.content}
              placeholder="Additional Notes"
            />
          </div>
        )}
      </div>
    </>
  );
}
