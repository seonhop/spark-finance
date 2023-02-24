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
import { fetchCryptos } from "../api";

const CryptoTitle = styled.h1`
	color: ${(props) => props.theme.textPrimary};
	font-size: 20px;
	display: inline-block;
	background-color: ${(props) => props.theme.colorBlock};
	padding: 20px;
	border-radius: 2px;
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

const Description = styled.span`
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

/* async function callAPI(cryptos:CryptoInterface[]) {
	cryptos.forEach(function (crypto) {
		const url = `http://cors-anywhere.herokuapp.com/https://api.coinpaprika.com/v1/tickers/${crypto?.id}`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		await new Promise(resolve => setTimeout(resolve, 100)); // pause for 1 second before next iteration
	})
  } */

async function callAPI(cryptos: CryptoInterface[]) {
	for (const crypto of cryptos) {
		const response = await fetch(
			`https://api.coinpaprika.com/v1/tickers/${crypto?.id}`
		);
		const data = await response.json();
		const price = data?.quotes?.USD?.ath_price;
		crypto.price = price.toFixed(2);
		console.log("price is: ", crypto.price);
		await new Promise((resolve) => setTimeout(resolve, 500)); // pause for 1 second before next iteration
	}
}

function Home() {
	const { isLoading, data } = useQuery<CryptoInterface[]>(
		"allCryptos",
		fetchCryptos
	);
	/* 	const getCryptos = async () => {
		const res = await axios.get("https://api.coinpaprika.com/v1/coins");
		setCryptos(res.data.slice(0, 30));
		console.log(cryptos);
		setLoading(false);
	};
	useEffect(() => {
		getCryptos();
	}); */
	/* 	useEffect(() => {
		(async () => {
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			setCryptos(json.slice(0, 30));
			setLoading(false);
		})();
	}, []);
	console.log(cryptos); */

	/* 	useEffect(() => {
		(async () => {
			for (const crypto of cryptos) {
				const response = await fetch(
					`http://cors-anywhere.herokuapp.com/https://api.coinpaprika.com/v1/tickers/${crypto?.id}`
				);
				const data = await response.json();
				const price = data?.quotes?.USD?.ath_price;
				crypto.price = price.toFixed(2);
				console.log("price is: ", crypto.price);
				await new Promise((resolve) => setTimeout(resolve, 500)); // pause for 1 second before next iteration
			}
		})();
	}, []); */
	return (
		<HomeContainer>
			<IntroBlock>
				<TradingImg
					src={process.env.PUBLIC_URL + "/images/Dollar-dynamic-collar.png"}
				/>

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
				<FlexBox>
					<CryptoTitle>Crypto List</CryptoTitle>
				</FlexBox>
				{isLoading ? (
					<LoadingScreen />
				) : (
					<CryptoGrid>
						{data?.slice(0, 30).map((crypto) => (
							<Link
								to={`/${crypto.id}`}
								state={{ info: { id: crypto.id, name: crypto.name } }}
							>
								<Crypto key={crypto.id}>
									<CryptoLineBlock>
										<CoinImg
											src={`https://cryptocurrencyliveprices.com/img/${crypto.id}.png`}
										/>
										{crypto.name}
									</CryptoLineBlock>
									<CryptoPrice>${crypto.price}</CryptoPrice>
								</Crypto>
							</Link>
						))}
					</CryptoGrid>
				)}
			</CryptoBlock>
		</HomeContainer>
	);
}

export default Home;
