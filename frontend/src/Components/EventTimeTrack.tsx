import { StepProps, Steps } from "antd";
import { useEffect, useState } from "react";
import { Event } from "../Services";

const EventTimeTrack = ({ event }: { event: Event }) => {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [steps, setSteps] = useState<StepProps[]>([]);

    useEffect(() => {
        const result = generateEventSteps(event);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const generateEventSteps = (event: Event) => {
        const eventDates: { [id: string]: Date } = {
            paper_submission: new Date(event.paperSubmission ?? ""),
            abstract_submission: new Date(event.abstractSubmission ?? ""),
            notification_due: new Date(event.notificationDue ?? ""),
            final_due: new Date(event.finalDue ?? ""),
            camera_ready: new Date(event.cameraReady ?? ""),
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

    return (
        <Steps
            progressDot
            current={currentStep}
            items={steps}
        />
    )
}

export default EventTimeTrack;