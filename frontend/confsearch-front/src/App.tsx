import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextProvider } from "./Context/Context";
import MainPage from './Pages/Main';

const queryClient = new QueryClient();

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainPage />,
			errorElement: <></>,
		}
	]);

	return (
		<ContextProvider>
			<QueryClientProvider client={queryClient}>

				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />

			</QueryClientProvider>
		</ContextProvider>
	);
}

export default App;
