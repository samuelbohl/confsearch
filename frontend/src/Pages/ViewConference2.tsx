import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import NavBar from "../Components/NavBar";
import { Button, Descriptions, DescriptionsProps, Form, Layout, Menu, MenuProps, StepProps, Steps, Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { MenuItemGroupType, MenuItemType } from "antd/es/menu/interface";
import { Conference, ConferenceResponse, Event, EventWithTracks } from "../Services";
import ConferenceFormDef from "../Components/ViewConference/ConferenceFormDef";
import DescriptionHeader from "../Components/ViewConference/DescriptionHeader";
import EventFormDef from "../Components/ViewConference/EventFormDef";

type MenuItem = Required<MenuProps>['items'][number];


const ViewConference = () => {
    // Context
    const { appClient, notificationApi } = useContext(Context);
    // End of Context

    // State
    const [activeKey, setActiveKey] = useState<string>("");
    const [events, setEvents] = useState<EventWithTracks[]>([]);
    const [menuEvents, setMenuEvents] = useState<MenuItem[]>([]);
    const [tabEvents, setTabEvents] = useState<TabsProps["items"]>([]);

    const [eventDescriptions, setEventDescriptions] = useState<DescriptionsProps['items']>();
    const [hasSelectedEvent, setHasSelectedEvent] = useState<boolean>(false);
    const [conferenceInformation, setConferenceInformation] = useState<DescriptionsProps['items']>();

    const [hasEventTrack, setHasEventTrack] = useState<boolean>(false);

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [steps, setSteps] = useState<StepProps[]>([]);

    const [conferenceForm] = Form.useForm()
    const [isEditingConference, setIsEditingConference] = useState<boolean>(false);

    const [eventForm] = Form.useForm()
    const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
    // End of State 

    // Page params
    const [searchParams] = useSearchParams()

    const getConference = async () => {
        const id = searchParams.get("id");

        return await appClient.default.getApiV1Conferences1(parseInt(id ?? ""));
    }

    const updateConfereceFn = ({ conferenceId, body }: { conferenceId: number, body: Conference }) => {

        return appClient.default.putApiV1Conferences(conferenceId, body);
    }

    const { data: queryResult } = useQuery({ queryKey: ["conference"], queryFn: getConference })

    const { mutate: updateConference } = useMutation({
        mutationFn: updateConfereceFn
    })

    useEffect(() => {
        console.log(queryResult)
        setEvents(queryResult?.data?.events ?? []);
        conferenceForm.setFieldsValue(queryResult?.data);
        setConferenceInformation(generateConferenceInformation(queryResult))
    }, [queryResult])
    // End of Page Params

    // Event initialization
    useEffect(() => {
        // debugger;

        let eventItems = events.map((event) => ({ key: event.id, label: event.eventAcronym }))
        eventItems = eventItems.sort((x, y) => x.key != undefined && y.key != undefined ? x.key - y.key : 0);


        const items: MenuItem[] = [
            {
                key: 'event_group',
                label: 'Events',
                type: 'group',
                children: eventItems?.map((event, index) => ({ ...event, key: index }))
            }
        ];
        setMenuEvents(items)
    }, [events])
    // End of Event initialization

    // Tabs controls
    // const onTabChange = (newActiveKey: string) => {
    //     setActiveKey(newActiveKey);
    // }

    const generateEventSteps = (event: EventWithTracks) => {

        const eventDates: { [id: string]: Date | null } = {
            paper_submission: event.paperSubmission ? new Date(event.paperSubmission) : null,
            abstract_submission: event.abstractSubmission ? new Date(event.abstractSubmission) : null,
            notification_due: event.notificationDue ? new Date(event.notificationDue) : null,
            final_due: event.finalDue ? new Date(event.finalDue) : null,
            camera_ready: event.cameraReady ? new Date(event.cameraReady) : null,
            start: event.start ? new Date(event.start) : null,
            end: event.end ? new Date(event.end) : null,
        }

        const result: Array<{ title: string, description: string, date: Date }> = [];

        Object.keys(eventDates).forEach(dateEvent => {
            // debugger;
            const date = eventDates[dateEvent]
            if (date == null)
                return;

            const obj = {
                title: "",
                description: `${date.toLocaleString('en-gb')}`,
                date: date
            }

            switch (dateEvent) {
                case "paper_submission": {
                    obj.title = "Paper Submission";
                    break;
                }
                case "abstract_submission": {
                    obj.title = "Abstract Submission";
                    break;
                }
                case "notification_due": {
                    obj.title = "Notification Due Date";
                    break;
                }
                case "final_due": {
                    obj.title = "Final Due Date";
                    break;
                }
                case "camera_ready": {
                    obj.title = "Camera Ready Date";
                    break;
                }
                case "start": {
                    obj.title = "Start Date";
                    break;
                }
                case "end": {
                    obj.title = "End Date";
                    break;
                }
            }

            result.push(obj)
        })

        result.sort((a, b) => a.date.getTime() - b.date.getTime())

        return result
    }

    const onMenuSelect: MenuProps['onClick'] = (e) => {
        // Get event group
        const eventGroup = menuEvents.length > 0 ? menuEvents[0] as MenuItemGroupType : undefined;
        if (eventGroup == undefined)
            return;

        // Get event menu item
        const key = parseInt(e.key)
        const menuEvent = eventGroup.children ? eventGroup.children[key] : null;
        if (menuEvent == null)
            return;

        // Get actual event
        const event = events.find(event => event.eventAcronym == (menuEvent as MenuItemType).label)
        if (event == undefined)
            return;

        // Show the event
        const newEventDescriptions = generateEventDescriptions(event);
        setEventDescriptions(newEventDescriptions)
        eventForm.setFieldsValue(event)
        setHasSelectedEvent(true)

        // Generate the timeline control
        const result = generateEventSteps(event);

        // Set current step
        const currentDate = new Date();
        let i = 0;
        for (i = 0; i < result.length; i++) {
            const item = result[i];
            if (item.date < currentDate)
                continue;

            break;
        }
        setCurrentStep(i - 1);

        setSteps(result.map(item => ({ title: item.title, description: item.description })))

        setHasEventTrack(false)

        // Set the tabs for the event tracks if they exist
        if (event.tracks && event.tracks.length > 0) {
            const newTabEvents: TabsProps["items"] = [];

            event.tracks?.forEach((track, index) => {
                const label = track?.name;
                //<EventHistory event={event} />
                newTabEvents.push({ label: label, children: <span>{label}</span>, key: (index + 1).toString() });
            })

            setActiveKey("1");
            setTabEvents(newTabEvents);
            setHasEventTrack(true)
        } else {
            setHasEventTrack(false)
        }
    };
    // End of tab controls

    const generateConferenceInformation = (queryResult: ConferenceResponse | undefined) => {
        return [
            {
                key: "1",
                label: "Acronym",
                children: queryResult?.data?.acronym
            },
            {
                key: "2",
                label: "Conference Title",
                children: queryResult?.data?.title
            },
            // {
            //     key: "3",
            //     label: "Conference Website",
            //     children: (
            //         <Button style={{ padding: "0" }} type="link" href={queryResult?.data?.website} >
            //             {queryResult?.data?.website}
            //         </Button>
            //     )
            // },
            {
                key: "4",
                label: "Conference Website (Wikicfp)",
                children: (
                    <Button style={{ padding: "0" }} type="link" href={queryResult?.data?.wikicfpUrl} >
                        {encodeURI(queryResult?.data?.wikicfpUrl ?? "")}
                    </Button>
                )
            },
            {
                key: "5",
                label: "Core Rank",
                children: queryResult?.data?.coreRank
            },
            {
                key: "6",
                label: "Rank Source",
                children: queryResult?.data?.rankSource
            }
        ] as DescriptionsProps['items']
    }

    const generateEventDescriptions = (event: Event) => {
        const newEventDescriptions: DescriptionsProps['items'] = [
            {
                key: "1",
                label: "Event Title",
                children: event?.title
            },
            {
                key: "2",
                label: "Acronym",
                children: event?.eventAcronym
            },
            {
                key: "3",
                label: "Location",
                children: event?.location
            },
            {
                key: "4",
                label: "Event Website",
                children: (
                    <Button style={{ padding: "0" }} type="link" href={event?.eventUrl} >
                        {event?.eventUrl}
                    </Button>
                )
            },
            {
                key: "5",
                label: "Event Website (Wikicfp)",
                children: (
                    <Button style={{ padding: "0" }} type="link" href={event?.wikicfpUrl} >
                        {event?.wikicfpUrl}
                    </Button>
                )
            },
            {
                key: "6",
                label: "Submission Website",
                children: (
                    <Button style={{ padding: "0" }} type="link" href={event?.submissionUrl} >
                        {event?.submissionUrl}
                    </Button>
                )
            },
            {
                key: "7",
                label: "Description",
                children: event?.description
            },
            {
                key: "8",
                label: "Deadline Notes",
                children: event?.deadlineNotes
            },
        ];

        return newEventDescriptions;
    }

    const submitConference = (e: Conference) => {
        const conference = { ...queryResult?.data } as Conference;
        conference.acronym = e.acronym;
        conference.title = e.title;
        conference.coreRank = e.coreRank;
        conference.wikicfpUrl = e.wikicfpUrl;
        conference.rankSource = e.rankSource;

        const conferenceId = parseInt(searchParams.get("id") ?? "");

        updateConference(
            { conferenceId: conferenceId, body: conference },
            {
                onSuccess: async (data) => {
                    const newConference = data.data[0]
                    // debugger;
                    conferenceForm.setFieldsValue(newConference);
                    setConferenceInformation(generateConferenceInformation({ data: newConference }))
                    setIsEditingConference(false);
                    if (data.error) {
                        triggerError(data.error);
                        return
                    }
                    triggerSuccess({ name: "Update Conference", message: "Successful update of " + newConference.acronym + " conference" })
                },
                onError: (error) => {
                    setIsEditingConference(false);
                    triggerError(error);
                }
            }
        )
        // debugger;
    }

    const submitEvent = () => { };

    const triggerSuccess = (success: { name: string, message: string }) => {
        notificationApi.success({
            message: <Context.Consumer>{() => success?.name}</Context.Consumer>,
            description: <Context.Consumer>{() => success?.message}</Context.Consumer>,
            placement: "topRight",
            duration: 4
        })
    }

    const triggerError = (error: { name: string, message: string }) => {
        notificationApi.error({
            message: <Context.Consumer>{() => error?.name}</Context.Consumer>,
            description: <Context.Consumer>{() => error?.message}</Context.Consumer>,
            placement: "topRight",
            duration: 4
        })
    }


    return (
        <NavBar
            sider={
                <Menu
                    onClick={onMenuSelect}
                    mode="inline"
                    items={menuEvents}
                    style={{ height: "100%", overflowY: "auto" }}
                />
            }
            siderTheme="light"
        >
            <Layout hasSider style={{ minHeight: '100%', background: "inherit" }}>

                <Content style={{ padding: "0 0.5rem", overflow: 'initial' }}>

                    <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}>
                        <Form
                            form={conferenceForm}
                            onFinish={submitConference}
                        >
                            <Descriptions
                                size="small"
                                bordered
                                title={
                                    <DescriptionHeader
                                        headerTxt="Conference Information"
                                        isEditing={isEditingConference}
                                        setIsEditing={setIsEditingConference}
                                        save={() => conferenceForm.submit()}
                                    />
                                }
                                labelStyle={{ maxWidth: "10rem" }}
                                column={2}
                                items={isEditingConference ? ConferenceFormDef : conferenceInformation}
                                style={{ backgroundColor: "#ffffff", padding: "0.5rem" }}
                            />

                        </Form>
                    </div>

                    {
                        hasSelectedEvent ?
                            <>
                                <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}>
                                    <Form
                                        form={eventForm}
                                        onFinish={submitEvent}
                                    >
                                        <Descriptions
                                            bordered
                                            size="small"
                                            title={
                                                <DescriptionHeader
                                                    headerTxt="Event Information"
                                                    isEditing={isEditingEvent}
                                                    setIsEditing={setIsEditingEvent}
                                                    save={() => eventForm.submit()}
                                                />
                                            }
                                            column={2}
                                            labelStyle={{ maxWidth: "10rem" }}
                                            style={{ backgroundColor: "#ffffff", padding: "0.5rem" }}
                                            items={isEditingEvent ? EventFormDef : eventDescriptions}
                                        />
                                    </Form>
                                </div>

                                <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}>
                                    <Descriptions title="Event Steps" />
                                    <Steps
                                        progressDot
                                        current={currentStep}
                                        items={steps}
                                        size="small"
                                    />
                                </div>

                                {hasEventTrack ?
                                    <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}>
                                        <Tabs
                                            type="editable-card"
                                            activeKey={activeKey}
                                            defaultActiveKey="1"
                                            items={tabEvents}
                                            // onChange={onTabChange}
                                            // onEdit={onTabEdit}
                                            hideAdd
                                        />
                                    </div>
                                    :
                                    <></>
                                }
                            </>
                            :
                            <></>
                    }

                </Content>
            </Layout >


        </NavBar >
    )
}

export default ViewConference;