import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	FlexBox,
	Grid,
	Container,
	Block,
	Image,
} from "../components/BuildingBlocks";
import LoadingScreen from "../components/Loading";
import { useQuery } from "react-query";
import {
	fetchAllCoinPrice,
	fetchCryptos,
	fetchCryptosFromCoinGecko,
} from "../api";
import { IAllPrice } from "../interfaces/AllPrice";
import { IfetchCryptosFromCoinGecko } from "../interfaces/CryptoGecko";

const CryptoTitle = styled.h1`
	color: ${(props) => props.theme.textPrimary};
	font-size: 20px;
	display: block;
`;

const HomeContainer = styled(Container)`
	gap: 20px;
`;

const IntroBlock = styled(Block)`
	padding: 10px 80px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const TextBlock = styled.div`
	display: flex;
	flex-direction: column;
	> span:first-child {
		font-size: 48px;
	}
	width: 50%;
	padding: 60px 0px 40px 0px;
	justify-content: space-between;
`;

const Description = styled.p`
	color: ${(props) => props.theme.textSecondary};
	margin-top: 20px;
	line-height: 1.5;
`;

const TradingImg = styled(Image)`
	width: 40%;
`;

const CoinImg = styled(Image)`
	width: 10%;
	height: auto;
`;

const CryptoGrid = styled(Grid)`
	grid-template-columns: repeat(5, 1fr);
	gap: 4px;
`;

const CryptoBlock = styled(FlexBox)`
	gap: 4px;
`;

const Crypto = styled(FlexBox)`
	height: 150px;
	padding: 20px;
	background-color: ${(props) => props.theme.colorBlock};
	:hover {
		background-color: ${(props) => props.theme.colorHover};
	}
	color: ${(props) => props.theme.textPrimary};
	gap: 12px;
	justify-content: space-between;
`;

const CryptoLineBlock = styled(FlexBox)`
	flex-direction: row;
	gap: 8px;
	font-size: 80%;
	align-items: center;
`;

const CryptoPrice = styled.h1`
	font-size: 20px;
	font-weight: 800;
`;

interface CryptoInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	price?: string;
}

const CryptoChangeBlock = styled.div<{ priceChange: number }>`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 4px;
	span {
		text-align: right;
	}
	span:first-child {
		color: ${(props) => props.theme.textRSecondary};
		font-size: 14px;
	}
	span:last-child {
		color: ${(props) =>
			props.priceChange == 0
				? props.theme.changeNone
				: props.priceChange > 0
				? props.theme.changePos
				: props.theme.changeNeg};
		font-size: 24px;
	}
`;

const CryptoPriceNameBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const CryptoTitleBlock = styled.div`
	display: flex;
	justify-content: space-between;
	flex: 1;
	background-color: ${(props) => props.theme.colorBlock};
	align-items: flex-end;
	padding: 20px;
	border-radius: 2px;
	span {
		color: ${(props) => props.theme.textRSecondary};
		font-size: 12px;
	}
	a {
		text-decoration: underline;
	}
`;

/* async function callAPI(cryptos:CryptoInterface[]) {
	cryptos.forEach(function (crypto) {
		const url = `http://cors-anywhere.herokuapp.com/https://api.coinpaprika.com/v1/tickers/${crypto?.id}`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		await new Promise(resolve => setTimeout(resolve, 100)); // pause for 1 second before next iteration
	})
  } */

function Home() {
	const { isLoading, data } = useQuery<IfetchCryptosFromCoinGecko[]>(
		"allCryptos",
		fetchCryptosFromCoinGecko
	);
	if (data) {
		for (let i = 0; i < data.length; i++) {
			data[i].rank = i + 1;
		}
	}
	const isNotLoading = !isLoading;
	console.log(data);
	/* 	const slicedData = data?.slice(0, 30);
	const cryptoSymbols = slicedData?.map((crypto) => crypto.symbol).join(",");
	//console.log(cryptoSymbols);
	const { isLoading: priceLoading, data: allPriceData } = useQuery<IAllPrice>(
		"allCryptoPrice",
		() => fetchAllCoinPrice(cryptoSymbols)
	);
	const isLoading = fetchLoading && priceLoading; */
	//console.log(slicedData);
	//console.log(allPriceData);
	return (
		<div>
			<HomeContainer>
				<IntroBlock>
					<TradingImg src="https://clouddevs.com/3dbay/files/preview/1281x1191/11647890811q5lrmcmi8npu1otmi3edv5a4zfthd9kv13dg1dmml0ltqefpqwtgg1lthb8aqgdh5loqvdehgfopldk5chfjfp3vgnlozpfoyuye.png" />

					<TextBlock>
						<span>
							Welcome to <br />
							<b>SPARK FINANCE!</b>
						</span>
						<FlexBox>
							<Description>
								Are you looking for crypto infos? <br />
								SPARK FINANCE provides you with real-time and up-to-date
								information on your favorite cryptos.
							</Description>
						</FlexBox>
					</TextBlock>
				</IntroBlock>

				<CryptoBlock>
					<CryptoTitleBlock>
						<CryptoTitle>Crypto List</CryptoTitle>
						<span>
							Powered by{" "}
							<a href="https://www.coingecko.com/en/api/documentation">
								CoinGecko
							</a>
						</span>
					</CryptoTitleBlock>
					{isLoading ? (
						<LoadingScreen />
					) : (
						<CryptoGrid>
							{data?.map((crypto) => (
								<Link
									to={`/${crypto.symbol + "-" + crypto.id}`}
									state={{
										info: crypto,
									}}
								>
									<Crypto key={crypto.id}>
										<CryptoPriceNameBlock>
											<CryptoLineBlock>
												<CoinImg src={crypto.image} />
												{crypto.name}
											</CryptoLineBlock>
											<CryptoPrice>
												{"$ " +
													crypto.current_price
														.toLocaleString("en-US", {
															minimumFractionDigits: 6,
														})
														.replace(/\.?0+$/, "")}
											</CryptoPrice>
										</CryptoPriceNameBlock>

										<CryptoChangeBlock priceChange={crypto.price_change_24h}>
											<span>
												{crypto.price_change_24h < 0
													? "- $" +
													  +Math.abs(crypto.price_change_24h).toFixed(6)
													: crypto.price_change_24h === 0
													? "-"
													: "+ $" + +crypto.price_change_24h.toFixed(6)}
											</span>
											<span>
												{crypto.price_change_percentage_24h === 0
													? "—"
													: crypto.price_change_24h > 0
													? "+ " +
													  +crypto.price_change_percentage_24h.toFixed(2) +
													  "%"
													: "- " +
													  +Math.abs(
															crypto.price_change_percentage_24h
													  ).toFixed(2) +
													  "%"}
											</span>
										</CryptoChangeBlock>
									</Crypto>
								</Link>
							))}
						</CryptoGrid>
					)}
				</CryptoBlock>
			</HomeContainer>
		</div>
	);
}

export default Home;
