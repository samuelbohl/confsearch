import './App.css'
import './App_Mobile.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextProvider } from "./Context/Context";
import MainPage from './Pages/Main';
import { ConfigProvider } from 'antd';

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
				<ConfigProvider
					theme={{
						token: {
							// Seed Token
							colorPrimary: '#1895c2',
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
