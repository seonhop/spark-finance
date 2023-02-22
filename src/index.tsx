import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={lightTheme}>
			<Root />
		</ThemeProvider>
	</React.StrictMode>
);
