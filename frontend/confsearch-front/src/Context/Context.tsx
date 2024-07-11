/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { createContext } from "react";
import { Conference, ConferenceWithEvents, ConfSearchClient } from "../Services";

type AppContext = {
	conferenceToEdit: ConferenceWithEvents | null;
	setConferenceToEdit: React.Dispatch<React.SetStateAction<ConferenceWithEvents | null>>;
	conferenceToView: Conference | null;
	setConferenceToView: React.Dispatch<React.SetStateAction<Conference | null>>;
	appClient: ConfSearchClient;
};

export const Context = createContext({} as AppContext);

export const ContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

	const appClient = new ConfSearchClient({
		BASE: "http://localhost:5000",
		// TOKEN: "5000"
	})

	const [conferenceToEdit, setConferenceToEdit] = useState<Conference | null>(null);
	const [conferenceToView, setConferenceToView] = useState<Conference | null>(null);

	return (
		<Context.Provider
			value={{
				conferenceToEdit,
				setConferenceToEdit,
				conferenceToView,
				setConferenceToView,
				appClient
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
