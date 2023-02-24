import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Price from "./routes/Price";
import Chart from "./routes/Chart";
import React from "react";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Root />,
			children: [
				{
					path: "",
					element: <Home />,
				},
				{
					path: "/:cryptoId",
					element: <Detail />,
					children: [
						{
							path: "price",
							element: <Price />,
						},
						{
							path: "chart",
							element: <Chart />,
						},
					],
				},
			],
		},
	],
	{ basename: "/spark-finance" }
);

export default router;
