import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import NavBar from "../Components/NavBar";
import { Button, Descriptions, DescriptionsProps, Layout, Menu, MenuProps, Tabs, TabsProps, Form, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { MenuItemGroupType, MenuItemType } from "antd/es/menu/interface";
import { EventWithTracks } from "../Services";
import EventHistory from "../Components/ViewConference/EventHistory";
import { EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { Rule } from "antd/es/form";
import TimeTable from "../Components/TimeTable";

type MenuItem = Required<MenuProps>['items'][number];
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ViewConference = () => {
    // Context
    const { appClient } = useContext(Context);
    // End of Context

    // State
    const [activeKey, setActiveKey] = useState<string>("");
    const [events, setEvents] = useState<EventWithTracks[]>([]);
    const [menuEvents, setMenuEvents] = useState<MenuItem[]>([]);
    const [tabEvents, setTabEvents] = useState<TabsProps["items"]>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [form] = Form.useForm()
    // End of State

    // Page params
    const [searchParams] = useSearchParams()

    const getConference = async () => {
        const id = searchParams.get("id");

        return await appClient.default.getApiV1Conferences1(parseInt(id ?? ""));
    }

    const { data: queryResult, isFetching: loading } = useQuery({ queryKey: ["conference"], queryFn: getConference })

    useEffect(() => {
        console.log(queryResult)
        setEvents(queryResult?.events ?? []);
        form.setFieldsValue(queryResult)
    }, [queryResult])
    // End of Page Params

    // Event initialization
    useEffect(() => {
        const eventItems = events.map((event) => ({ key: event.id, label: event.title }))

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

    const saveConference = async () => {
        const test = await form.validateFields();

        console.log(test)
        setIsEditing(false)
    }

    const revertConference = () => {
        form.setFieldsValue(queryResult)
        setIsEditing(false)
    }

    /**
     * 
     */

    const conferenceInformation: DescriptionsProps['items'] = [
        {
            key: "1",
            label: "Conference Title",
            children: queryResult?.title
        },
        {
            key: "2",
            label: "Acronym",
            children: queryResult?.acronym
        },
        {
            key: "3",
            label: "Conference Website",
            children: (
                <Button style={{ padding: "0" }} type="link" href={queryResult?.website} >
                    {queryResult?.website}
                </Button>
            )
        },
        {
            key: "4",
            label: "Conference Website (Wikicfp)",
            children: (
                <Button style={{ padding: "0" }} type="link" href={queryResult?.wikicfp_url} >
                    {queryResult?.wikicfp_url}
                </Button>
            )
        },
        {
            key: "5",
            label: "Core Rank",
            children: queryResult?.core_rank
        }
    ]

    const requiredRule: Rule = { required: true, message: "Cannot be empty" };
    const urlRule: Rule = { type: "url", message: "Must be a link" };

    const conferenceForm: DescriptionsProps['items'] = [
        {
            key: "1",
            label: "Conference Title",
            children: (
                <Form.Item name="title" style={{ marginBottom: 0 }} rules={[requiredRule]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            label: "Acronym",
            children: (
                <Form.Item name="acronym" style={{ marginBottom: 0 }} rules={[requiredRule]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            label: "Conference Website",
            children: (
                <Form.Item name="website" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "4",
            label: "Conference Website (Wikicfp)",
            children: (
                <Form.Item name="wikicfp_url" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "5",
            label: "Core Rank",
            children: (
                <Form.Item name="core_rank" style={{ marginBottom: 0, width: "4rem" }} rules={[requiredRule]}>
                    <Input />
                </Form.Item>
            ),
        }
    ]


    return (
        <NavBar>
            <div className="ViewConference_Body">



                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                    <Form
                        form={form}
                    >
                        <Descriptions
                            size="small"
                            bordered
                            title="Conference Information"
                            items={isEditing ? conferenceForm : conferenceInformation}
                            style={{ backgroundColor: "#ffffff", padding: "0.5rem" }}
                        />

                        {/* Content goes here */}
                        {/* <div style={{ height: "150%" }}>soiudbgosdbgobsbdog</div> */}
                    </Form>
                    <TimeTable events={events} />
                </div>




                <div style={{ display: "flex", flexDirection: "column", gap: "1vh", width: "100%" }}>
                    {
                        isEditing ?
                            <>
                                <Button type="primary" size="large" shape="circle" icon={<SaveOutlined />} onClick={saveConference} />
                                <Button type="default" size="large" shape="circle" icon={<UndoOutlined />} onClick={revertConference} />
                            </>
                            :
                            <Button type="default" size="large" shape="circle" onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
                    }

                </div>
            </div>
        </NavBar>
    )
}

export default ViewConference;