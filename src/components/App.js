import React, { useState, useReducer, useEffect,useRef  } from 'react';
import '../css/App.css';
import Display from './BODY/Banner'
import HeaderEquipment from './NAVIGATION/HeaderEquipment'
import HeaderChannels from './NAVIGATION/HeaderChannels'
import HeaderIpAddresses from './NAVIGATION/HeaderIpAddresses'
import Navigation from './NAVIGATION/Navigation'
import Submit from './NAVIGATION/Submit'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
// import HeaderHome from './NAVIGATION/HeaderHome'
import Axios from 'axios'


import { ChannelConstructor, IpAddressConstructor} from './DEFAULTS/Constructors'

export const ACTIONS = {
  EDIT_ALL_START: 'edit-all-start',
  EDIT_ALL_STOP: 'edit-all-stop',
  DEFAULT: 'default',
  CHANGE:'change',
  ADD: 'add',
  REMOVE:'remove',
  AUX: 'auxiliary',
  UPDATE_COUNT:'update-count', 
  LOAD:"load",
}
export const NAVIGATION = {
  EQUIPMENT:'equipment',
  CHANNELS: 'channels',
  IPADDRESSES:'ip-addresses',
  SUBMIT:'submit'
}

const LOCAL_STORAGE_KEY_CHANNELS = 'HVSParameterGathering.channels'
const LOCAL_STORAGE_KEY_IPADDRESSES = 'HVSParameterGathering.ip-addresses'
const LOCAL_STORAGE_KEY_EQUIPMENTTYPE = 'HVSParameterGathering.equipment-type'
const LOCAL_STORAGE_KEY_EQUIPMENT = 'HVSParameterGathering.equipment'
const LOCAL_STORAGE_KEY_AUXILIARY= 'HVSParameterGathering.auxiliary'

export const GlobalContext = React.createContext()

// export const GlobalProvider = (props) => {
//   const [state, dispatch] = useReducer(AppReducer, initialState);
// }
// useEffect(() => {const initialState = 
//   localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS) 
//   ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS)) 
//   : []
// }, []) 

function App() {
  

  
  const auxiliaryDefaults = {
    "tsid":"",
    "channelCount":0,
    "callLetters":"XXXX",
    "units": 1,
    "dns1": "8.8.8.8",
    "dns2": "8.8.4.4",
    "ntp": "129.6.15.28",
    "ipAddressesCount": 3,
    "psip": "Internal Spooling",
    "psipPort":"N/A",
  }
  
  const initialChannelsState =
  localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS) 
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS)) 
  : []
  const initialIpAddressesState =
  localStorage.getItem(LOCAL_STORAGE_KEY_IPADDRESSES) 
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_IPADDRESSES)) 
  : []
  const initialEquipmentTypeState =
  localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENTTYPE) 
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENTTYPE)) 
  : ""
  const initialEquipmentState =
  localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENT) 
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EQUIPMENT)) 
  : ""
  const initialAuxiliaryInformationState =
  localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY) 
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY)) 
  : auxiliaryDefaults



// const [psipSource, setPsipSource] = useState()
const [auxiliaryInformation, auxiliaryInformationDispatch] = useReducer(updateAuxiliaryInformation,initialAuxiliaryInformationState)
// const [ipAuxiliary,ipAuxiliaryDispatch] = useReducer(updateIpAuxiliary,ipAuxiliaryDefaults)

const [navigation,navigationDispatch] = useReducer(toggleNavigation,{equipment:true,channels:false,ipAddresses:false,submit:false})
const [channels,channelDispatch] = useReducer(updateChannels, initialChannelsState)
const [ipAddresses,ipAddressesDispatch] = useReducer(updateIpAddresses,initialIpAddressesState)


const [equipmentTypeSelection,setEquipmentTypeSelection] = useState(initialEquipmentTypeState)
const [equipmentSelection,setEquipmentSelection] = useState(initialEquipmentState)

const [channelEditToggle,setChannelEditToggle] = useState()
const [channelEditCount,setChannelEditCount] = useState(0)

const [ipAddressEditToggle,setIpAddressEditToggle] = useState()
const [ipAddressesEditCount,setIpAddressesEditCount] = useState(0)

