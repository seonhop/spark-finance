import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { lightTheme, darkTheme } from "./components/theme";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./Router";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<QueryClientProvider client={queryClient}>
		<React.StrictMode>
			<ThemeProvider theme={darkTheme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</React.StrictMode>
	</QueryClientProvider>
);
