import { CalendarOutlined, EditOutlined, FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AiOutlineClockCircle, AiOutlinePlayCircle, AiOutlineStop } from "react-icons/ai";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import { Table, Button, Tooltip } from "antd";
import IConference from "../Interfaces/IConference";
import dataSource from "../MockData/Conferences";
import { useContext } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const { Column, ColumnGroup } = Table;

const SearchResults = () => {

    const { setConferenceToEdit } = useContext(Context)
    const navigate = useNavigate()

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
    const renderTimeTableCell = (month: string, record: IConference) => {
        debugger;
        // const currentDate = new Date();
        // // const conference = ConferenceWithDates.ParseConferenceDates(record);

        // // Check if conference has essential dates for the current month
        // const hasStart = conference.start ? isInThisMonth(conference.start, month) : false;
        // const hasEnd = conference.end ? isInThisMonth(conference.end, month) : false;
        // const hasNotification = conference.notification ? isInThisMonth(conference.notification, month) : false;
        // const hasDeadline = conference.deadline ? isInThisMonth(conference.deadline, month) : false;

        // // Check if conference dates are after the current date
        // const isStartAfter = conference.start ? conference.start > currentDate : false;
        // const isEndAfter = conference.end ? conference.end > currentDate : false;
        // const isNotificationAfter = conference.notification ? conference.notification > currentDate : false;
        // const isDeadlineAfter = conference.deadline ? conference.deadline > currentDate : false;

        // // Check if conference dates are on the same year as the current date
        // const isStartSameYear = conference.start ? conference.start.getFullYear() == currentDate.getFullYear() : false;
        // const isEndSameYear = conference.end ? conference.end.getFullYear() == currentDate.getFullYear() : false;
        // const isNotificationSameYear = conference.notification ? conference.notification.getFullYear() == currentDate.getFullYear() : false;
        // const isDeadlineSameYear = conference.deadline ? conference.deadline.getFullYear() == currentDate.getFullYear() : false;

        // // debugger;

        // // Build notification icon
        // const notificationIcon = (
        //     <Tooltip title={<span>Notification Date: {conference.notification?.toDateString()}</span>}>
        //         <FileDoneOutlined
        //             className="Timetable_Icon"
        //             style={{ color: isNotificationAfter ? "" : "var(--invalid_color)" }}
        //         />
        //     </Tooltip>
        // );


        // // Build deadline icon
        // const deadlineIcon = (
        //     <Tooltip title={<span>Deadline Date: {conference.deadline?.toDateString()}</span>}>
        //         <AiOutlineClockCircle className="Timetable_Icon" style={{ fontSize: "2em", color: isDeadlineAfter ? "" : "var(--invalid_color)" }} />
        //     </Tooltip>
        // );


        // // Build start icon
        // const startIcon = (
        //     <Tooltip title={<span>Start Date: {conference.start?.toDateString()}</span>}>
        //         <AiOutlinePlayCircle className="Timetable_Icon" style={{ fontSize: "2em", color: isStartAfter ? "" : "var(--invalid_color)" }} />
        //     </Tooltip>
        // );

        // // Build end icon
        // const endIcon = (
        //     <Tooltip title={<span>End Date: {conference.end?.toDateString()}</span>}>
        //         <AiOutlineStop
        //             className="Timetable_Icon"
        //             style={{ color: isEndAfter ? "" : "var(--invalid_color)" }}
        //         />
        //     </Tooltip>
        // );

        // if (isCurrentMonth(month)) {
        //     const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        //     const interval = (100 / days) * currentDate.getDay();

        //     return (
        //         <div>
        //             <Tooltip title={<span>Current Date: {currentDate.toDateString()}</span>}>
        //                 <div className="Timetable_Marker" style={{ left: `${interval}%` }}></div>
        //             </Tooltip>

        //             {hasNotification && isNotificationSameYear ? notificationIcon : <></>}
        //             {hasDeadline && isDeadlineSameYear ? deadlineIcon : <></>}
        //             {hasStart && isStartSameYear ? startIcon : <></>}
        //             {hasEnd && isEndSameYear ? endIcon : <></>}
        //         </div>

        //     )
        // }


        // return (
        //     <div>
        //         {hasNotification && isNotificationAfter ? notificationIcon : <></>}
        //         {hasDeadline && isDeadlineAfter ? deadlineIcon : <></>}
        //         {hasStart && isStartAfter ? startIcon : <></>}
        //         {hasEnd && isEndAfter ? endIcon : <></>}
        //     </div>
        // )
        return (<></>);
    }

    // Edit Functions

    const onEditRow = (record: IConference) => {
        setConferenceToEdit(record)
        navigate("/edit");
    }

    const viewDetails = (record: IConference) => {
        setConferenceToEdit(record)
        navigate("/details");
    }


    return (
        <NavBar>
            <div className="SearchResults_Body">
                <SearchBar />

                <Table style={{ width: "100vw" }} dataSource={dataSource}
                    pagination={{
                        defaultPageSize: 10,
                        pageSize: 10,
                        position: ["bottomLeft"]
                    }}
                >
                    <Column dataIndex='key' hidden={true} key='key' />

                    <ColumnGroup title={<span className="SearchResults_Headers">Actions</span>}>

                        <Column align="center" render={(_, conference: IConference) => <EditOutlined onClick={() => { onEditRow(conference) }} style={{ fontSize: "2em", cursor: "pointer" }} />} />
                        <Column align="center" render={(_, conference: IConference) => <InfoCircleOutlined onClick={() => {viewDetails(conference)}} style={{ fontSize: "2em", cursor: "pointer" }} />} />
                        {/* <Column align="center" render={() => <CalendarOutlined style={{ fontSize: "2em", cursor: "pointer" }} />} /> */}

                    </ColumnGroup>

                    <ColumnGroup title={<span className="SearchResults_Headers">Information</span>}>
                        <Column title={<span className="SearchResults_Headers">Acronym</span>} dataIndex='acronym' align="center" width='10%' />
                        <Column title={<span className="SearchResults_Headers">Conference Title</span>} dataIndex='title' align="center" width='20%' render={(_: string, record: IConference) => <Button type='link' href={record.website}>{record.title}</Button>} />
                        <Column title={<span className="SearchResults_Headers">Rank</span>} dataIndex='core_rank' align="center" width='5%' />
                        {/* <Column title={<span className="SearchResults_Headers">Location</span>} dataIndex='location' align="center" width='10%' /> */}
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
                                        render={(_: string, record: IConference) => renderTimeTableCell(month, record)}
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