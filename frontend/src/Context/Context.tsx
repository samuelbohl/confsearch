/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { createContext } from "react";
import { ConfSearchClient } from "../Services";
import SERVER_URL from "../appsettings";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

type AppContext = {
	appClient: ConfSearchClient;
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	notificationApi: NotificationInstance;
};

export const Context = createContext({} as AppContext);

export const ContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

	const appClient = new ConfSearchClient({
		BASE: SERVER_URL,
		// TOKEN: "5000"
	})

	const [searchValue, setSearchValue] = useState<string>("");

	const [notificationApi, contextHolder] = notification.useNotification();

	return (
		<Context.Provider
			value={{
				appClient,
				searchValue,
				setSearchValue,
				notificationApi
			}}
		>
			{contextHolder}
			{props.children}
		</Context.Provider>
	);
};
