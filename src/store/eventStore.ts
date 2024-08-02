import { IEvent } from '../models/event'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware';
interface IEventState {
	event: IEvent[]
	addEvent:(obj:IEvent)=>void,
    removeEvent:(id:string)=>void
}

export const EventStore = create<IEventState>()(persist((set) => ({
	// initial state

	event: [],
	addEvent:(obj)=>{
        set((state)=>({
            event:[...state.event,obj]
        }))
    },
    removeEvent:(id)=>{
        set((state)=>({
            event:state.event.filter((p)=>{
                if(p.id!==id) return p
            })
        }))
    }
}),{name:'evStore',version:1}))
