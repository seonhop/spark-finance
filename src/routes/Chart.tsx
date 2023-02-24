import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import IDetailOutlet from "../interfaces/DetailOutlet";
import { IHistoricalData } from "../interfaces/HistoricalData";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FlexBox } from "../components/BuildingBlocks";
import { formattedDate } from "../components/FormattedDate";

const ChartBlock = styled(FlexBox)`
	justify-items: flex-end;
	align-items: center;
	flex-direction: column;
	height: 100%;
	box-sizing: border-box;
	padding-top: 60px;
`;

export default function Chart() {
	const { id: cryptoId, symbol } = useOutletContext<IDetailOutlet>();
	console.log("cryptoId: ", cryptoId, "symbol: ", symbol);
	const { isLoading, data: historicalData } = useQuery<IHistoricalData>(
		["ohlcv", symbol],
		() => fetchCoinHistory(symbol)
	);
	if (historicalData) {
		const data1 = new Date(historicalData.Data.Data[0].time * 1000);
		const data2 = historicalData.Data.Data.map((datapoint) => [
			datapoint.time,
			datapoint.open,
			datapoint.high,
			datapoint.low,
			datapoint.close,
		]);
		console.log(data2);
	}
	const options: ApexOptions = {
		chart: {
			type: "candlestick",
			zoom: {
				enabled: true,
			},
			toolbar: {
				show: false,
			},
			background: "transparent",
		},
		theme: {
			mode: "dark",
		},
		grid: { show: false },
		yaxis: {
			show: false,
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
					options={options}
					series={[
						{
							name: "ohlcv",
							data: historicalData
								? historicalData.Data.Data.map((datapoint) => [
										datapoint.time * 1000,
										datapoint.open,
										datapoint.high,
										datapoint.low,
										datapoint.close,
								  ])
								: [],
						},
					]}
					type="candlestick"
					height={250}
					width={600}
				/>
			)}
		</ChartBlock>
	);
}

{
	/* <ApexChart
type="line"
series={[
	{
		name: "price",
		data: historicalData
			? historicalData.Data.Data.map((datapoint) => [
					datapoint.time,
					datapoint.open,
					datapoint.high,
					datapoint.low,
					datapoint.close,
			  ])
			: [],
	},
]}
/> */
}

/* data: historicalData
? historicalData.Data.Data.map((datapoint) => [
		datapoint.time * 1000,
		datapoint.open,
		datapoint.high,
		datapoint.low,
		datapoint.close,
  ])
: [], */
