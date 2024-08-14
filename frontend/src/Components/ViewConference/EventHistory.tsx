import { Button, Calendar, Col, Descriptions, DescriptionsProps, Row, Space, StepProps, Steps } from "antd";
import { EventWithTracks } from "../../Services";
import { CSSProperties, useEffect, useState } from "react";

const EventHistory = ({ event }: { event: EventWithTracks }) => {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [steps, setSteps] = useState<StepProps[]>([]);

    useEffect(() => {
        const result = generateEventSteps();

        // Set current step
        const currentDate = new Date();
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            if (item.date < currentDate)
                continue;

            setCurrentStep(i);
            break;
        }

        setSteps(result.map(item => ({ title: item.title, description: item.description })))
    }, [])

    const descriptions: DescriptionsProps['items'] = [
        {
            key: "1",
            label: "Acronym",
            children: event?.acronym
        },
        {
            key: "2",
            label: "Event Title",
            children: event?.title
        },
        {
            key: "3",
            label: "Event Website",
            children: (
                <Button style={{ padding: "0" }} type="link" href={event?.event_url} >
                    {event?.event_url}
                </Button>
            )
        },
        {
            key: "4",
            label: "Event Website (Wikicfp)",
            children: (
                <Button style={{ padding: "0" }} type="link" href={event?.wikicfp_url} >
                    {event?.wikicfp_url}
                </Button>
            )
        },
        {
            key: "5",
            label: "Submission Website",
            children: (
                <Button style={{ padding: "0" }} type="link" href={event?.submission_url} >
                    {event?.submission_url}
                </Button>
            )
        },
        {
            key: "6",
            label: "Location",
            children: event?.location
        },
        {
            key: "7",
            label: "Description",
            children: event?.description
        },
        {
            key: "8",
            label: "Deadline Notes",
            children: event?.deadline_notes
        },
    ];

    const generateEventSteps = () => {
        const eventDates: { [id: string]: Date } = {
            paper_submission: new Date(event.paper_submission ?? ""),
            abstract_submission: new Date(event.abstract_submission ?? ""),
            notification_due: new Date(event.notification_due ?? ""),
            final_due: new Date(event.final_due ?? ""),
            camera_ready: new Date(event.camera_ready ?? ""),
            start: new Date(event.start ?? ""),
            end: new Date(event.end ?? ""),
        }

        const result: Array<{ title: string, description: string, date: Date }> = [];

        Object.keys(eventDates).forEach(dateEvent => {
            const date = eventDates[dateEvent]
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

    const cellStyle: CSSProperties = { backgroundColor: "#ffffff", padding: "0.5rem" }
    return (

        <Row gutter={[16, 0]}>
            <Col span={12}>
                <Space direction="vertical" size="middle">
                    <Row>
                        <Col>
                            <div style={cellStyle}>
                                <Descriptions
                                    bordered
                                    title="Event Information"
                                    items={descriptions}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={cellStyle}>

                                <Descriptions title="Event Steps" />
                                <Steps
                                    progressDot
                                    current={currentStep}
                                    items={steps}
                                />
                            </div>
                        </Col>

                    </Row>
                </Space>
            </Col>
            <Col span={12}>
                <div style={cellStyle}>
                    <Descriptions title="Event Track" />
                    <Calendar />
                </div>
            </Col>
        </Row>
    );
}

export default EventHistory;