import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import EditConferenceForm from "../Components/EditConferenceForm";
import IConference from "../Interfaces/IConference";
import NavBar from "../Components/NavBar";
import { Button } from "antd";
import { CloseOutlined, DeleteOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";


const EditConference = () => {
    const { conferenceToEdit, setConferenceToEdit } = useContext(Context);

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


    return (
        <NavBar>
            <EditConferenceForm record={conferenceToEdit ?? ({} as IConference)} />
            <div style={{ position: "sticky", float: "right", display: "flex", flexDirection: "column", gap: "1vh" }}>
                <Button type="primary" shape="circle" icon={<SaveOutlined />}/>
                <Button type="default" shape="circle" icon={<UndoOutlined />} />
                <Button type="default" shape="circle" danger icon={<CloseOutlined />} />
                <Button type="primary" shape="circle" danger icon={<DeleteOutlined />}/>
            </div>
        </NavBar>
    )
}

export default EditConference;