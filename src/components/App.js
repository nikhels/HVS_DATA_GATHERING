import React, { useState, useReducer, useEffect, useRef } from "react";
import "../css/App.css";
import Display from "./BODY/Display";
import HeaderEquipment from "./NAVIGATION/HeaderEquipment";
import HeaderChannels from "./NAVIGATION/HeaderChannels";
import HeaderIpAddresses from "./NAVIGATION/HeaderIpAddresses";
import Navigation from "./NAVIGATION/Navigation";
import Submit from "./NAVIGATION/Submit";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { UpdateChannels, UpdateIpAddresses, UpdateParameters  } from "./DEFAULTS/Reducers";
import Axios from "axios";
import { AuxiliaryDefaults } from "./DEFAULTS/Defaults";
import { ACTIONS, NAVIGATION } from "./DEFAULTS/Defaults";
// import { UpdateReducer } from "./DEFAULTS/UpdateReducer";

const LOCAL_STORAGE_KEY_CHANNELS = "HVSParameterGathering.channels";
const LOCAL_STORAGE_KEY_IPADDRESSES = "HVSParameterGathering.ip-addresses";
const LOCAL_STORAGE_KEY_EQUIPMENTTYPE = "HVSParameterGathering.equipment-type";
const LOCAL_STORAGE_KEY_EQUIPMENT = "HVSParameterGathering.equipment";
const LOCAL_STORAGE_KEY_AUXILIARY = "HVSParameterGathering.auxiliary";

export const GlobalContext = React.createContext();

