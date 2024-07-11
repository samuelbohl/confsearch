// import { Form, Input } from "antd";
// import { useForm } from "antd/es/form/Form";
import { DatePicker, FormInstance, Table } from "antd";
import { Event, EventTrack } from "../../Services";
import Column from "antd/es/table/Column";
import dayjs from "dayjs"



// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const EditEventTrack = ({ track, form }: { track: EventTrack[], form?: FormInstance<any> | undefined }) => {

    return (
        <Table
            dataSource={track}
            pagination={false}
            rowKey="id"
        >
            <Column title={<span className="SearchResults_Headers">Name</span>} dataIndex='name' align="center" />
            <Column title={<span className="SearchResults_Headers">Description</span>} dataIndex='description' align="center" />
            <Column title={<span className="SearchResults_Headers">Deadline Notes</span>} dataIndex='deadlines_note' align="center" />

            <Column title={<span className="SearchResults_Headers">Paper Submission</span>} dataIndex='paper_submission' align="center" render={(_: string, record: Event) => <DatePicker value={dayjs(record.paper_submission)} />} />
            <Column title={<span className="SearchResults_Headers">Abstract Submission</span>} dataIndex='abstract_submission' align="center" render={(_: string, record: Event) => <DatePicker value={dayjs(record.abstract_submission)} />} />
            <Column title={<span className="SearchResults_Headers">Notification Due</span>} dataIndex='notification_due' align="center" render={(_: string, record: Event) => <DatePicker value={dayjs(record.notification_due)} />} />
            <Column title={<span className="SearchResults_Headers">Camera Ready Due</span>} dataIndex='camera_ready' align="center" render={(_: string, record: Event) => <DatePicker value={dayjs(record.camera_ready)} />} />

        </Table>
    )
}

export default EditEventTrack;