const [existingParameters,setExistingParameters] = useState()




function submitParameters(){
  Axios.post("http://localhost:3001/create",{
    callLetters:auxiliaryInformation.callLetters,
    equipment:equipmentSelection,
    channels:localStorage.getItem(LOCAL_STORAGE_KEY_CHANNELS),
    auxiliary:localStorage.getItem(LOCAL_STORAGE_KEY_AUXILIARY) 
  }).then( () =>
  console.log("Success")
  );
}
const getExisitingParameters = () => {
  Axios.get("http://localhost:3001/existing").then((response) => {
    setExistingParameters(response.data);
  });
};

function toggleNavigation(navigation,action){
  switch(action.type){
    case NAVIGATION.EQUIPMENT:
     return navigation = {...navigation,equipment:true,channels:false,ipAddresses:false,submit:false}

    case NAVIGATION.CHANNELS:
     return navigation = {...navigation,equipment:false,channels:true,ipAddresses:false,submit:false}

    case NAVIGATION.IPADDRESSES:
     return navigation = {...navigation,equipment:false,channels:false,ipAddresses:true,submit:false}
    
     case NAVIGATION.SUBMIT:
     return navigation = {...navigation,equipment:false,channels:false,ipAddresses:false,submit:true}
 
    default:
      return navigation
  }
}
function handleChannelEditToggle(editing){
  const {channelCount}= auxiliaryInformation 
  if (editing === true) {
    setChannelEditToggle(true)
    setChannelEditCount(channelCount)
    channelDispatch({type: ACTIONS.EDIT_ALL_START})
  } 
  if (editing === false) {
    setChannelEditToggle(false)
    setChannelEditCount(0)
    channelDispatch({type: ACTIONS.EDIT_ALL_STOP}) 
  }
}
function handleIpAddressesEditToggle(editing){
  const {ipAddressesCount}= auxiliaryInformation 
  if (editing === true){
    setIpAddressEditToggle(true)
    setIpAddressesEditCount(ipAddressesCount)
    ipAddressesDispatch({type: ACTIONS.EDIT_ALL_START})
  }
  if (editing === false){
    setIpAddressEditToggle(false)
    setIpAddressesEditCount(0)
    ipAddressesDispatch({type: ACTIONS.EDIT_ALL_STOP})
  }
}
function loadOrCreateChannels(){
  const {channelCount}= auxiliaryInformation 
  if (channels.length === channelCount ) {
    channelDispatch({type:ACTIONS.LOAD,payload:{channels:initialChannelsState}})
  }
  if (channels.length !== 0 && channels.length < channelCount){
    channelDispatch({type:ACTIONS.ADD})
  }
  if (channels.length !== 0 && channels.length > channelCount){
    channelDispatch({type:ACTIONS.REMOVE})
  }
  if (channels.length === 0 ){
    channelDispatch({type:ACTIONS.DEFAULT})
  }
  // handleChannelEditToggle(true)
}
function loadOrCreateIpAddresses(){
  const {ipAddressesCount}= auxiliaryInformation
  if (ipAddresses.length === ipAddressesCount) {
    ipAddressesDispatch({type:ACTIONS.LOAD,payload:{ipAddresses:initialIpAddressesState}})
  }
  if (ipAddresses.length !== 0 && ipAddresses.length < ipAddressesCount){
    ipAddressesDispatch({type:ACTIONS.ADD})
  }
  if (ipAddresses.length !== 0 && ipAddresses.length > ipAddressesCount){
    ipAddressesDispatch({type:ACTIONS.REMOVE})
  }
  if (ipAddresses.length === 0 ){
    ipAddressesDispatch({type:ACTIONS.DEFAULT})
  }
}
useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY_CHANNELS, JSON.stringify(channels))
},[channels])
useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY_IPADDRESSES, JSON.stringify(ipAddresses))
},[ipAddresses])
useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY_EQUIPMENTTYPE, JSON.stringify(equipmentTypeSelection))
},[equipmentTypeSelection])
useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY_EQUIPMENT, JSON.stringify(equipmentSelection))
},[equipmentSelection])
useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY_AUXILIARY, JSON.stringify(auxiliaryInformation))
},[auxiliaryInformation])

