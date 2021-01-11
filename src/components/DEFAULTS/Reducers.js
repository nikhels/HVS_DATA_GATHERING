
import { ACTIONS } from '../DEFAULTS/Defaults'
import {
  ChannelConstructor,
  IpAddressConstructor,
} from "../DEFAULTS/Constructors";

//CHANNEL REDUCER - CALLED FROM CHANNELDISPATCH
export function UpdateChannels(channels, action) {
  const { channelCount, virtual, physical } = action.info;
  switch (action.type) {
    case ACTIONS.LOAD:
      return (channels = action.payload.channels);
    case ACTIONS.DEFAULT:
      channels = [];
      for (let x = 1; x <= channelCount; x++) {
        channels = [...channels, new ChannelConstructor(x, virtual, physical)];
      }
      return channels;
    case ACTIONS.ADD:
      for (let x = channels.length + 1; x <= channelCount; x++) {
        const newChannels = [new ChannelConstructor(x, virtual, physical)];
        channels = [...channels, ...newChannels];
      }
      return channels;
    case ACTIONS.REMOVE:
      const newArray = channels.slice(0, channelCount);
      return newArray;
    case ACTIONS.EDIT_ALL_START:
      return channels.map((channel) => ({ ...channel, selected: true }));
    case ACTIONS.EDIT_ALL_STOP:
      return channels.map((channel) => ({ ...channel, selected: false }));
    case ACTIONS.CHANGE:
      const channelChanges = [...channels];
      const index = channelChanges.findIndex((c) => c.id === action.payload.id);
      channelChanges[index] = action.payload.channel;
      return (channels = channelChanges);
    default:
      return channels;
  }
}

export function UpdateIpAddresses(ipAddresses, action) {
  const {
    psipInformation: { psip },
  } = action.info;
  const count = action.count;

  switch (action.type) {
    case ACTIONS.LOAD:
      return (ipAddresses = action.payload.ipAddresses);
    case ACTIONS.DEFAULT:
      for (let x = 1; x <= count; x++) {
        ipAddresses = [
          ...ipAddresses,
          new IpAddressConstructor(x, count, psip),
        ];
      }
      return ipAddresses;
    case ACTIONS.CHANGE:
      const ipAddressChanges = [...ipAddresses];
      const index = ipAddressChanges.findIndex(
        (c) => c.id === action.payload.id
      );
      ipAddressChanges[index] = action.payload.ipAddress;
      return (ipAddresses = ipAddressChanges);
    case ACTIONS.ADD:
      const newIpAddresses = [
        new IpAddressConstructor(ipAddresses.length + 1, count, psip),
      ];
      const addIpAddresses = [...ipAddresses, ...newIpAddresses];
      return addIpAddresses;

    case ACTIONS.REMOVE:
      const newArray = ipAddresses.slice(0, count);
      return newArray;
    case ACTIONS.EDIT_ALL_START:
      return ipAddresses.map((ipAddress) => ({
        ...ipAddress,
        selected: true,
      }));
    case ACTIONS.EDIT_ALL_STOP:
      return ipAddresses.map((ipAddress) => ({
        ...ipAddress,
        selected: false,
      }));
    default:
      return ipAddresses;
  }
}
