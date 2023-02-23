import { useParams, useLocation } from "react-router-dom";
import { Container, Block, Image, FlexBox } from "../components/BuildingBlocks";
import LoadingScreen from "../components/Loading";
import styled from "styled-components";
import { useState, useEffect } from "react";
import IPriceInfoData from "../interfaces/PriceInfoData";
import IInfoData from "../interfaces/InfoData";

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

const TitleBlock = styled(FlexBox)`
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
	const [loading, setLoading] = useState(false);
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
		})();
	}, []);

	return (
		<DetailContainer>
			{state ? (
				<>
					<Block>
						<TitleBlock>
							<CryptoImg
								src={`https://cryptocurrencyliveprices.com/img/${cryptoId}.png`}
							/>
							<CryptoName>{state?.info.name}</CryptoName>
						</TitleBlock>
					</Block>
					<Block>{loading ? "Loading..." : info?.description}</Block>
				</>
			) : (
				<LoadingScreen />
			)}
		</DetailContainer>
	);
}
