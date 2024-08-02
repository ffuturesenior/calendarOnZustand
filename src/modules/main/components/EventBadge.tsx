import {useEffect,FC,useState} from 'react'
import { IEvent } from '../../../models/event'
import { getOneUser } from '../service/calendarService'
import { IUser } from '../../../models/user'
import { Badge, BadgeProps, Modal } from 'antd'
import { EventStore } from '../../../store/eventStore'
import { EventModal } from './EventModal'
import { UserStore } from '../../../store/userStore'

interface props{
    event:IEvent
}

export const EventBadge:FC<props>=(props)=>{
    const {removeEvent}=EventStore()
    const [isLoading,setIsLoading]=useState(true)
    const [isError,setIsError]=useState(false)
    const [user,setUser]=useState<IUser>({
        email:'',
        id:'',
        password:'',
        username:''
    })
    const [evDataModalVisbility,setEvDataModalVisibility]=useState(false)
    useEffect(()=>{
        getOneUser(props.event.userId,setUser,setIsLoading,setIsError)
    },[])
    


    return(
        <>
                <Modal
                    title="ev data"
                    visible={evDataModalVisbility}
                    footer={null}
                    onCancel={() => setEvDataModalVisibility(false)}
                >
                    <EventModal isError={isError} isLoading={isLoading} event={props.event} user={user}/>
                </Modal>
            <div onClick={()=>setEvDataModalVisibility(true)}>
                <Badge status={props.event.type as BadgeProps['status']} text={props.event.info}/>
            </div>

        </>
        
    )
}