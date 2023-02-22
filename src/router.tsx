import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "/:assetId",
				element: <Detail />,
			},
		],
	},
]);

export default router;
