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
import { UpdateChannels, UpdateIpAddresses } from "./DEFAULTS/Reducers";
import Axios from "axios";
import { AuxiliaryDefaults } from "./DEFAULTS/Defaults";
import { ACTIONS, NAVIGATION } from "./DEFAULTS/Defaults";

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

  const [auxiliaryInformation, auxiliaryInformationDispatch] = useReducer(
    updateAuxiliaryInformation,
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

  const [existingParameters, setExistingParameters] = useState();

  // const [psipToggle,setPsipToggle]= useState()

  function submitParameters() {
    Axios.post("http://localhost:3001/create", {
      callLetters: auxiliaryInformation.callLetters,
      equipment: equipmentSelection,
      channels: localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS),
      auxiliary: localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY),
    }).then(() => console.log("Success"));
  }
  const getExisitingParameters = () => {
    Axios.get("http://localhost:3001/existing").then((response) => {
      setExistingParameters(response.data);
    });
  };

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
    const { channelCount } = auxiliaryInformation;
    if (editing === true) {
      setChannelEditToggle(true);
      setChannelEditCount(channelCount);
      channelDispatch({
        type: ACTIONS.EDIT_ALL_START,
        info: auxiliaryInformation,
      });
    }
    if (editing === false) {
      setChannelEditToggle(false);
      setChannelEditCount(0);
      channelDispatch({
        type: ACTIONS.EDIT_ALL_STOP,
        info: auxiliaryInformation,
      });
    }
  }
  function handleIpAddressesEditToggle(editing) {
    // const { ipAddressesCount } = auxiliaryInformation;
    if (editing === true) {
      setIpAddressEditToggle(true);
      setIpAddressesEditCount(ipAddressesCount);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_START,
        info: auxiliaryInformation,
        count: ipAddressesCount,
      });
    }
    if (editing === false) {
      setIpAddressEditToggle(false);
      setIpAddressesEditCount(0);
      ipAddressesDispatch({
        type: ACTIONS.EDIT_ALL_STOP,
        info: auxiliaryInformation,
      });
    }
  }
  function loadOrCreateChannels() {
    const { channelCount } = auxiliaryInformation;
    if (channels.length === channelCount) {
      channelDispatch({
        type: ACTIONS.LOAD,info: auxiliaryInformation,
        payload: { channels: initialChannelsState,  },
      });
    }
    if (channels.length !== 0 && channels.length < channelCount) {
      channelDispatch({ type: ACTIONS.ADD, info: auxiliaryInformation });
    }
    if (channels.length !== 0 && channels.length > channelCount) {
      channelDispatch({ type: ACTIONS.REMOVE, info: auxiliaryInformation });
    }
    if (channels.length === 0) {
      channelDispatch({ type: ACTIONS.DEFAULT, info: auxiliaryInformation });
    }
    // handleChannelEditToggle(true)
  }
  function loadOrCreateIpAddresses() {
    // const { ipAddressesCount } = auxiliaryInformation;
    if (ipAddresses.length === ipAddressesCount) {
      ipAddressesDispatch({
        type: ACTIONS.LOAD,
        info: auxiliaryInformation,
        count: ipAddressesCount,
        payload: { ipAddresses: initialIpAddressesState },
      });
    }
    if (ipAddresses.length !== 0 && ipAddresses.length < ipAddressesCount) {
      for (let x = ipAddresses.length + 1; x <= ipAddressesCount; x++) {
        ipAddressesDispatch({
          type: ACTIONS.ADD,
          info: auxiliaryInformation,
          count: ipAddressesCount,
        });
      }
    }
    if (ipAddresses.length !== 0 && ipAddresses.length > ipAddressesCount) {
      ipAddressesDispatch({
        type: ACTIONS.REMOVE,
        info: auxiliaryInformation,
        count: ipAddressesCount,
      });
    }
    if (ipAddresses.length === 0) {
      ipAddressesDispatch({
        type: ACTIONS.DEFAULT,
        info: auxiliaryInformation,
        count: ipAddressesCount,
      });
    }
  }

  function updatePsipInformation(e) {
    const psipChanges = { ...auxiliaryInformation.psipInformation, ...e };
    auxiliaryInformationDispatch({
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
      JSON.stringify(auxiliaryInformation)
    );
  }, [auxiliaryInformation]);

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

  function updateAuxiliaryInformation(auxiliaryInformation, action) {
    switch (action.type) {
      case ACTIONS.CHANGE:
        if (action.payload !== "") {
          if (action.id === "transport") {
            const updatedAuxiliaryInformation = {
              ...auxiliaryInformation,
              transportInformation: {
                ...auxiliaryInformation.transportInformation,
                ...action.payload,
              },
            };
            return (auxiliaryInformation = updatedAuxiliaryInformation);
          }
          if (action.id === "psip") {
            const updatedAuxiliaryInformation = {
              ...auxiliaryInformation,
              psipInformation: {
                ...auxiliaryInformation.psipInformation,
                ...action.payload,
              },
            };
            return (auxiliaryInformation = updatedAuxiliaryInformation);
          } else {
            const updatedAuxiliaryInformation = {
              ...auxiliaryInformation,
              ...action.payload,
            };
            return (auxiliaryInformation = updatedAuxiliaryInformation);
          }
        }
        break;
      default:
        return auxiliaryInformation;
    }
  }

  // CALLS PRINT LIBRARY AND REFERENCES DISPLAY COMPONENT
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const globalContextValues = {
    channelDispatch,
    ipAddressesDispatch,
    auxiliaryInformationDispatch,
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
    getExisitingParameters,
    existingParameters,
    setExistingParameters,
    resetEquipmentSheet,

    equipmentTypeSelection,
    equipmentSelection,
    auxiliaryInformation,
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
