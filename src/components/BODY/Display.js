import React, { useContext } from "react";
import { GlobalContext, NAVIGATION, ACTIONS } from "../App";
// import { GlobalContext } from './App'
import DisplayChannelTables from "../CHANNELS/DisplayChannelTables";
import DisplayIpTables from "../IP_ADDRESSES/DisplayIpTables";
import DisplayHeader from "./DisplayHeader";
import DisplayPsip from "../IP_ADDRESSES/DisplayPsip";
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
    auxiliaryInformation,
    auxiliaryInformationDispatch,
  } = useContext(GlobalContext);
  
  function handleChanges(e) {
    const psipChanges = { ...auxiliaryInformation.psipInformation, ...e };
    auxiliaryInformationDispatch({
      type: ACTIONS.CHANGE,
      payload: { psipInformation: psipChanges },
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
            {!auxiliaryInformation.psipInformation.psipToggle && (
              <button
                onClick={() => handleChanges({ psipToggle: true })}
                className="btn-secondary"
              >
                {" "}
                <HiPlus /> ADD PSIP SECTION{" "}
              </button>
            )}

            {auxiliaryInformation.psipInformation.psipToggle && (
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

      <div className="left-content">
        {equipmentSelection && (
          <div className="display__container">
            {" "}
            <DisplayHeader />
            {/* <DisplayHeader /> */}
            {ipAddresses.length > 0 && <DisplayIpTables />}
            {auxiliaryInformation.psipInformation.psipToggle && <DisplayPsip />}
            {/* <DisplayPsip /> */}
            {channels.length > 0 && <DisplayChannelTables />}
          </div>
        )}
      </div>
    </>
  );
}
