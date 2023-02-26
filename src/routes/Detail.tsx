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
import { useState, useEffect } from "react";
import IPriceInfoData from "../interfaces/PriceInfoData";
import IInfoData from "../interfaces/InfoData";
import { useQuery } from "react-query";
import { fetchCryptoInfo, fetchCryptoTickers } from "../api";
import { formattedDate } from "../components/FormattedDate";
import { IRootOutlet } from "../interfaces/RootOutlet";
import { IfetchCryptosFromCoinGecko } from "../interfaces/CryptoGecko";

const BackButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: auto;
	flex-shrink: 0;
	padding: 8px 12px;
	border-radius: 4px;
	gap: 4px;
	span {
		vertical-align: middle;
		font-size: 14px;
		width: auto;
	}
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
	gap: 12px;
	height: 12vh;
`;

const Tabs = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin: 8px 0px;
`;

const Tab = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	span {
		text-align: center;
		text-transform: uppercase;
	}
	font-size: 12px;
	font-weight: 400;
	background-color: ${(props) =>
		props.isActive ? props.theme.colorNavBar : props.theme.colorBg};
	padding: 12px 20px;
	border-radius: 10px;
	border-width: thick;
	border-color: ${(props) => props.theme.colorNavBar};
	color: ${(props) =>
		props.isActive ? props.theme.textRPrimary : props.theme.textRSecondary};
	a {
		display: block;
	}
`;

const Description = styled.div`
	width: 100%;

	line-height: 1.5;
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
`;

const BlockTitle = styled.h1`
	margin: 20px 0px 12px 0px;
	font-size: 18px;
	font-weight: 600;
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

export default function Detail() {
	const { state } = useLocation() as RouterState;
	console.log(state);
	const cryptoId = state?.info.id;
	const priceMatch = useMatch("/:assetId/price");
	const chartMatch = useMatch("/:assetId/chart");
	const { curr_theme: theme } = useOutletContext<IRootOutlet>();
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		["info", cryptoId],
		() => fetchCryptoInfo(`${cryptoId}`)
	);
	const { isLoading: priceLoading, data: priceData } = useQuery<IPriceInfoData>(
		["price", cryptoId],
		() => fetchCryptoTickers(`${cryptoId}`)
	);
	const loading = infoLoading && priceLoading;

	/* 	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${cryptoId}`)
			).json();
			const priceInfoData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${cryptoId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(priceInfoData);
			setLoading(false);
		})();
	}, [cryptoId]); */
	console.log("infoData: ", infoData);
	console.log("priceData: ", priceData);
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
							<span className="material-icons md-24">arrow_back_ios_new</span>
							<span>Home</span>
						</BackButton>
					</Link>
					<TitleContainer>
						<RankBlock>
							<span>Rank #{state?.info.rank}</span>
							<span>{state?.info.symbol.toUpperCase()}</span>
						</RankBlock>
						<TitleBlock>
							<CryptoImg src={state?.info.image} />
							<CryptoName>
								{state?.info.name
									? state?.info.name
									: loading
									? "Loading..."
									: infoData?.name}
							</CryptoName>
						</TitleBlock>
					</TitleContainer>
					<DetailGrid>
						<PriceChartBlock>
							<DetailBlock>
								<Tabs>
									<Link
										to="price"
										state={{
											info: state?.info,
										}}
									>
										<Tab isActive={priceMatch !== null}>
											<span>Price</span>
										</Tab>
									</Link>
									<Link to="chart" state={{ info: state?.info }}>
										<Tab isActive={chartMatch !== null}>
											<span>Chart</span>
										</Tab>
									</Link>
								</Tabs>
								{loading ? (
									<LoadingScreen />
								) : (
									<>
										<DataBlock>
											<Outlet
												context={{
													name: infoData?.name,
													id: infoData?.id,
													symbol: infoData?.symbol,
													curr_theme: theme,
													infoData: infoData,
												}}
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

							<DescriptionBlock>
								<span>Rank: {state?.info.rank}</span>
								<span>Started at: {date}</span>

								<span>
									Total supply:{" "}
									{state?.info.total_supply
										? state?.info.total_supply.toLocaleString("en-US")
										: "N/A"}
								</span>
								<span>
									Total volume:{" "}
									{state?.info.total_volume
										? state?.info.total_volume.toLocaleString("en-US")
										: "N/A"}
								</span>
							</DescriptionBlock>
						</DescriptionContainer>
					</DetailGrid>
				</>
			)}
		</DetailContainer>
	);
}
