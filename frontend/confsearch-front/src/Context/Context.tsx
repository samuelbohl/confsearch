/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react"
import { createContext } from "react";

export const Context = createContext({});

export const ContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

  return (
    <Context.Provider
      value={{}}
    >
      {props.children}
    </Context.Provider>
  );
};
