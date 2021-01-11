
import { ACTIONS } from '../DEFAULTS/Defaults'

export function UpdateAuxiliary(event,updateData,changeFunction) {
  
  const {location,payload,id} = updateData

    const changes = {
      ...location,
      ...event,
    };

    changeFunction({
      type: ACTIONS.CHANGE,
      payload: { [payload]: changes },
      id:id
    });
  } 
    
  

