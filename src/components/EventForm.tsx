import {FC} from 'react'
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import { useState } from "react";
import { IEvent } from '../models/event';
import * as uuid from 'uuid'
import { useCookies } from 'react-cookie';


/* 
id:string,
    userId:string,
    date:string,
    type:string,
    info:string
*/

interface props{
    choosenDate:string,
    submit:(object:IEvent)=>void,
    setIsModalVisible:(bool:boolean)=>void
}

export const EventForm:FC<props>=(props)=>{
    const [cookies,setCookies]=useCookies(['user'])
    const [event, setEvent] = useState({
        id: '',
        userId: '',
        date: '',
        type: '',
        info:''
    });
    


    const submitForm = () => {
        props.submit({...event,id:uuid.v4(),userId:cookies.user.id,date:props.choosenDate})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
            >
                <Input
                    onChange={e => setEvent({...event, info: e.target.value})}
                    value={event.info}
                />
            </Form.Item>
            <Form.Item
                label="Choose type of event"
                name="type"
            >
                <Select onChange={(type: string) => setEvent({...event, type:type})}>
                    {['warning','success','error'].map(type =>
                        <Select.Option key={type} value={type}>
                            {type}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
}