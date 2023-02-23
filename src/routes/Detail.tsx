import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { Container, Block, Image, FlexBox } from "../components/BuildingBlocks";
import LoadingScreen from "../components/Loading";
import styled from "styled-components";
import { useState, useEffect } from "react";
import IPriceInfoData from "../interfaces/PriceInfoData";
import IInfoData from "../interfaces/InfoData";

const BackButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: auto;
	flex-shrink: 0;
	padding: 8px 12px;
	border-radius: 4px;
	gap: 12px;
	span {
		vertical-align: middle;
		font-size: 14px;
		width: auto;
	}
`;

const DetailContainer = styled(Container)`
	gap: 4px;
`;

const CryptoImg = styled(Image)`
	width: 11%;
	height: auto;
`;

const CryptoName = styled.h1`
	font-size: 36px;
`;

const DetailBlock = styled(FlexBox)`
	padding: 0px 20px;
`;

const TitleBlock = styled(DetailBlock)`
	margin-top: 80px;
	flex-direction: row;
	align-items: center;
	gap: 12px;
`;

interface InfoInterface {
	id: string;
	name: string;
}

interface RouterState {
	state: {
		info: InfoInterface;
	};
}

export default function Detail() {
	const { cryptoId } = useParams();
	const { state } = useLocation() as RouterState;
	const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState<IInfoData>();
	const [priceInfo, setPriceInfo] = useState<IPriceInfoData>();
	useEffect(() => {
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
	}, [cryptoId]);
	console.log(info);
	return (
		<DetailContainer>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					<Block>
						<FlexBox>
							<Link to="/">
								<BackButton>
									<span className="material-icons md-24">
										arrow_back_ios_new
									</span>
									<span>View all assets</span>
								</BackButton>
							</Link>
							<TitleBlock>
								<CryptoImg
									src={`https://cryptocurrencyliveprices.com/img/${cryptoId}.png`}
								/>
								<CryptoName>
									{state?.info.name
										? state?.info.name
										: loading
										? "Loading..."
										: info?.name}
								</CryptoName>
							</TitleBlock>
						</FlexBox>
					</Block>
					<Block>
						<DetailBlock>
							{loading ? (
								<LoadingScreen />
							) : (
								<>
									<FlexBox>
										<Link to="price">
											<span>Price</span>
										</Link>
										<Link to="chart">
											<span>Chart</span>
										</Link>
									</FlexBox>
									<FlexBox>
										<Outlet
											context={{
												name: info?.name,
											}}
										/>
									</FlexBox>
								</>
							)}
						</DetailBlock>
					</Block>
				</>
			)}
		</DetailContainer>
	);
}
