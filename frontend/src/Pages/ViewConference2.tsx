import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import NavBar from "../Components/NavBar";
import { Button, Descriptions, DescriptionsProps, Layout, Menu, MenuProps, Tabs, TabsProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { MenuItemGroupType, MenuItemType } from "antd/es/menu/interface";
import { EventWithTracks } from "../Services";
import EventHistory from "../Components/ViewConference/EventHistory";

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
        setEvents(queryResult?.data?.events ?? []);
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

    // Tabs controls
    const onTabChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    }

    const onMenuSelect: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);

        // debugger
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
        const event = events.find(event => event.title == (menuEvent as MenuItemType).label)
        if (event == undefined)
            return;

        // debugger;
        const label = event?.title

        // Check if event already exists as a tab
        const existingTab = (tabEvents ?? []).find(tabEvent => tabEvent.label == label)
        const exists = existingTab != undefined;
        if (!exists) {
            const newActiveKey = `${(tabEvents ?? []).length + 1}`;
            const newTabs = [...(tabEvents ?? [])];
            newTabs.push({ label: label, children: <EventHistory event={event} />, key: newActiveKey });

            setTabEvents(newTabs);
            setActiveKey(newActiveKey);
        } else {
            setActiveKey(existingTab.key);
        }
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        if (!tabEvents || tabEvents.length == 0)
            return

        tabEvents.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = tabEvents.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setTabEvents(newPanes);
        setActiveKey(newActiveKey);
    };

    const onTabEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'remove') {
            remove(targetKey);
        }
    }
    // End of tab controls

    const conferenceInformation: DescriptionsProps['items'] = [
        {
            key: "2",
            label: "Conference Title",
            children: queryResult?.data?.title
        },
        {
            key: "3",
            label: "Conference Website",
            children: (
                <Button style={{ padding: "0" }} type="link" href={queryResult?.data?.website} >
                    {queryResult?.data?.website}
                </Button>
            )
        },
        {
            key: "4",
            label: "Conference Website (Wikicfp)",
            children: (
                <Button style={{ padding: "0" }} type="link" href={queryResult?.data?.wikicfpUrl} >
                    {queryResult?.data?.wikicfpUrl}
                </Button>
            )
        },
        {
            key: "5",
            label: "Core Rank",
            children: queryResult?.data?.coreRank
        }
    ]


    return (
        <NavBar>
            {/* <Spin spinning={loading}> */}
            <Layout style={{ minHeight: '100%', background: "inherit" }}>
                <Sider theme="light">
                    <Menu
                        onClick={onMenuSelect}
                        mode="inline"
                        items={menuEvents}
                    />
                </Sider>
                <Content style={{ padding: "0 0.5rem" }}>
                    {loading ? <></> :
                        <div style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}>
                            <Descriptions
                                bordered
                                title="Conference Information"
                                items={conferenceInformation}
                            />
                        </div>
                    }

                    <Tabs
                        type="editable-card"
                        activeKey={activeKey}
                        defaultActiveKey="1"
                        items={tabEvents}
                        onChange={onTabChange}
                        onEdit={onTabEdit}
                        hideAdd
                    // style={{ height: "100%" }}
                    />
                </Content>
            </Layout>
            {/* </Spin> */}


        </NavBar>
    )
}

export default ViewConference;