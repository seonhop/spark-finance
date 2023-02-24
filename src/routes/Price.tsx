import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { StringLiteral } from "typescript";
import IDetailOutlet from "../interfaces/DetailOutlet";
import { Block } from "../components/BuildingBlocks";
import { formattedDate } from "../components/FormattedDate";

const PriceContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
`;

const PriceGrid = styled.div`
	margin-top: 24px;
	display: grid;
	height: 100%;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	box-sizing: border-box;
	height: 300px;
	gap: 4px;
`;

const PriceCard = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.colorPrimary};
	box-sizing: border-box;
	height: 100%;
	:first-child {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		background-color: ${(props) => props.theme.colorNavBar};
	}
`;

export default function Price() {
	const { priceData } = useOutletContext<IDetailOutlet>();
	const usdQuotes = priceData.quotes.USD;
	console.log(priceData);
	return (
		<PriceContainer>
			<PriceGrid>
				<PriceCard>
					<span>
						{" "}
						All time high was on {formattedDate(usdQuotes.ath_date.toString())}
					</span>
					<span>{usdQuotes.price} </span>
				</PriceCard>
				<PriceCard />
				<PriceCard />
				<PriceCard />
				<PriceCard />
				<PriceCard />
				<PriceCard />
				<PriceCard />
			</PriceGrid>
		</PriceContainer>
	);
}
