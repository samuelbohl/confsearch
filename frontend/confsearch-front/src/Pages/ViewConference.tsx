import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import NavBar from "../Components/NavBar";
import { Form, Input, Layout, Menu, MenuProps, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@tanstack/react-query";

type MenuItem = Required<MenuProps>['items'][number];

const ViewConference = () => {
    const { appClient, conferenceToView, setConferenceToView } = useContext(Context);
    const [events, setEvents] = useState<MenuItem[]>([]);

    const getConference = async () => {
        if (conferenceToView?.id)
            return await appClient.default.getApiV1Conferences1(conferenceToView?.id);
        else
            return null
    }

    const { refetch: refetch, data: queryResult, isLoading: loading } = useQuery({ queryKey: ["conference"], queryFn: getConference })

    // This handles the unload of the page, resetting the conference that is being edited
    // Used to ensure data integrity
    useEffect(() => {
        const handleUnload = () => {
            setConferenceToView(null);
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // const eventItems = conferenceToView?.events?.map((event) => ({ key: event.id, label: event.title }))

        // const items: MenuItem[] = [
        //     {
        //         key: 'event_group',
        //         label: 'Events',
        //         type: 'group',
        //         children: eventItems
        //     }
        // ];
        // setEvents(items)

        refetch();

        // console.log(queryResult);

    }, [conferenceToView])



    return (
        <NavBar>
            <Spin spinning={loading}>
                <Layout style={{ minHeight: '100%' }}>
                    <Sider theme="light">
                        <Menu
                            // onClick={onClick}
                            // style={{ width: 256 }}
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={events}
                        />
                    </Sider>
                    <Content style={{ padding: "1rem " }}>
                        <Form
                            style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "1rem" }}
                            // disabled={true}
                            layout="inline"
                            initialValues={conferenceToView ?? {}}
                        >
                            <Form.Item name="id" label="ID" hidden>
                                <Input style={{ width: "4rem" }} />
                            </Form.Item>

                            <Form.Item name="acronym" label="Acronym">
                                <Input style={{ width: "8rem" }} />
                            </Form.Item>

                            <Form.Item name="title" label="Conference Title">
                                <Input style={{ width: "22rem" }} />
                            </Form.Item>

                            <Form.Item name="website" label="Conference Website">
                                <Input style={{ width: "15rem" }} type="url" />
                            </Form.Item>

                            <Form.Item name="wikicfp_url" label="Wikicfp URL">
                                <Input style={{ width: "27rem" }} type="url" />
                            </Form.Item>

                            <Form.Item name="core_rank" label="Rank">
                                <Input style={{ width: "3rem" }} />
                            </Form.Item>
                        </Form>

                        tabs representing events to be shown here
                    </Content>
                </Layout>
            </Spin>


        </NavBar>
    )
}

export default ViewConference;