function App() {
  const initialChannelsState = localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS))
    : [];
  const initialIpAddressesState = localStorage.getItem(
    LOCAL_STORAGE_KEY_IPADDRESSES
  )
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_IPADDRESSES))
    : [];
  const initialEquipmentTypeState = localStorage.getItem(
    LOCAL_STORAGE_KEY_EQUIPMENTTYPE
  )
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENTTYPE))
    : "";
  const initialEquipmentState = localStorage.getItem(
    LOCAL_STORAGE_KEY_EQUIPMENT
  )
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENT))
    : "";
  const initialAuxiliaryInformationState = localStorage.getItem(
    LOCAL_STORAGE_KEY_AUXILIARY
  )
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY))
    : AuxiliaryDefaults;

  const [parameters, parametersDispatch] = useReducer(
    UpdateParameters,
    initialAuxiliaryInformationState
  );

  const [navigation, navigationDispatch] = useReducer(toggleNavigation, {
    equipment: true,
    channels: false,
    ipAddresses: false,
    submit: false,
  });

  const [ipAddressesCount, setIpAddressesCount] = useState(1);
  const [channels, channelDispatch] = useReducer(
    UpdateChannels,
    initialChannelsState
  );
  const [ipAddresses, ipAddressesDispatch] = useReducer(
    UpdateIpAddresses,
    initialIpAddressesState
  );

  const [equipmentTypeSelection, setEquipmentTypeSelection] = useState(
    initialEquipmentTypeState
  );
  const [equipmentSelection, setEquipmentSelection] = useState(
    initialEquipmentState
  );

  const [channelEditToggle, setChannelEditToggle] = useState();
  const [channelEditCount, setChannelEditCount] = useState(0);

  const [ipAddressEditToggle, setIpAddressEditToggle] = useState();
  const [ipAddressesEditCount, setIpAddressesEditCount] = useState(0);

  // const [existingParameters, setExistingParameters] = useState();
  const [existingStationData, setExistingStationData] = useState();

  function submitParameters() {
    // console.log(existingStationData._id)
    if (existingStationData) {
      Axios.put("http://localhost:3001/update", {
        id: existingStationData._id,
        callLetters: parameters.callLetters,
        equipment: equipmentSelection,
        channels: localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS),
        auxiliary: localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY),
      }).then(() => console.log("updated Successful"));
    } else {
      Axios.put("http://localhost:3001/create", {
        callLetters: parameters.callLetters,
        equipment: equipmentSelection,
        channels: localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS),
        auxiliary: localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY),
      }).then(() => console.log("Success"));
    }
  }

  function handleLoadExistingParameters() {
    resetEquipmentSheet();
    channelDispatch({
      type: ACTIONS.LOAD,
      info: parameters,
      payload: { channels: JSON.parse(existingStationData.channels) },
    });
    setEquipmentSelection(existingStationData.equipment);

    parametersDispatch({
      type: ACTIONS.LOAD,
      payload: { auxiliary: JSON.parse(existingStationData.auxiliary) },
    });
  }

  function toggleNavigation(navigation, action) {
    switch (action.type) {
      case NAVIGATION.EQUIPMENT:
        return (navigation = {
          ...navigation,
          equipment: true,
          channels: false,
          ipAddresses: false,
          submit: false,
        });

      case NAVIGATION.CHANNELS:
        return (navigation = {
          ...navigation,
          equipment: false,
          channels: true,
          ipAddresses: false,
          submit: false,
        });

      case NAVIGATION.IPADDRESSES:
        return (navigation = {
          ...navigation,
          equipment: false,
          channels: false,
          ipAddresses: true,
          submit: false,
        });

      case NAVIGATION.SUBMIT:
        return (navigation = {
          ...navigation,
          equipment: false,
          channels: false,
          ipAddresses: false,
          submit: true,
        });

      default:
        return navigation;
    }
  }
  function handleChannelEditToggle(editing) {
    const { channelCount } = parameters;
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
  function handleIpAddressesEditToggle(editing) {
    // const { ipAddressesCount } = parameters;
    if (editing === true) {
      setIpAddressEditToggle(true);
      setIpAddressesEditCount(ipAddressesCount);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_START,
        info: parameters,
        count: ipAddressesCount,
      });
    }
    if (editing === false) {
      setIpAddressEditToggle(false);
      setIpAddressesEditCount(0);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_STOP,
        info: parameters,
      });
    }
  }
  function loadOrCreateChannels() {
    const { channelCount } = parameters.channelInformation;
    if (channels.length === channelCount) {
      channelDispatch({
        type: ACTIONS.LOAD,
        info: parameters.channelInformation,
        payload: { channels: initialChannelsState },
      });
    }
    if (channels.length !== 0 && channels.length < channelCount) {
      channelDispatch({ type: ACTIONS.ADD, info: parameters.channelInformation });
    }
    if (channels.length !== 0 && channels.length > channelCount) {
      channelDispatch({ type: ACTIONS.REMOVE, info: parameters.channelInformation});
    }
    if (channels.length === 0) {
      channelDispatch({ type: ACTIONS.DEFAULT, info: parameters.channelInformation });
    }
    // handleChannelEditToggle(true)
  }
  function loadOrCreateIpAddresses() {
    // const { ipAddressesCount } = parameters;
    if (ipAddresses.length === ipAddressesCount) {
      ipAddressesDispatch({
        type: ACTIONS.LOAD,
        info: parameters,
        count: ipAddressesCount,
        payload: { ipAddresses: initialIpAddressesState },
      });
    }
    if (ipAddresses.length !== 0 && ipAddresses.length < ipAddressesCount) {
      for (let x = ipAddresses.length + 1; x <= ipAddressesCount; x++) {
        ipAddressesDispatch({
          type: ACTIONS.ADD,
          info: parameters,
          count: ipAddressesCount,
        });
      }
    }
    if (ipAddresses.length !== 0 && ipAddresses.length > ipAddressesCount) {
      ipAddressesDispatch({
        type: ACTIONS.REMOVE,
        info: parameters,
        count: ipAddressesCount,
      });
    }
    if (ipAddresses.length === 0) {
      ipAddressesDispatch({
        type: ACTIONS.DEFAULT,
        info: parameters,
        count: ipAddressesCount,
      });
    }
  }

  function updatePsipInformation(e) {
    const psipChanges = { ...parameters.psipInformation, ...e };
    parametersDispatch({
      type: ACTIONS.CHANGE,
      payload: { psipInformation: psipChanges },
    });
  }

  function handlePsipSourceSelection(e) {
    if (equipmentSelection === "Harmonic X2S") {
      if (e === "Downstream") {
        updatePsipInformation({ psip: e, psipToggle: false });
        setIpAddressesCount(2);
      }
      if (e === "Internal Spooling") {
        updatePsipInformation({ psip: e, psipToggle: true });
        setIpAddressesCount(3);
      }
    } else {
      updatePsipInformation({ psip: e, ipAddressesCount: 1 });
    }
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CHANNELS, JSON.stringify(channels));
  }, [channels]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_IPADDRESSES,
      JSON.stringify(ipAddresses)
    );
  }, [ipAddresses]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_EQUIPMENTTYPE,
      JSON.stringify(equipmentTypeSelection)
    );
  }, [equipmentTypeSelection]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_EQUIPMENT,
      JSON.stringify(equipmentSelection)
    );
  }, [equipmentSelection]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_AUXILIARY,
      JSON.stringify(parameters)
    );
  }, [parameters]);

  function resetEquipmentSheet() {
    localStorage.setItem(LOCAL_STORAGE_KEY_CHANNELS, JSON.stringify([]));
    localStorage.setItem(LOCAL_STORAGE_KEY_IPADDRESSES, JSON.stringify([]));
    localStorage.setItem(LOCAL_STORAGE_KEY_EQUIPMENTTYPE, JSON.stringify(""));
    localStorage.setItem(LOCAL_STORAGE_KEY_EQUIPMENT, JSON.stringify(""));
    localStorage.setItem(
      LOCAL_STORAGE_KEY_AUXILIARY,
      JSON.stringify(AuxiliaryDefaults)
    );
  }

  // function UpdateParameters(parameters, action) {
  //   switch (action.type) {
  //     case ACTIONS.LOAD:
  //       return (parameters = action.payload.auxiliary);
  //     case ACTIONS.CHANGE:
  //       if (action.payload !== "") {
  //         if (action.id === "transport") {
  //           const updatedAuxiliaryInformation = {
  //             ...parameters,
  //             transportInformation: {
  //               ...parameters.transportInformation,
  //               ...action.payload,
  //             },
  //           };
  //           return (parameters = updatedAuxiliaryInformation);
  //         }
  //         if (action.id === "psip") {
  //           const updatedAuxiliaryInformation = {
  //             ...parameters,
  //             psipInformation: {
  //               ...parameters.psipInformation,
  //               ...action.payload,
  //             },
  //           };
  //           return (parameters = updatedAuxiliaryInformation);
  //         } else {
  //           const updatedAuxiliaryInformation = {
  //             ...parameters,
  //             ...action.payload,
  //           };
  //           return (parameters = updatedAuxiliaryInformation);
  //         }
  //       }
  //       break;
  //     default:
  //       return parameters;
  //   }
  // }

  // CALLS PRINT LIBRARY AND REFERENCES DISPLAY COMPONENT
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const globalContextValues = {
    channelDispatch,
    ipAddressesDispatch,
    parametersDispatch,
    navigationDispatch,

    setEquipmentTypeSelection,
    setEquipmentSelection,
    setChannelEditCount,
    setIpAddressesEditCount,
    setChannelEditToggle,
    setIpAddressEditToggle,

    loadOrCreateChannels,
    loadOrCreateIpAddresses,

    handleChannelEditToggle,
    handleIpAddressesEditToggle,
    handlePrint,
    handlePsipSourceSelection,

    submitParameters,
    setExistingStationData,
    resetEquipmentSheet,

    equipmentTypeSelection,
    equipmentSelection,
    parameters,
    channels,
    ipAddresses,
    navigation,
    channelEditToggle,
    ipAddressEditToggle,
    channelEditCount,
    ipAddressesEditCount,
    updatePsipInformation,
    setIpAddressesCount,
    ipAddressesCount,
    handleLoadExistingParameters,
  };

  return (
    <>
      {/* <Router> */}
      <GlobalContext.Provider value={globalContextValues}>
        <div className="wrapper">
          <div className="header__title title-bar"></div>
          <Navigation />
          {/* <HeaderHome /> */}
          {navigation.equipment && <HeaderEquipment />}
          {navigation.channels && <HeaderChannels />}
          {navigation.ipAddresses && <HeaderIpAddresses />}
          {navigation.submit && <Submit />}
          <Display />
          <div style={{ display: "none" }}>
            <ComponentToPrint ref={componentRef} />
          </div>
        </div>
      </GlobalContext.Provider>
      {/* </Router> */}
    </>
  );
}

export default App;
