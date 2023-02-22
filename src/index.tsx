import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { lightTheme } from "./components/theme";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={lightTheme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
