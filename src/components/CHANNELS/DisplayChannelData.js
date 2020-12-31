import React, { useContext } from 'react'
import { GlobalContext, ACTIONS } from '../App'
import { FiEdit } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'

export default function ChannelsDisplayList(channels) {
  const { 
    channelDispatch,
    channelEditCount,
    setChannelEditCount,
    setChannelEditToggle,
    auxiliaryInformation
  } = useContext(GlobalContext)  
  
  const{
    inputType,
    name,
    virtual,
    physical,
    videoTypeIn,
    videoTypeOut,
    aspectRatio,
    afd,
    pmtPid,
    pcrPid,
    audio1Type,
    audio1Bitrate,
    audio1Pid,
    audio2Type,
    audio2Bitrate,
    audio2Pid
  
   } = channels

    
  function handleChanges(changes){
    
    if (changes.selected === true){
      setChannelEditCount(channelEditCount + 1)
      if (channelEditCount === auxiliaryInformation.channelCount-1) setChannelEditToggle(true)
    }

    if (changes.selected === false) {
      console.log(channelEditCount)
      setChannelEditCount(channelEditCount - 1)
      if (channelEditCount > 1) setChannelEditToggle(false)
    }
    
    channelDispatch({type:ACTIONS.CHANGE, payload: {id:channels.id, channel:{...channels,...changes}}})
  }
  
  
  return (
    <>
    {!channels.selected && <tbody className = "display__channel-data" > 
      <tr>
      <td onClick={() => handleChanges({selected:true})} id="edit-column"> <FiEdit /></td>
        <td className="display__text-box small">{inputType}</td>
        <td className="display__text-box large">{name}</td>
        <td className="display__text-box small" >{virtual}</td>
        <td className="display__text-box small" >{physical}</td>
        <td className="display__text-box small ">{videoTypeIn}</td>
        <td className="display__text-box small ">{videoTypeOut}</td>
        <td className="display__text-box small ">{afd}</td>
        <td className="display__text-box small" >{aspectRatio}</td>
        <td className="display__text-box small">{pmtPid}</td>
        <td className="display__text-box small">{pcrPid}</td>
        <td className="display__text-box small" >{audio1Pid}</td>
        <td className="display__text-box large">{audio1Type}</td>
        <td className="display__text-box small">{audio1Bitrate}</td>
        <td className="display__text-box small" >{audio2Pid}</td>
        <td className="display__text-box large">{audio2Type}</td>
        <td className="display__text-box small">{audio2Bitrate}</td>
      </tr>
    </tbody>}

    {channels.selected && <tbody className = "display__channel-data selected" >  
      <tr>
        <td onClick={() => handleChanges({selected:false})} id="edit-column-selected">
        <FaCheckCircle /></td>
        {/* INPUT TYPE SELECTION */}
        <td className="display__edit-text-box small">
        <select 
            onChange= {(e) => handleChanges({inputType:e.target.value})}             
            defaultValue={inputType}>
            <option value="SDI">SDI</option>
            <option value="IP">IP</option>
          </select> 
        </td>
        <td className="display__edit-text-box large">
          <input 
            type="text" 
            id="channel-name" 
            name="channel-name"
            placeholder={name}
            onChange = {(e) => handleChanges({name:e.target.value})}  
          /></td>
        <td className="display__edit-text-box small" >
          <input 
            type="text" 
            id="channel-virtual" 
            placeholder = {virtual}
            
            onChange={(e) => handleChanges({virtual:parseFloat(e.target.value) || ''})} />
        </td>
        <td className="display__edit-text-box small" >
          <input 
            type="text" 
            id="channel-physical"
            
            placeholder = {physical} 
            onChange = {(e) => handleChanges({physical:parseFloat(e.target.value) || ''})} />
        </td>
       {/* INPUT VIDEO FORMAT */}
        <td className="display__edit-text-box small">
        <select 
            onChange= {(e) => handleChanges({videoTypeIn:e.target.value})}             
            defaultValue={videoTypeIn}>
            <option value=""></option>
            <option value="1080i">1080i</option>
            <option value="720p">720p</option>
            <option value="480i">480i</option>
          </select> 
        </td>
       {/* OUTPUT VIDEO FORMAT */}
        <td className="display__edit-text-box small">
        <select 
            onChange= {(e) => handleChanges({videoTypeOut:e.target.value})}             
            defaultValue={videoTypeIn}>
            <option value=""></option>
            <option value="1080i">1080i</option>
            <option value="720p">720p</option>
            <option value="480i">480i</option>
          </select> 
        </td>
       {/* AFD SELECTION*/}
        <td className="display__edit-text-box small">
        <select 
            onChange= {(e) => handleChanges({afd:e.target.value})}             
            defaultValue={afd}>
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> 
        </td>
        <td className="display__edit-text-box small">
        <select 
            onChange= {(e) => handleChanges({aspectRatio:e.target.value})}             
            defaultValue={aspectRatio}>
            <option value=""></option>
            <option value="4x3">4x3</option>
            <option value="16x9">16x9</option>
          </select> 
        </td>       
        <td className="display__edit-text-box small">
        <input 
            type="text" 
            id="channel-pmt" 
            
            defaultValue = {pmtPid}
            onChange = {(e) => handleChanges({pmtPid:e.target.value})}
          />
        </td>
        <td className="display__edit-text-box small">
        <input 
            type="text" 
            id="channel-pcr" 
            
            name="channel-pcr" 
            defaultValue = {pcrPid}
            onChange = {(e) => handleChanges({pcrPid:e.target.value})}
              />
        </td>
        <td className="display__edit-text-box small" >
          <input 
              type="text" 
              id="channel-audio-1" 
              name="channel-audio-1"
              defaultValue = {audio1Pid}
              onChange = {(e) => handleChanges({audio1Pid:e.target.value})}
              /> 
        </td>
        <td className="display__edit-text-box large">
        <select 
            onChange = {(e) => handleChanges({audio1Type:e.target.value})} 
            defaultValue={audio1Type}>
            <option value=""></option>
            <option value="PCM 2.0">PCM 2.0</option>
            <option value="PCM 5.1">PCM 5.1</option>
            <option value="AC-3">AC-3</option>
            <option value="AC-3 Passthrough">AC-3 Passthrough</option>
            <option value="AC-4">AC-4</option>
            
          </select>   
        </td>
        <td className="display__edit-text-box small">
        <select     
            onChange = {(e) => handleChanges({audio1Bitrate:e.target.value})} 
            defaultValue={audio1Bitrate}>
            <option value=""></option>
            <option value="448kbs">448kbs</option>
            <option value="384kbs">384kbs</option>
            <option value="192kbs">192kbs</option>
            <option value="128kbs">128kbs</option>
            <option value="96kbs">96kbs</option>
          </select>     
        </td>
        <td className="display__edit-text-box small">
          <input 
            type="text" 
            id="channel-audio-1" 
            name="channel-audio-1"
             
            defaultValue = {audio2Pid}
            onChange = {(e) => handleChanges({audio2Pid:e.target.value})}
            />
        </td>
        <td className="display__edit-text-box large">
          <select 
            
            onChange = {(e) => handleChanges({audio2Type:e.target.value})} 
            defaultValue={audio2Type}>
            <option value=""></option>
            <option value="PCM 2.0">PCM 2.0</option>
            <option value="PCM 5.1">PCM 5.1</option>
            <option value="AC-3">AC-3</option>
            <option value="AC-3 Passthrough">AC-3 Passthrough</option>
            <option value="AC-4">AC-4</option>
            </select>    
        </td>
        <td className="display__edit-text-box small">
          <select 
            
            onChange = {(e) => handleChanges({audio2Bitrate:e.target.value})} 
            defaultValue={audio2Bitrate}>
            <option value=""></option>
            <option value="448kbs">448kbs</option>
            <option value="384kbs">384kbs</option>
            <option value="192kbs">192kbs</option>
            <option value="128kbs">128kbs</option>
            <option value="96kbs">96kbs</option>
          </select>      
        </td>
      </tr>
    </tbody>}
    
    

  
    
 </>
  )
}
