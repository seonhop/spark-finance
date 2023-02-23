import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CryptoTitle = styled.h1`
	color: ${(props) => props.theme.textPrimary};
	font-size: 20px;
	display: inline-block;
	background-color: ${(props) => props.theme.colorBlock};
	padding: 20px;
	border-radius: 2px;
`;

const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const Grid = styled.div`
	display: grid;
`;

const Container = styled.div`
	margin-left: 20vw;
	display: flex;
	flex-direction: column;
	padding: 40px 20px 0px 20px;
	gap: 20px;
	color: ${(props) => props.theme.textPrimary};
	flex: 1;
`;

const Block = styled.div`
	display: flex;
	width: 100%;
	background-color: ${(props) => props.theme.colorBlock};
	padding: 20px;
	border-radius: 4px;
`;

const IntroBlock = styled(Block)`
	padding: 10px 80px;
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

const Image = styled.img`
	src: ${(props) => props.src};
`;

const TradingImg = styled(Image)`
	width: 40%;
`;

const CoinImg = styled(Image)`
	width: 10%;
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
	color: ${(props) => props.theme.textPrimary};
`;

/* const cryptos = [
	{
		id: "btc-bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		rank: 1,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "eth-ethereum",
		name: "Ethereum",
		symbol: "ETH",
		rank: 2,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "hex-hex",
		name: "HEX",
		symbol: "HEX",
		rank: 3,
		is_new: false,
		is_active: true,
		type: "token",
	},
];
 */
interface CryptoInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Home() {
	const [cryptos, setCryptos] = useState<CryptoInterface[]>([]);
	const [loading, setLoading] = useState(true);
	const getCryptos = async () => {
		const res = await axios("https://api.coinpaprika.com/v1/coins");
		setCryptos(res.data.slice(0, 30));
		setLoading(false);
	};
	useEffect(() => {
		getCryptos();
	});
	return (
		<Container>
			<IntroBlock>
				<TradingImg src="/images/Cryptocurrency-Investment.png" />

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
				{loading ? (
					"Loading..."
				) : (
					<CryptoGrid>
						{cryptos.map((crypto) => (
							<Crypto key={crypto.id}>
								<Link to={`/${crypto.id}`}>{crypto.name}</Link>
							</Crypto>
						))}
					</CryptoGrid>
				)}
			</CryptoBlock>
		</Container>
	);
}

export default Home;
