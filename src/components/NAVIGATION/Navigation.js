import React,{ useContext } from 'react'
import { GlobalContext, NAVIGATION } from '../App'

export default function Navigation() {
  const {
    navigation,
    navigationDispatch,
    equipmentSelection,
    channels,
    ipAddresses
  } = useContext(GlobalContext)

  return (
    <>
    <div className="navigation">
      <div className="navigation__title-container">
        {!navigation.equipment &&<div className="navigation__title" onClick={() => navigationDispatch({type:NAVIGATION.EQUIPMENT})}>EQUIPMENT</div>}
        {navigation.equipment &&<div className="navigation__title active" onClick={() => navigationDispatch({type:NAVIGATION.EQUIPMENT})}><span id="underlined">EQUIPMENT</span></div>}
        {!navigation.channels && equipmentSelection && <div className="navigation__title" onClick={() => navigationDispatch({type:NAVIGATION.CHANNELS})}>CHANNELS</div>}
        {navigation.channels && equipmentSelection && <div className="navigation__title active" onClick={() => navigationDispatch({type:NAVIGATION.CHANNELS})}><span id="underlined">CHANNELS</span></div>}
        {!navigation.ipAddresses && channels.length > 0 &&<div className="navigation__title" onClick={() => navigationDispatch({type:NAVIGATION.IPADDRESSES})}>IP ADDRESSES</div>}
        {navigation.ipAddresses && channels.length > 0 &&<div className="navigation__title active" onClick={() => navigationDispatch({type:NAVIGATION.IPADDRESSES})}><span id="underlined">IP ADDRESSES</span></div>}
        {!navigation.submit && ipAddresses.length > 0 &&<div className="navigation__title" onClick={() => navigationDispatch({type:NAVIGATION.SUBMIT})}>SUBMIT</div>}
        {navigation.submit && ipAddresses.length > 0 &&<div className="navigation__title active" onClick={() => navigationDispatch({type:NAVIGATION.SUBMIT})}><span id="underlined">SUBMIT</span></div>}
        </div>
      
      <div className="navigation__branding">HVS Equipment Parameters</div>
      
    </div>
    </>
  )
  }
