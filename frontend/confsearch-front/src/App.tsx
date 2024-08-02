import './App.css'
import './App_Mobile.css'
import './App_XL.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextProvider } from "./Context/Context";
import { ConfigProvider } from 'antd';
import MainPage from './Pages/Main';
import SearchResults from './Pages/SearchResults';
import ErrorPage from './Pages/Error';
import EditConference from './Pages/EditConference';
import ViewConference from './Pages/ViewConference';

const queryClient = new QueryClient();

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainPage />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/search",
			element: <SearchResults />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/edit",
			element: <EditConference />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/details",
			element: <ViewConference />,
			errorElement: <ErrorPage />,
		}
	]);

	return (
		<ContextProvider>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							// Seed Token
							colorPrimary: '#1895c2',
							colorError: "#EF982C"
						},
					}}
				>
					<RouterProvider router={router} />
					<ReactQueryDevtools initialIsOpen={false} />
				</ConfigProvider>
			</QueryClientProvider>
		</ContextProvider>
	);
}

export default App;
