import { EditOutlined, FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AiOutlineClockCircle, AiOutlinePlayCircle, AiOutlineStop } from "react-icons/ai";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import { Table, Button, Tooltip } from "antd";
// import dataSource from "../MockData/Conferences";
import { useContext } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { Conference, ConferenceWithEvents, Event } from "../Services";

const { Column, ColumnGroup } = Table;

const SearchResults = () => {

    const { setConferenceToEdit, setConferenceToView, appClient } = useContext(Context)
    const navigate = useNavigate()

    // console.log(await appClient.default.getApiV1Conferences());
    // debugger;

    // Month Util Functions
    const get12MonthsAhead = (): string[] => {
        const result: string[] = [];

        const currentDate = new Date();
        result.push(currentDate.toLocaleString('default', { month: 'short' }));

        for (let i = 0; i < 11; i++) {
            currentDate.setMonth(currentDate.getMonth() + 1)
            const month = currentDate.toLocaleString('default', { month: 'short' });
            result.push(month)
        }

        return result;
    }
    const isCurrentMonth = (month: string) => {
        return month.toLowerCase() == (new Date()).toLocaleString('default', { month: 'short' }).toLowerCase()
    }
    const isInThisMonth = (date: Date, month: string) => {
        return month.toLowerCase() == date.toLocaleString('default', { month: 'short' }).toLowerCase()
    }
    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    }

    const renderTimeTableCell = (month: string, record: ConferenceWithEvents) => {
        // debugger;
        const currentDate = new Date();

        let nearFutureEvents: Event[] = [];
        if (record.events !== undefined && record.events.length > 0) {
            nearFutureEvents = record.events
                .filter(event =>
                    new Date(event.start ?? "") > currentDate ||
                    new Date(event.end ?? "") > currentDate ||
                    new Date(event.paper_submission ?? "") > currentDate ||
                    new Date(event.abstract_submission ?? "") > currentDate ||
                    new Date(event.notification_due ?? "") > currentDate ||
                    new Date(event.final_due ?? "") > currentDate ||
                    new Date(event.camera_ready ?? "") > currentDate
                )
        }
        // nearFutureEvents.map(event => {

        //     // Check if conference has essential dates for the current month
        //     const hasStart = event.start ? isInThisMonth(event.start, month) : false;
        //     const hasEnd = event.end ? isInThisMonth(event.end, month) : false;
        //     const hasNotification = event.notification_due ? isInThisMonth(event.notification_due, month) : false;
        //     const hasDeadline = event.final_due ? isInThisMonth(event.final_due, month) : false;

        //     // Check if conference dates are after the current date
        //     const isStartAfter = event.start ? event.start > currentDate : false;
        //     const isEndAfter = event.end ? event.end > currentDate : false;
        //     const isNotificationAfter = event.notification_due ? event.notification_due > currentDate : false;
        //     const isDeadlineAfter = event.final_due ? event.final_due > currentDate : false;

        //     // Check if conference dates are on the same year as the current date
        //     const isStartSameYear = event.start ? event.start.getFullYear() == currentDate.getFullYear() : false;
        //     const isEndSameYear = event.end ? event.end.getFullYear() == currentDate.getFullYear() : false;
        //     const isNotificationSameYear = event.notification_due ? event.notification_due.getFullYear() == currentDate.getFullYear() : false;
        //     const isDeadlineSameYear = event.final_due ? event.final_due.getFullYear() == currentDate.getFullYear() : false;

        //     // debugger;

        //     return {
        //         title: event.title,
        //         show
        //     }
        // })

        const start = new Date(nearFutureEvents[0].start ?? "");
        const end = new Date(nearFutureEvents[0].end ?? "");
        const notificationDue = new Date(nearFutureEvents[0].notification_due ?? "");
        const finalDue = new Date(nearFutureEvents[0].final_due ?? "");

        // Check if conference has essential dates for the current month
        const hasStart = nearFutureEvents[0].start ? isInThisMonth(start, month) : false;
        const hasEnd = nearFutureEvents[0].end ? isInThisMonth(end, month) : false;
        const hasNotification = nearFutureEvents[0].notification_due ? isInThisMonth(notificationDue, month) : false;
        const hasDeadline = nearFutureEvents[0].final_due ? isInThisMonth(finalDue, month) : false;

        // Check if conference dates are after the current date
        const isStartAfter = nearFutureEvents[0].start ? start > currentDate : false;
        const isEndAfter = nearFutureEvents[0].end ? end > currentDate : false;
        const isNotificationAfter = nearFutureEvents[0].notification_due ? notificationDue > currentDate : false;
        const isDeadlineAfter = nearFutureEvents[0].final_due ? finalDue > currentDate : false;

        // Check if conference dates are on the same year as the current date
        const isStartSameYear = nearFutureEvents[0].start ? start.getFullYear() == currentDate.getFullYear() : false;
        const isEndSameYear = nearFutureEvents[0].end ? end.getFullYear() == currentDate.getFullYear() : false;
        const isNotificationSameYear = nearFutureEvents[0].notification_due ? notificationDue.getFullYear() == currentDate.getFullYear() : false;
        const isDeadlineSameYear = nearFutureEvents[0].final_due ? finalDue.getFullYear() == currentDate.getFullYear() : false;

        // Build notification icon
        const notificationIcon = (
            <Tooltip title={<span>Notification Date: {nearFutureEvents[0].notification_due?.toDateString()}</span>}>
                <FileDoneOutlined
                    className="Timetable_Icon"
                    style={{ color: isNotificationAfter ? "" : "var(--invalid_color)" }}
                />
            </Tooltip>
        );


        // Build deadline icon
        const deadlineIcon = (
            <Tooltip title={<span>Deadline Date: {nearFutureEvents[0].final_due?.toDateString()}</span>}>
                <AiOutlineClockCircle className="Timetable_Icon" style={{ fontSize: "2em", color: isDeadlineAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );


        // Build start icon
        const startIcon = (
            <Tooltip title={<span>Start Date: {nearFutureEvents[0].start?.toDateString()}</span>}>
                <AiOutlinePlayCircle className="Timetable_Icon" style={{ fontSize: "2em", color: isStartAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );

        // Build end icon
        const endIcon = (
            <Tooltip title={<span>End Date: {nearFutureEvents[0].end?.toDateString()}</span>}>
                <AiOutlineStop
                    className="Timetable_Icon"
                    style={{ color: isEndAfter ? "" : "var(--invalid_color)" }}
                />
            </Tooltip>
        );
        if (isCurrentMonth(month)) {
            const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
            const interval = (100 / days) * currentDate.getDay();

            return (
                <div>
                    <Tooltip title={<span>Current Date: {currentDate.toDateString()}</span>}>
                        <div className="Timetable_Marker" style={{ left: `${interval}%` }}></div>
                    </Tooltip>

                    {hasNotification && isNotificationSameYear ? notificationIcon : <></>}
                    {hasDeadline && isDeadlineSameYear ? deadlineIcon : <></>}
                    {hasStart && isStartSameYear ? startIcon : <></>}
                    {hasEnd && isEndSameYear ? endIcon : <></>}
                </div>

            )
        }


        return (
            <div>
                {hasNotification && isNotificationAfter ? notificationIcon : <></>}
                {hasDeadline && isDeadlineAfter ? deadlineIcon : <></>}
                {hasStart && isStartAfter ? startIcon : <></>}
                {hasEnd && isEndAfter ? endIcon : <></>}
            </div>
        )

        return (<></>);
    }

    // Edit Functions
    const onEditRow = (record: Conference) => {
        setConferenceToEdit(record)
        navigate("/edit");
    }

    const viewDetails = (record: Conference) => {
        setConferenceToView(record)
        navigate("/details");
    }


    return (
        <NavBar>
            <div className="SearchResults_Body">
                <SearchBar />

                <Table style={{ width: "100vw" }}
                    pagination={{
                        defaultPageSize: 10,
                        pageSize: 10,
                        position: ["bottomLeft"]
                    }}
                >
                    <Column dataIndex='key' hidden={true} key='key' />

                    <ColumnGroup title={<span className="SearchResults_Headers">Actions</span>}>

                        {/* <Column align="center" render={(_, conference: Conference) => <EditOutlined onClick={() => { onEditRow(conference) }} style={{ fontSize: "2em", cursor: "pointer" }} />} /> */}
                        <Column align="center" render={(_, conference: Conference) => <InfoCircleOutlined onClick={() => { viewDetails(conference) }} style={{ fontSize: "2em", cursor: "pointer" }} />} />
                        {/* <Column align="center" render={() => <CalendarOutlined style={{ fontSize: "2em", cursor: "pointer" }} />} /> */}

                    </ColumnGroup>

                    <ColumnGroup title={<span className="SearchResults_Headers">Information</span>}>
                        <Column title={<span className="SearchResults_Headers">Acronym</span>} dataIndex='acronym' align="center" width='10%' />
                        <Column title={<span className="SearchResults_Headers">Conference Title</span>} dataIndex='title' align="center" width='20%' render={(_: string, record: Conference) => <Button type='link' href={record.website}>{record.title}</Button>} />
                        <Column title={<span className="SearchResults_Headers">Rank</span>} dataIndex='core_rank' align="center" width='5%' />
                        <Column dataIndex='wikicfp_url' align="center" width='5%' render={(_: string, record: Conference) => <Button type='link' href={record.wikicfp_url}>See on Wikicfp</Button>} />
                    </ColumnGroup>

                    <ColumnGroup title={<span className="SearchResults_Headers">Timetable</span>} dataIndex='' align="center" width='55%'>
                        {
                            get12MonthsAhead()
                                .map((month, index) =>
                                    <Column
                                        key={index}
                                        className="Timetable_Column"
                                        title={<span className="SearchResults_Headers">{month}</span>}
                                        align="center"
                                        render={(_: string, record: Conference) => renderTimeTableCell(month, record)}
                                    />
                                )
                        }
                    </ColumnGroup>
                </Table>
            </div>
        </NavBar>
    );
}

export default SearchResults;