function updateChannels(channels,action){ 
  const {channelCount,virtual,physical} = auxiliaryInformation
  switch (action.type){
    case ACTIONS.LOAD:
      return channels = action.payload.channels
    case ACTIONS.DEFAULT:
      channels = []    
      for (let x = 1; x <= channelCount; x++){channels = [...channels,new ChannelConstructor(x,virtual,physical)]}
      return channels
    case ACTIONS.ADD:  
      for (let x = (channels.length + 1); x <= channelCount; x++){
        const newChannels = [new ChannelConstructor(x ,virtual,physical)]
        channels = [...channels,...newChannels]}
      return channels
    case ACTIONS.REMOVE:  
      const newArray = channels.slice(0,channelCount)
      return newArray
    case ACTIONS.EDIT_ALL_START:
      return channels.map(channel => ({...channel,selected:true})) 
    case ACTIONS.EDIT_ALL_STOP:
      return channels.map(channel => ({...channel,selected:false})) 
    case ACTIONS.CHANGE:
      const channelChanges = [...channels]   
      const index = channelChanges.findIndex(c => c.id === action.payload.id)
      channelChanges[index] = action.payload.channel
      return channels = channelChanges
    default:
      return channels
    } 
}
function updateAuxiliaryInformation(auxiliaryInformation,action){
  switch (action.type){
    case ACTIONS.CHANGE:

      if (action.payload !== ""){
          const updatedAuxiliaryInformation = {...auxiliaryInformation, ...action.payload}
          return auxiliaryInformation = updatedAuxiliaryInformation
        }
        break;
      default:
      return auxiliaryInformation
  }
}
function updateIpAddresses(ipAddresses,action){
  const {ipAddressesCount}= auxiliaryInformation
  switch (action.type){
    case ACTIONS.LOAD:
      return ipAddresses = action.payload.ipAddresses
    case ACTIONS.DEFAULT:
      for (let x = 1; x <= ipAddressesCount; x++){    
        ipAddresses = [...ipAddresses,new IpAddressConstructor(x,ipAddressesCount)]
      }
      return ipAddresses
    case ACTIONS.CHANGE:
      const ipAddressChanges = [...ipAddresses]
      const index = ipAddressChanges.findIndex(c => c.id === action.payload.id)
      ipAddressChanges[index] = action.payload.ipAddress
      return ipAddresses = ipAddressChanges
    case ACTIONS.ADD:  
    for (let x = (ipAddresses.length + 1); x <= ipAddressesCount; x++){
        const newIpAddresses= [new IpAddressConstructor(x,ipAddressesCount)]
        const addIpAddresses = [...ipAddresses,...newIpAddresses]
        return addIpAddresses 
      }
       break;
      case ACTIONS.REMOVE:  
        const newArray = ipAddresses.slice(0,ipAddressesCount)
        return newArray
      case ACTIONS.EDIT_ALL_START:
          return ipAddresses.map(ipAddress => ({...ipAddress,selected:true})) 
      case ACTIONS.EDIT_ALL_STOP:
          return ipAddresses.map(ipAddress => ({...ipAddress,selected:false})) 
      default:
      return ipAddresses
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

  submitParameters,
  getExisitingParameters,
  existingParameters,
  setExistingParameters,
  
  equipmentTypeSelection,
  equipmentSelection,
  auxiliaryInformation,channels,ipAddresses,navigation,
  channelEditToggle,
  ipAddressEditToggle,
  channelEditCount,
  ipAddressesEditCount,

  
}

return (
  <>   
  {/* <Router> */}
  <GlobalContext.Provider value = {globalContextValues}>  
    <div className = "wrapper">
      
      <div className = "header__title title-bar"></div> 
          <Navigation />
          {/* <HeaderHome /> */}
          {navigation.equipment && <HeaderEquipment />}
          {navigation.channels && <HeaderChannels />}    
          {navigation.ipAddresses && <HeaderIpAddresses />}
          {navigation.submit && <Submit />}
          <Display /> 
          <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} /></div>
      </div>
  </GlobalContext.Provider>
  {/* </Router> */}
</>
  );
 }

export default App;
