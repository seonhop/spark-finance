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
					],
				},
			],
		},
	],
	{ basename: process.env.PUBLIC_URL }
);

export default router;
