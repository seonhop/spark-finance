import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexBox } from "../components/BuildingBlocks";

const ChartBlock = styled(FlexBox)`
	justify-items: flex-end;
	align-items: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	padding-top: 60px;
`;

interface IChart {
	isLineChart: boolean;
	symbol: string;
	cryptoId: string;
	day: string;
	theme: string;
}

export default function Chart(props: IChart) {
	const { isLoading, data: historicalData } = useQuery<number[][]>(
		["ohlcv", props.day],
		() => fetchCoinHistory(props.cryptoId, props.day) //1, 7, 30, 365, max
	);
	const close_prices = historicalData?.map((data) => ({
		x: data[0],
		y: data[data.length - 1],
	}));
	const lineOptions: ApexOptions = {
		chart: {
			type: "line",
			toolbar: {
				show: false,
			},
			background: "transparent",
			width: "400px",
		},
		theme: {
			mode: props.theme == "dark" ? "dark" : "light",
		},
		yaxis: {
			labels: {
				formatter: function (val: number) {
					return val
						.toLocaleString("en-US", {
							minimumFractionDigits: 6,
						})
						.replace(/\.?0+$/, "");
				},
			},
		},
		xaxis: {
			type: "datetime",
			axisTicks: { show: false },
		},
		grid: {
			show: false,
		},
		stroke: {
			curve: "smooth",
			width: 3,
		},
	};
	const candleOptions: ApexOptions = {
		chart: {
			zoom: {
				enabled: true,
			},
			toolbar: {
				show: false,
			},
			background: "transparent",
		},
		theme: {
			mode: props.theme == "dark" ? "dark" : "light",
		},
		grid: { show: false },
		yaxis: {
			labels: {
				formatter: function (val: number) {
					return val
						.toLocaleString("en-US", {
							minimumFractionDigits: 6,
						})
						.replace(/\.?0+$/, "");
				},
			},
		},
		xaxis: {
			axisBorder: { show: false },
			axisTicks: { show: false },
			type: "datetime",
		},
	};

	return (
		<ChartBlock>
			{isLoading ? (
				"Chart is loading..."
			) : (
				<ReactApexChart
					options={props.isLineChart ? lineOptions : candleOptions}
					series={[
						{
							name: props.isLineChart ? "Closing Price" : "ohlcv",
							data: props.isLineChart
								? close_prices
									? close_prices
									: []
								: historicalData
								? historicalData
								: [],
							//data: close_prices ? close_prices : [],
						},
					]}
					width="1000"
					height="300"
					type={props.isLineChart ? "line" : "candlestick"}
				/>
			)}
		</ChartBlock>
	);
}
