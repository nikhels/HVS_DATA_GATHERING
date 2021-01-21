export const ACTIONS = {
  EDIT_ALL_START: "edit-all-start",
  EDIT_ALL_STOP: "edit-all-stop",
  DEFAULT: "default",
  CHANGE: "change",
  ADD: "add",
  REMOVE: "remove",
  AUX: "auxiliary",
  UPDATE_COUNT: "update-count",
  LOAD: "load",
};
export const NAVIGATION = {
  EQUIPMENT: "equipment",
  CHANNELS: "channels",
  IPADDRESSES: "ip-addresses",
  SUBMIT: "submit",
};

const PsipDefaults = {
      psipName: "Guidebuilder",
      psipIp: "192.168.1.200",
      psipSubnet: "255.255.255.0",
      psipGateway: "192.168.1.1",
      psipPort: "3000",
      psipProvider:"",
      psipUsername:"",
      psipPassword:"",
      selected: false,
      }
  
  
  const TransportDefaults = {
      TStype1:"IP OUT",
      TStype2:"ASI OUT",
      TSoutputIpAddress:"225.0.0.0",
      TSoutputIpPort:"3000",
      TSbitrate:"19.392658",
      tsid:"1235",
      selected:false,
    }
  
  export const AuxiliaryDefaults = {
      tsid: "",
      channelCount: 0,
      channelInformation:{virtual:"",physical:"",channelCount:0},
      callLetters: "XXXX",
      ipAddressesCount: 0,
      psip: "",
      psipInformation: {info:{count:1},PSIP1:PsipDefaults,PSIP2:PsipDefaults},
      transportInformation:{info:{count:1},TS1:TransportDefaults,TS2:TransportDefaults,TS3:TransportDefaults},
      ipAuxiliary: {
        subnet: "255.255.255.0",
        gateway: "192.168.1.1",
        dns1: "8.8.8.8",
        dns2: "8.8.4.4",
        ntp: "129.6.15.28",
        selected:false,
      },
      notes: {
        display:false,
        content:""
      }
    };

