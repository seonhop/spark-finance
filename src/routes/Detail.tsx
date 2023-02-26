import {
	useParams,
	useLocation,
	Link,
	Outlet,
	useMatch,
	useOutletContext,
} from "react-router-dom";
import {
	Container,
	Block,
	Image,
	FlexBox,
	Grid,
} from "../components/BuildingBlocks";
import LoadingScreen from "../components/Loading";
import styled from "styled-components";
import { useState, useEffect, MouseEventHandler } from "react";
import IPriceInfoData from "../interfaces/PriceInfoData";
import IInfoData from "../interfaces/InfoData";
import { useQuery } from "react-query";
import { fetchCryptoInfo, fetchCryptoTickers } from "../api";
import { formattedDate } from "../components/FormattedDate";
import { IRootOutlet } from "../interfaces/RootOutlet";
import { IfetchCryptosFromCoinGecko } from "../interfaces/CryptoGecko";
import { formattedPrice } from "../components/FormattedPrice";
import Chart from "./Chart";

const BackButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: auto;
	flex-shrink: 0;
	border-radius: 100%;
	gap: 4px;
	margin-bottom: 20px;
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px;
		border-radius: 50px;

		background-color: ${(props) => props.theme.colorSecondary};
		:hover {
			background-color: ${(props) => props.theme.colorHover};
		}
	}
	span {
		vertical-align: middle;
		font-size: 20px;
		width: auto;
	}
	color: ${(props) => props.theme.textRPrimary};
`;

const DetailGrid = styled(Grid)`
	grid-gap: 4px;
	height: 100%;
`;

const DetailPageBlock = styled(Block)`
	padding: 20px 40px;
	padding-left: 40px;
`;

const DetailContainer = styled(Container)`
	gap: 4px;
	height: 100%;
`;

const CryptoImg = styled(Image)`
	height: 40%;
	width: auto;
`;

const CryptoName = styled.h1`
	font-size: 36px;
`;

const PriceChartBlock = styled(DetailPageBlock)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const DetailBlock = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`;

const TabBlock = styled(FlexBox)`
	padding: 0px 20px;
	background-color: ${(props) => props.theme.colorBlock};
`;

const RankBlock = styled.div`
	display: flex;
	margin-top: 40px;
	gap: 12px;

	align-items: center;
	span {
		display: block;
		background-color: ${(props) => props.theme.colorHover};
		color: ${(props) => props.theme.textRSecondary};
		border-radius: 4px;
		padding: 8px 12px;
	}
`;

const TitleContainer = styled(DetailPageBlock)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

const TitleBlock = styled(FlexBox)`
	flex-direction: row;
	align-items: center;
	gap: 40px;
	height: 12vh;
	div:first-child {
		flex-direction: row;
		align-items: center;
		gap: 12px;
	}
	div:last-child {
		align-items: center;
	}
	img {
		width: 30px;
		height: 30px;
	}
`;

const Tabs = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin: 8px 0px;
	background-color: ${(props) => props.theme.colorBg};
	padding: 8px;
	border-radius: 8px;
`;

const TimeRangeTabs = styled(Tabs)`
	font-size: 12px;
`;

const Tab = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	span {
		text-align: center;
	}
	font-size: 20px;

	font-weight: 400;
	background-color: ${(props) =>
		props.isActive ? props.theme.colorNavBar : props.theme.colorBg};
	//padding: 12px 12px;
	height: 36px;
	padding: 8px;
	border-radius: 10px;
	border-width: thick;
	border-color: ${(props) => props.theme.colorNavBar};
	color: ${(props) =>
		props.isActive ? props.theme.textRPrimary : props.theme.textRSecondary};
	:hover {
		cursor: pointer;
		background-color: ${(props) =>
			!props.isActive ? props.theme.colorHover : props.theme.colorNavBar};
	}
`;

const TimeRangeTab = styled(Tab)`
	font-size: 12px;
`;

const Description = styled.div`
	width: 100%;

	line-height: 1.5;
	a {
		text-decoration: underline;
	}
`;

interface InfoInterface {
	id: string;
	name: string;
}

