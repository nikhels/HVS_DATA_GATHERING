// import ACTIONS from '..components/App'

// export default function updateChannels(channels,action){ 
//   const {channelCount,virtual,physical}= parameters 
//   switch (action.type){
//     case ACTIONS.LOAD:

//       return channels = action.payload.channels
    
//     case ACTIONS.DEFAULT:
//           for (let x = 1; x <= channelCount; x++){channels = [...channels,new ChannelConstructor(x,virtual,physical)]}
//           return channels
        
//     case ACTIONS.EDIT_ALL_START:
//       return channels.map(channel => ({...channel,selected:true})) 
//     case ACTIONS.EDIT_ALL_STOP:
//       return channels.map(channel => ({...channel,selected:false})) 
//     case ACTIONS.CHANGE:
//       const channelChanges = [...channels]
//       const index = channelChanges.findIndex(c => c.id === action.payload.id)
//       channelChanges[index] = action.payload.channel
//       return channels = channelChanges
//     default:
//       return channels
//     } 
// }