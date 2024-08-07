import { Button, DatePicker, Table, Tooltip } from "antd";
import { Event } from "../../Services";
import Column from "antd/es/table/Column";
import { CSSProperties } from "react";
import dayjs from "dayjs"
import { EditOutlined } from "@ant-design/icons";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimeTable = (
    { events, style, setIsEditingEvent, setEventToEdit }:
        { setEventToEdit: (React.Dispatch<React.SetStateAction<Event | null>> | null), setIsEditingEvent: (React.Dispatch<React.SetStateAction<boolean>> | null), events: Event[], style: CSSProperties }
) => {
    const editRecord = (record: Event) => {
        setEventToEdit(record)
        setIsEditingEvent(true);

    }

    const renderDatePicker = (value: Date) => <DatePicker width="5rem" disabled={true} value={dayjs(value)} />

    return (
        <Table
            virtual
            scroll={{ x: 2500, y: 2000 }}
            style={style}
            dataSource={events}
            rowKey="id"
            pagination={{
                defaultPageSize: 10,
                pageSize: 10,
                position: ["bottomLeft"]
            }}
        >
            <Column fixed="left" title={<span className="SearchResults_Headers">Acronym</span>} dataIndex='acronym' align="center" />
            <Column title={<span className="SearchResults_Headers">Conference</span>} dataIndex='conference' align="center" />
            <Column title={<span className="SearchResults_Headers">Event Title</span>} dataIndex='title' align="center" render={(_: string, record: Event) => <Button type='link' href={record.event_url}>{record.title}</Button>} />
            <Column title={<span className="SearchResults_Headers">Location</span>} dataIndex='location' align="center" />
            <Column title={<span className="SearchResults_Headers">Categories</span>} dataIndex='categories' align="center" />
            <Column title={<span className="SearchResults_Headers">Description</span>} dataIndex='description' align="center" />

            <Column title={<span className="SearchResults_Headers">Start</span>} dataIndex='start' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">End</span>} dataIndex='end' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Paper Submission</span>} dataIndex='paper_submission' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Abstract Submission</span>} dataIndex='abstract_submission' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Notification Due</span>} dataIndex='notification_due' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Final Due</span>} dataIndex='final_due' align="center" render={renderDatePicker} />
            <Column title={<span className="SearchResults_Headers">Camera Ready</span>} dataIndex='camera_ready' align="center" render={renderDatePicker} />

            <Column
                width="5%"
                fixed="right"
                align="center"
                render={(_: string, record: Event) =>
                    <Tooltip title="Edit">
                        <Button type="default" shape="circle" onClick={() => editRecord(record)} icon={<EditOutlined />} />
                    </Tooltip>
                } />
        </Table>
    )
}

export default TimeTable;