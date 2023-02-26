import styled from "styled-components";
import { FlexBox } from "./BuildingBlocks";

const LoadingBlock = styled(FlexBox)`
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	gap: 20px;
	padding: 50px;
	img {
		width: 40%;
	}
`;

const LoadingHeader = styled.h1`
	font-size: 56px;
	font-weight: 800;
	color: ${(props) => props.theme.textPrimary};
`;

const LoadingText = styled.span`
	font-size: 20px;
	color: ${(props) => props.theme.textSecondary};
`;

export default function LoadingScreen() {
	return (
		<LoadingBlock>
			<img src="https://static.coingecko.com/s/coingecko-branding-guide-8447de673439420efa0ab1e0e03a1f8b0137270fbc9c0b7c086ee284bd417fa1.png" />
			<LoadingHeader>Hang tight 👻</LoadingHeader>
			<LoadingText>
				We're trying to fetch the requested data from CoinGecko
			</LoadingText>
		</LoadingBlock>
	);
}
