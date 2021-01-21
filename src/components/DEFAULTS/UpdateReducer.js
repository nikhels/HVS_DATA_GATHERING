
import { ACTIONS } from './Defaults'

export function UpdateReducer(event,updateData,changeFunction) {
  
  const {location,info,payload,id,key } = updateData

    const changes = {
      ...location,
      ...event,
    };

    changeFunction({
      type: ACTIONS.CHANGE, info:info,
      payload: { [payload]: changes,key:key },
      id:id
    });
  } 
    
  


