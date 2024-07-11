import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import EditConferenceForm from "../Components/EditConference/EditConferenceForm";
import NavBar from "../Components/NavBar";
import { Button, Form, Modal } from "antd";
import { CloseOutlined, DeleteOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Event, Conference } from "../Services";
import { useForm } from "antd/es/form/Form";
import TimeTable from "../Components/TimeTable";
import EditEventForm from "../Components/EditConference/EditEventForm";


const EditConference = () => {
    const { conferenceToEdit, setConferenceToEdit } = useContext(Context);
    const [conferenceForm] = useForm()
    const [eventsForm] = useForm()

    const [isEditingEvent, setIsEditingEvent] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>(conferenceToEdit?.events ?? [] as Event[]);

    // This handles the unload of the page, resetting the conference that is being edited
    // Used to ensure data integrity
    useEffect(() => {
        const handleUnload = () => {
            setConferenceToEdit(null);
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveForm = async () => {
        const conference = await conferenceForm.validateFields();
        console.log(conference, events)
        // i have both conference and events
    }


    return (
        <NavBar>
            <div style={{ position: "fixed", right: "1vw", display: "flex", flexDirection: "column", gap: "1vh", zIndex: 9999 }}>
                <Button type="primary" size="large" shape="circle" disabled={isEditingEvent} onClick={saveForm} icon={<SaveOutlined />} />
                <Button type="default" size="large" shape="circle" disabled={isEditingEvent} icon={<UndoOutlined />} />
                <Button type="default" size="large" shape="circle" disabled={isEditingEvent} danger icon={<CloseOutlined />} />
                <Button type="primary" size="large" shape="circle" disabled={isEditingEvent} danger icon={<DeleteOutlined />} />
            </div>

            <Form
                form={conferenceForm}
                name="EditConference"
                labelAlign="left"
                style={{ width: "100%" }}
                initialValues={conferenceToEdit ?? ({} as Conference)}
            >
                <EditConferenceForm />
            </Form>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <TimeTable
                    style={{ width: "95vw", padding: "2rem" }}
                    events={events}
                    setEventToEdit={setEventToEdit}
                    setIsEditingEvent={setIsEditingEvent}
                />
            </div>

            <Modal
                title="Edit Event"
                centered
                open={isEditingEvent}
                onOk={() => setIsEditingEvent(false)}
                onCancel={() => setIsEditingEvent(false)}
            >
                <EditEventForm form={eventsForm} event={eventToEdit} />
            </Modal>
        </NavBar>
    )
}

export default EditConference;