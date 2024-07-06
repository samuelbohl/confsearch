/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { createContext } from "react";
import IConference from "../Interfaces/IConference";

type AppContext = {
	conferenceToEdit: IConference | null;
	setConferenceToEdit: React.Dispatch<React.SetStateAction<IConference | null>>
};

export const Context = createContext({} as AppContext);

export const ContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

	const [conferenceToEdit, setConferenceToEdit] = useState<IConference | null>(null);

	return (
		<Context.Provider
			value={{
				conferenceToEdit,
				setConferenceToEdit
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
