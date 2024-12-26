import { EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { MouseEventHandler, useState } from "react";



const DescriptionHeader = (
    { headerTxt, isEditing, setIsEditing, save }:
        { headerTxt: string, isEditing: boolean, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>, save: MouseEventHandler<HTMLElement> }
) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const cancel = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {headerTxt}

            {
                isEditing ?
                    <span style={{ display: "flex", gap: "5px" }}>
                        <Button type="primary" size="middle" shape="circle" icon={<SaveOutlined />} onClick={save} />
                        <Button type="default" size="middle" shape="circle" icon={<UndoOutlined />} onClick={cancel} />
                    </span>
                    :
                    <Button type="default" size="middle" shape="circle" onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
            }

            <Modal title="Are you sure?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>You may have unsaved changes. Are you sure you want to continue?</p>
            </Modal>
        </div>
    )
}

export default DescriptionHeader;