interface RouterState {
	state: {
		info: IfetchCryptosFromCoinGecko;
	};
}

const DescriptionContainer = styled(Block)`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	div:first-child > div {
		height: 100%;
		overflow: hidden;

		background-color: "red";
	}
	padding: 40px;
`;

const BlockTitle = styled.h1`
	margin: 20px 0px 12px 0px;
	font-size: 18px;
	font-weight: 600;
`;

const PriceBlock = styled.div<{ isPos: boolean }>`
	display: flex;
	gap: 20px;
	align-items: center;
	justify-content: center;
	> span:first-child {
		color: ${(props) =>
			props.isPos ? props.theme.changePos : props.theme.changeNeg};
		font-size: 36px;
	}
	div {
		background-color: ${(props) =>
			props.isPos ? props.theme.changePos : props.theme.changeNeg};
	}
`;

const DescriptionBlock = styled(FlexBox)`
	margin-top: 20px;
	gap: 4px;
	span {
		color: ${(props) => props.theme.textSecondary};
	}
`;

const Line = styled.div`
	width: 100%;
	height: 4px;
	background-color: ${(props) => props.theme.colorBg};
	margin: 8px 0px 16px 0px;
`;

const DataBlock = styled(FlexBox)`
	height: 100%;
`;

const PriceChangeBlock = styled.div`
	display: flex;
	color: "white";
	padding: 4px 8px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
	color: white;
	align-self: center;
`;

const PriceDetailContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 4px;
	div:first-child {
		div:first-child {
			span:last-child {
				color: ${(props) => props.theme.changePos};
			}
		}
		div:last-child {
			span:last-child {
				color: ${(props) => props.theme.changeNeg};
			}
		}
	}
`;

const PriceDetailBlock = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.colorHover};
	padding: 20px;
	gap: 20px;
	div {
		display: flex;
		flex-direction: column;
		gap: 8px;
		span:first-child {
			font-size: 14px;
			color: ${(props) => props.theme.textRSecondary};
		}
		span:last-child {
			font-size: 18px;
		}
	}
`;

const TabsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default function Detail() {
	const { state } = useLocation() as RouterState;
	const cryptoId = state?.info.id;
	const priceMatch = useMatch("/:assetId/price");
	const chartMatch = useMatch("/:assetId/chart");
	const [isLineChart, setIsLineChart] = useState(true);
	const [chartType, setChartType] = useState("line");
	const [timeRange, setTimeRange] = useState("1");

	const onChartTypeClick = (name: string) => {
		if (name === "monitoring") {
			setIsLineChart(true);
		} else {
			setIsLineChart(false);
		}
	};
	const TIME_RANGE = [
		{ day: "1", label: "1D" },
		{ day: "7", label: "1W" },
		{ day: "30", label: "1M" },
		{ day: "365", label: "1Y" },
		{ day: "max", label: "ALL" },
	];

	const CHART_ICONS = [
		{ chart: "line", name: "monitoring" },
		{ chart: "candlestick", name: "candlestick_chart" },
	];

	const onTimeRangeClick = (day: string) => {
		setTimeRange(day);
	};

	const onChartClick = (chart: string) => {
		setChartType(chart);
	};

	const { curr_theme: theme } = useOutletContext<IRootOutlet>();
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		["info", cryptoId],
		() => fetchCryptoInfo(`${cryptoId}`)
	);
	const loading = infoLoading;

	const dateString = infoData?.genesis_date
		? infoData?.genesis_date.toString()
		: null;
	let date = "";

	if (dateString) {
		date = formattedDate(dateString);
	} else {
		date = "N/A";
	}

	return (
		<DetailContainer>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					<Link to="/">
						<BackButton>
							<div>
								<span className="material-icons md-18">home</span>
							</div>
						</BackButton>
					</Link>
					<TitleContainer>
						<RankBlock>
							<span>Rank #{state?.info.rank}</span>
							<span>{state?.info.symbol.toUpperCase()}</span>
						</RankBlock>
						<TitleBlock>
							<FlexBox>
								<CryptoImg src={state?.info.image} />
								<CryptoName>
									{state?.info.name
										? state?.info.name
										: loading
										? "Loading..."
										: infoData?.name}
								</CryptoName>
							</FlexBox>
							<PriceBlock isPos={state?.info.price_change_percentage_24h > 0}>
								<span>${formattedPrice(state?.info.current_price)}</span>
								<PriceChangeBlock>
									<span className="material-icons md-24 md-light">
										{state?.info.price_change_percentage_24h > 0
											? "arrow_drop_up"
											: "arrow_drop_down"}
									</span>
									<span>
										{Math.abs(state?.info.price_change_percentage_24h).toFixed(
											2
										)}
										%
									</span>
								</PriceChangeBlock>
							</PriceBlock>
						</TitleBlock>
						<PriceDetailContainer>
							<PriceDetailBlock>
								<div>
									<span> High</span>
									<span>${formattedPrice(state?.info.high_24h)}</span>
								</div>
								<div>
									<span> Low</span>
									<span>${formattedPrice(state?.info.low_24h)}</span>
								</div>
							</PriceDetailBlock>
							<PriceDetailBlock>
								<div>
									<span> Market Cap </span>
									<span>{state?.info.market_cap.toLocaleString("en-US")}</span>
								</div>
								<div>
									<span>Fully Diluted Market Cap </span>
									<span>
										{" "}
										{state?.info.fully_diluted_valuation
											? state?.info.fully_diluted_valuation.toLocaleString(
													"en-US"
											  )
											: "N/A"}
									</span>
								</div>
							</PriceDetailBlock>

							<PriceDetailBlock>
								<div>
									<span> Total Volume</span>
									<span>
										{state?.info.total_volume.toLocaleString("en-US")}
									</span>
								</div>
							</PriceDetailBlock>
							<PriceDetailBlock>
								<div>
									<span> Circulating Supply</span>
									<span>
										{state?.info.circulating_supply.toLocaleString("en-US")}
									</span>
								</div>
								<div>
									<span>Max Supply</span>
									<span>
										{state?.info.max_supply
											? state?.info.max_supply.toLocaleString("en-US")
											: "N/A"}
									</span>
								</div>
								<div>
									<span>Total Supply</span>
									<span>
										{state?.info.total_supply
											? state?.info.total_supply.toLocaleString("en-US")
											: "N/A"}
									</span>
								</div>
							</PriceDetailBlock>
						</PriceDetailContainer>
					</TitleContainer>
					<DetailGrid>
						<PriceChartBlock>
							<DetailBlock>
								<TabsContainer>
									<Tabs>
										{CHART_ICONS.map(({ name, chart }) => (
											<Tab
												isActive={chartType === chart}
												onClick={() => onChartClick(chart)}
											>
												<span className="material-symbols-outlined">
													{name}
												</span>
											</Tab>
										))}
									</Tabs>
									<TimeRangeTabs>
										{TIME_RANGE.map(({ day, label }) => (
											<TimeRangeTab
												key={day + label}
												isActive={timeRange === day}
												onClick={() => onTimeRangeClick(day)}
											>
												<span>{label}</span>
											</TimeRangeTab>
										))}
									</TimeRangeTabs>
								</TabsContainer>

								{loading ? (
									<LoadingScreen />
								) : (
									<>
										<DataBlock>
											<Chart
												symbol={state?.info.symbol}
												cryptoId={state?.info.id}
												day={timeRange}
												theme={theme}
												isLineChart={chartType === "line"}
											/>
										</DataBlock>
									</>
								)}
							</DetailBlock>
						</PriceChartBlock>
						<DescriptionContainer>
							<FlexBox>
								<BlockTitle>What's {state?.info.name}?</BlockTitle>
								<div>
									<Description
										dangerouslySetInnerHTML={{
											__html: infoData?.description.en
												? infoData.description.en
												: "Unfortunately, there is no description available for this coin :(",
										}}
									></Description>
								</div>
							</FlexBox>
						</DescriptionContainer>
					</DetailGrid>
				</>
			)}
		</DetailContainer>
	);
}
