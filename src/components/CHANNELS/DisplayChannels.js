import React, { useContext } from "react";
import { GlobalContext } from "../App";
import DisplayIpTransport from "../TRANSPORTS/DisplayIpTransport";
import { HeaderBuilder } from "../DEFAULTS/HeaderBuilder";
import { RowBuilder } from "../DEFAULTS/RowBuilder";
import { UpdateReducer } from "../DEFAULTS/UpdateReducer";

import { ChannelATSC1, ChannelATSC1Header } from "./ChannelATSC1";
import { ACTIONS } from "../DEFAULTS/Defaults";
// import DisplayCallToAction from "../BODY/DisplayCallToAction"

export default function DisplayChannels() {
  const {
    parameters,
    setChannelEditToggle,
    setChannelEditCount,
    channelDispatch,
    // parametersDispatch,
    channelEditToggle,
    channels
  } = useContext(GlobalContext);
  // const channelsList = channels.map((channel) => {
  //   return <DisplayChannelData key={channel.id} {...channel} />;
  // });
  function handleEditAll(editing) {
    const { channelCount } = parameters.channelInformation;
    if (editing === true) {
      setChannelEditToggle(true);
      setChannelEditCount(channelCount);
      channelDispatch({
        type: ACTIONS.EDIT_ALL_START,
        info: parameters,
      });
    }
    if (editing === false) {
      setChannelEditToggle(false);
      setChannelEditCount(0);
      channelDispatch({
        type: ACTIONS.EDIT_ALL_STOP,
        info: parameters,
      });
    }
  }

  return (
    <>
    {/* <DisplayCallToAction editFunction={handleEditAll} toggle = {channelEditCount} /> */}


      <div className="display__background">
        <div className="display__channel-psip-container">
          <table>
            <thead>
              <tr>
                <HeaderBuilder
                  headerData={ChannelATSC1Header}
                  functionData={{ editAll: handleEditAll,editing:channelEditToggle }}
                />
              </tr>
            </thead>
            <tbody>
              {channels.map((channel) => {
                const updatedata = {
                  location: channel,
                  info:parameters,
                  payload: "channel",
                  key: channel.id,
                };

                return (
                  <RowBuilder
                    key={channel.id}
                    rowData={ChannelATSC1(channel)}
                    selected={channel.selected}
                    updateData={updatedata}
                    changeFunction={channelDispatch}
                    updateFunction={UpdateReducer}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <DisplayIpTransport />
    </>
  );
}
