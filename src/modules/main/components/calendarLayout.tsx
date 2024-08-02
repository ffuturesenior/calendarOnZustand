import React, { useState,useEffect } from 'react';
import { BadgeProps, Modal,Button,Badge, Calendar } from 'antd';
import dayjs,{ Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { formatDate } from '../../../utils/date';
import { EventForm } from '../../../components/EventForm';
import { IEvent } from '../../../models/event';
import { EventStore } from '../../../store/eventStore';
import { getOneUser } from '../service/calendarService';
import { EventBadge } from './EventBadge';

const dateCellRender = (value: Dayjs) => {
    
    const {event}=EventStore() 
    const formatedDate =formatDate(value.toDate()) 
    const currentDayEvents = event.filter(ev => ev.date ==formatedDate);

    
    
    return (
      <div className="events">
        {currentDayEvents.map((item) => (
          <div key={item.id}>
            <EventBadge event={item}/>
          </div>
        ))}
      </div>
    )
}


export const CalendarLayout = () => {

  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));

  const [isModalVisible,setIsModalVisible]=useState(false)
  const {addEvent,event}=EventStore()
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const createEvent=(ev:IEvent)=>{
    addEvent(ev)
    setIsModalVisible(false)
  }

  

  return (
    <>
      {isModalVisible?
      <Modal
        title="add event"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <EventForm choosenDate={value.format('YYYY-MM-DD')} setIsModalVisible={setIsModalVisible} submit={createEvent}/>
      </Modal>
        
      :
        <></>
      }
      <Button onClick={()=>setIsModalVisible(true)}  type="primary">
        add event
      </Button>
      <Calendar value={value} onSelect={onSelect} cellRender={dateCellRender}  />
    </>
    
  )

};
  