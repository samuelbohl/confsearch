import { InfoCircleOutlined } from "@ant-design/icons";
import { AiOutlineCheckSquare, AiOutlineClockCircle, AiOutlineFileDone, AiOutlineNotification, AiOutlinePlayCircle, AiOutlineStop, AiOutlineVideoCamera } from "react-icons/ai";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import { Table, Button, Tooltip } from "antd";
import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Conference, ConferenceWithEvents, Event } from "../Services";
import { useQuery } from "@tanstack/react-query";
import { daysInMonth, get12MonthsAhead, isCurrentMonth, isInThisMonth } from "../Utils/utils";

const { Column } = Table;

const SearchResults = () => {

    const { appClient } = useContext(Context)
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()

    const searchConferences = async () => {
        const params = searchParams.toString().split("=")[1];
        // console.log(params);

        return await appClient.default.getApiV1Search(params)
    }

    const { data: results, refetch: refetch, isLoading: loading } = useQuery({
        queryKey: ["search"],
        queryFn: (searchConferences)
    });

    // useEffect(() => {
    //     // console.log("aaaaaaa")
    // }, [isRefetching])

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);


    const renderTimeTableCell = (month: string, record: ConferenceWithEvents) => {
        // debugger;
        const currentDate = new Date();

        if (record.events === undefined || record.events.length == 0) {
            if (isCurrentMonth(month)) {
                const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
                const interval = (100 / days) * currentDate.getDate();
                return (
                    <div>
                        <Tooltip title={<span>Current Date: {currentDate.toDateString()}</span>}>
                            <div className="Timetable_Marker" style={{ left: `${interval}%` }}></div>
                        </Tooltip>
                    </div>
                )
            }


            return (<div></div>)
        }

        const nearFutureEvents: Event[] = record.events
            .filter(event =>
                new Date(event.start ?? "") > currentDate ||
                new Date(event.end ?? "") > currentDate ||
                new Date(event.paperSubmission ?? "") > currentDate ||
                new Date(event.abstractSubmission ?? "") > currentDate ||
                new Date(event.notificationDue ?? "") > currentDate ||
                new Date(event.finalDue ?? "") > currentDate ||
                new Date(event.cameraReady ?? "") > currentDate
            )

        if (nearFutureEvents.length == 0) {
            if (isCurrentMonth(month)) {
                const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
                const interval = (100 / days) * currentDate.getDate();
                return (
                    <div>
                        <Tooltip title={<span>Current Date: {currentDate.toDateString()}</span>}>
                            <div className="Timetable_Marker" style={{ left: `${interval}%` }}></div>
                        </Tooltip>
                    </div>
                )
            }


            return (<div></div>)
        }


        const start = new Date(nearFutureEvents[0].start ?? "");
        const end = new Date(nearFutureEvents[0].end ?? "");
        const notificationDue = new Date(nearFutureEvents[0].notificationDue ?? "");
        const finalDue = new Date(nearFutureEvents[0].finalDue ?? "");
        const abstractSubmission = new Date(nearFutureEvents[0].abstractSubmission ?? "");
        const paperSubmission = new Date(nearFutureEvents[0].paperSubmission ?? "");
        const cameraReady = new Date(nearFutureEvents[0].cameraReady ?? "");

        // Check if conference has essential dates for the current month
        const hasStart = nearFutureEvents[0].start ? isInThisMonth(start, month) : false;
        const hasEnd = nearFutureEvents[0].end ? isInThisMonth(end, month) : false;
        const hasNotification = nearFutureEvents[0].notificationDue ? isInThisMonth(notificationDue, month) : false;
        const hasDeadline = nearFutureEvents[0].finalDue ? isInThisMonth(finalDue, month) : false;
        const hasAbstractSubmission = nearFutureEvents[0].abstractSubmission ? isInThisMonth(abstractSubmission, month) : false;
        const hasPaperSubmission = nearFutureEvents[0].paperSubmission ? isInThisMonth(paperSubmission, month) : false;
        const hasCameraReady = nearFutureEvents[0].cameraReady ? isInThisMonth(cameraReady, month) : false;

        // Check if conference dates are after the current date
        const isStartAfter = nearFutureEvents[0].start ? start > currentDate : false;
        const isEndAfter = nearFutureEvents[0].end ? end > currentDate : false;
        const isNotificationAfter = nearFutureEvents[0].notificationDue ? notificationDue > currentDate : false;
        const isDeadlineAfter = nearFutureEvents[0].finalDue ? finalDue > currentDate : false;
        const isAbstractAfter = nearFutureEvents[0].abstractSubmission ? abstractSubmission > currentDate : false;
        const isPaperAfter = nearFutureEvents[0].paperSubmission ? paperSubmission > currentDate : false;
        const isCameraAfter = nearFutureEvents[0].cameraReady ? cameraReady > currentDate : false;

        // Check if conference dates are on the same year as the current date
        const isStartSameYear = nearFutureEvents[0].start ? start.getFullYear() == currentDate.getFullYear() : false;
        const isEndSameYear = nearFutureEvents[0].end ? end.getFullYear() == currentDate.getFullYear() : false;
        const isNotificationSameYear = nearFutureEvents[0].notificationDue ? notificationDue.getFullYear() == currentDate.getFullYear() : false;
        const isDeadlineSameYear = nearFutureEvents[0].finalDue ? finalDue.getFullYear() == currentDate.getFullYear() : false;
        const isAbstractSameYear = nearFutureEvents[0].abstractSubmission ? finalDue.getFullYear() == currentDate.getFullYear() : false;
        const isPaperSameYear = nearFutureEvents[0].paperSubmission ? finalDue.getFullYear() == currentDate.getFullYear() : false;
        const isCameraSameYear = nearFutureEvents[0].cameraReady ? finalDue.getFullYear() == currentDate.getFullYear() : false;

        // Build start icon
        const startIcon = (
            <Tooltip title={<span>Start Date: {start.toDateString()}</span>}>
                <AiOutlinePlayCircle className="Timetable_Icon" style={{ color: isStartAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );

        // Build end icon
        const endIcon = (
            <Tooltip title={<span>End Date: {end.toDateString()}</span>}>
                <AiOutlineStop
                    className="Timetable_Icon"
                    style={{ color: isEndAfter ? "" : "var(--invalid_color)" }}
                />
            </Tooltip>
        );

        // Build notification icon
        const notificationIcon = (
            <Tooltip title={<span>Notification Date: {notificationDue.toDateString()}</span>}>
                <AiOutlineNotification
                    className="Timetable_Icon"
                    style={{ color: isNotificationAfter ? "" : "var(--invalid_color)" }}
                />
            </Tooltip>
        );

        // Build deadline icon
        const deadlineIcon = (
            <Tooltip title={<span>Deadline Date: {finalDue.toDateString()}</span>}>
                <AiOutlineClockCircle className="Timetable_Icon" style={{ color: isDeadlineAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );

        // Build paper submission icon
        const paperIcon = (
            <Tooltip title={<span>Paper Submission Date: {paperSubmission.toDateString()}</span>}>
                <AiOutlineFileDone className="Timetable_Icon" style={{ color: isPaperAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );

        // Build camera ready icon
        const cameraReadyIcon = (
            <Tooltip title={<span>Camera Ready Date: {cameraReady.toDateString()}</span>}>
                <AiOutlineVideoCamera className="Timetable_Icon" style={{ color: isCameraAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );

        // Build abstract ready icon
        const abstractIcon = (
            <Tooltip title={<span>Camera Ready Date: {abstractSubmission.toDateString()}</span>}>
                <AiOutlineCheckSquare className="Timetable_Icon" style={{ color: isAbstractAfter ? "" : "var(--invalid_color)" }} />
            </Tooltip>
        );


        if (isCurrentMonth(month)) {
            const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
            const interval = (100 / days) * currentDate.getDate();
            return (
                <div>
                    <Tooltip title={<span>Current Date: {currentDate.toDateString()}</span>}>
                        <div className="Timetable_Marker" style={{ left: `${interval}%` }}></div>
                    </Tooltip>

                    {hasNotification && isNotificationSameYear ? notificationIcon : <></>}
                    {hasDeadline && isDeadlineSameYear ? deadlineIcon : <></>}
                    {hasStart && isStartSameYear ? startIcon : <></>}
                    {hasEnd && isEndSameYear ? endIcon : <></>}
                    {hasAbstractSubmission && isAbstractSameYear ? abstractIcon : <></>}
                    {hasCameraReady && isCameraSameYear ? cameraReadyIcon : <></>}
                    {hasPaperSubmission && isPaperSameYear ? paperIcon : <></>}
                </div>
            )
        }


        return (
            <div>
                {hasNotification && isNotificationAfter ? notificationIcon : <></>}
                {hasDeadline && isDeadlineAfter ? deadlineIcon : <></>}
                {hasStart && isStartAfter ? startIcon : <></>}
                {hasEnd && isEndAfter ? endIcon : <></>}
                {hasAbstractSubmission && isAbstractAfter ? abstractIcon : <></>}
                {hasCameraReady && isCameraAfter ? cameraReadyIcon : <></>}
                {hasPaperSubmission && isPaperAfter ? paperIcon : <></>}
            </div>
        )
    }

    const viewDetails = (record: Conference) => {
        navigate({
            pathname: "/details",
            search: createSearchParams({
                id: record.id?.toString() ?? ""
            }).toString()
        });
    }

    // const filterItems: MenuProps['items'] = [
    //     {
    //         key: '1',
    //         label: (
    //             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //                 1st menu item
    //             </a>
    //         )
    //     },
    // ]


    return (
        <NavBar>
            <div className="SearchResults_Body">
                <SearchBar />

                <div style={{ width: "100%" }}>

                    <Table style={{ width: "100vw", height: "100%" }}
                        pagination={{
                            defaultPageSize: 10,
                            pageSize: 10,
                            position: ["bottomLeft"]
                        }}
                        dataSource={results?.data?.map((res, index) => ({ ...res, key: index }))}
                        loading={loading}
                    // rowKey="id"
                    // sticky={true}
                    // scroll={{ y: 40 }}
                    >
                        <Column dataIndex='key' hidden={true} key='id' />

                        <Column align="center" render={(_, conference: Conference) => <InfoCircleOutlined onClick={() => { viewDetails(conference) }} style={{ fontSize: "1.5em", cursor: "pointer" }} />} />

                        <Column title={<span className="SearchResults_Headers">Acronym</span>} dataIndex='acronym' align="center" width='10%' />
                        <Column title={<span className="SearchResults_Headers">Conference Title</span>} dataIndex='title' align="center" width='20%' 
                            render={(_: string, record: Conference) => record.website != null ? <Button type='link' href={record.website}>{record.title}</Button> : <span>{record.title}</span>} />
                        
                        
                        
                        
                        <Column dataIndex='wikicfp_url' align="center" width='5%' render={(_: string, record: Conference) => <Button type='link' href={record.wikicfpUrl}>See on Wikicfp</Button>} />
                        <Column title={<span className="SearchResults_Headers">Rank</span>} dataIndex='coreRank' align="center" width='5%' />

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
                    </Table>
                </div>
            </div>
        </NavBar>
    );
}

export default SearchResults;