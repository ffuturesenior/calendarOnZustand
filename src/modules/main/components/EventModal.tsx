import {FC} from 'react'

import { IUser } from "../../../models/user"
import { IEvent } from "../../../models/event"
import { Button } from 'antd'
import { EventStore } from '../../../store/eventStore'

interface props{
    event:IEvent,
    user:IUser,
    isError:boolean,
    isLoading:boolean
}

export const EventModal:FC<props>=(props)=>{
    const {removeEvent}=EventStore()
    const removeEvHandler=()=>{
        if(props.event.userId==localStorage.getItem('userID')){
            removeEvent(props.event.id)
        }
    }
    return(
        <div>
            {props.isLoading?
                <></>
            :
                <>
                    {props.isError?
                        <></>
                    :
                        <>
                            <div>eventData: {props.event.info}</div>
                            <div>created by: {props.user.username}</div>
                            <Button onClick={removeEvHandler} danger>delete event</Button>
                        </>
                    }
                </>
            }
            
        </div>
    )
}