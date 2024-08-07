/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { createContext } from "react";
import { ConfSearchClient } from "../Services";
import SERVER_URL from "../appsettings";

type AppContext = {
	appClient: ConfSearchClient;
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>
};

export const Context = createContext({} as AppContext);

export const ContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

	const appClient = new ConfSearchClient({
		BASE: SERVER_URL,
		// TOKEN: "5000"
	})

	const [searchValue, setSearchValue] = useState<string>("");

	return (
		<Context.Provider
			value={{
				appClient,
				searchValue,
				setSearchValue
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
