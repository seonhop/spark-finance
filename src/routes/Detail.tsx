import { useParams, useLocation } from "react-router-dom";
import { Container, Block, Image, FlexBox } from "../components/BuildingBlocks";
import LoadingScreen from "../components/Loading";
import styled from "styled-components";
import { useState } from "react";

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

	console.log(cryptoId);
	console.log(state);
	return (
		<DetailContainer>
			{state ? (
				<>
					<Block>
						<TitleBlock>
							<CryptoImg
								src={`https://cryptocurrencyliveprices.com/img/${state?.info.id}.png`}
							/>
							<CryptoName>{state?.info.name}</CryptoName>
						</TitleBlock>
					</Block>
					<Block>{loading ? "Loading..." : null}</Block>
				</>
			) : (
				<LoadingScreen />
			)}
		</DetailContainer>
	);
}
