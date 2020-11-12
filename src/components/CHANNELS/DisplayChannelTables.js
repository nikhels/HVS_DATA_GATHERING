import React,{ useContext} from 'react'
import { GlobalContext } from '../App'
import { FiEdit } from 'react-icons/fi'
import DisplayChannelData from './DisplayChannelData'




export default function DisplayChannelTables() {

const {
  channels,
  channelEditToggle,
  handleChannelEditToggle
} = useContext(GlobalContext)


const channelsList = channels.map(channel => {
  return <DisplayChannelData key = {channel.id} {...channel} />
  })
  

  return (
    <>
  
    <table className="display__channel-container">
    <thead>
      <tr> 
    {!channelEditToggle &&
        <th className="display__channel-header edit" id ="edit-column-header" onClick={() => handleChannelEditToggle(true) }>
        <FiEdit /><div className="display__edit-all-text">ALL</div>
        </th>}
    {channelEditToggle &&
        <th className="display__channel-header edit selected" id ="edit-column-header-selected" onClick={() => handleChannelEditToggle(false)}>
        <FiEdit /><div className="display__edit-all-text">ALL</div>
        </th>}
        <th className="display__channel-header">DISPLAY NAME</th>
        <th className="display__channel-header">VIRTUAL CHANNEL</th>
        <th className="display__channel-header">PHYSICAL CHANNEL</th>
        <th className="display__channel-header">VIDEO FORMAT</th>
        <th className="display__channel-header">ASPECT RATIO</th>
        <th className="display__channel-header">PMT <br />PID</th>
        <th className="display__channel-header">PCR/VIDEO PID</th>
        <th className="display__channel-header">AUDIO 1 PID</th>
        <th className="display__channel-header">AUDIO 1 TYPE</th>
        <th className="display__channel-header">AUDIO 1 BITRATE</th>
        <th className="display__channel-header">AUDIO 2 PID</th>
        <th className="display__channel-header">AUDIO 2 TYPE</th>
        <th className="display__channel-header">AUDIO 2 BITRATE</th>   
      </tr>
    </thead>
        {channelsList}
      
    </table>

    </>
  )
}
  

