import { Button, DatePicker, Steps, Table, Tooltip } from "antd";
import { Event } from "../Services";
import Column from "antd/es/table/Column";
import dayjs from "dayjs"
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import EventTimeTrack from "./EventTimeTrack";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimeTable = (
    { events }:
        { events: Event[] }
) => {
    // const editRecord = (record: Event) => {
    //     setEventToEdit(record)
    //     setIsEditingEvent(true);

    // }
    

    // const renderDatePicker = (value: Date) => <DatePicker width="5rem" disabled={true} value={dayjs(value)} />



    return (
        <Table
            virtual
            scroll={{ x: 3500, y: 800 }}
            // style={style}
            dataSource={events}
            rowKey="id"
            pagination={{
                defaultPageSize: 7,
                pageSize: 7,
                position: ["bottomLeft"]
            }}
        >
            <Column fixed="left" title={<span className="SearchResults_Headers">Acronym</span>} width="4%" dataIndex='acronym' align="center" />
            <Column title={<span className="SearchResults_Headers">Event Title</span>} width="11%" dataIndex='title' align="center" render={(_: string, record: Event) => <Button type='link' href={record.event_url}>{record.title}</Button>} />
            <Column title={<span className="SearchResults_Headers">Location</span>} width="10%" dataIndex='location' align="center" />
            <Column title={<span className="SearchResults_Headers">Categories</span>} width="10%" dataIndex='categories' align="center" />
            <Column title={<span className="SearchResults_Headers">Description</span>} width="15%" dataIndex='description' align="center" />
            <Column
                title={<span className="SearchResults_Headers">Event Timetrack</span>}
                align="center"
                render={(_: string, record: Event) =>
                    <EventTimeTrack event={record} />
                }
            />

            {/* <Column title={<span className="SearchResults_Headers">Start</span>} dataIndex='start' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">End</span>} dataIndex='end' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Paper Submission</span>} dataIndex='paper_submission' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Abstract Submission</span>} dataIndex='abstract_submission' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Notification Due</span>} dataIndex='notification_due' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Final Due</span>} dataIndex='final_due' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Camera Ready</span>} dataIndex='camera_ready' align="center" render={renderDatePicker} /> */}

            <Column
                width="3%"
                fixed="right"
                align="center"
                render={(_: string, record: Event) =>
                    <Tooltip title="Edit">
                        <Button type="default" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                } />
        </Table>
    )
}

export default TimeTable;