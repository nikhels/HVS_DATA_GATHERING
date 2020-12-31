import React,{ useContext} from 'react'
import { GlobalContext } from '../App'
import { FiEdit } from 'react-icons/fi'
import DisplayChannelData from './DisplayChannelData'
import IpOutput from '../TRANSPORTS/IpOutput'



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
  <div className="display__background">
    <table className="display__channel-container">
    <thead>
      <tr> 
    {!channelEditToggle &&
        <th className="display__header-normal edit" id ="edit-column-header" onClick={() => handleChannelEditToggle(true) }>
        <div className="display__edit-all-text">EDIT ALL</div>
        </th>}
    {channelEditToggle &&
        <th className="display__header-normal edit selected" id ="edit-column-header-selected" onClick={() => handleChannelEditToggle(false)}>
        <FiEdit /><div className="display__edit-all-text">ALL</div>
        </th>}
        <th className="display__header-normal">INPUT TYPE</th>
        <th className="display__header-normal">DISPLAY NAME & AFFILIATION</th>
        <th className="display__header-normal">VIRTUAL CHANNEL</th>
        <th className="display__header-normal">PHYSICAL CHANNEL</th>
        <th className="display__header-normal">INPUT VIDEO FORMAT</th>
        <th className="display__header-normal">OUTPUT VIDEO FORMAT</th>
        <th className="display__header-normal">AFD</th>
        <th className="display__header-normal">OUTPUT ASPECT RATIO</th>
        <th className="display__header-normal">PMT <br />PID</th>
        <th className="display__header-normal">PCR/VIDEO PID</th>
        <th className="display__header-normal">AUDIO 1 PID</th>
        <th className="display__header-normal">AUDIO 1 TYPE</th>
        <th className="display__header-normal">AUDIO 1 BITRATE</th>
        <th className="display__header-normal">AUDIO 2 PID</th>
        <th className="display__header-normal">AUDIO 2 TYPE</th>
        <th className="display__header-normal">AUDIO 2 BITRATE</th>   
      </tr>
    </thead>
        {channelsList}   
    </table>
    </div>
    <IpOutput />

    </>
  )
}
  

