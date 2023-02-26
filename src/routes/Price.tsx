import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { StringLiteral } from "typescript";
import IDetailOutlet from "../interfaces/DetailOutlet";
import { Block, FlexBox } from "../components/BuildingBlocks";
import { formattedDate } from "../components/FormattedDate";
import { info } from "console";

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

const PercentChangeTitleBlock = styled(FlexBox)`
	gap: 4px;
`;

const PercentChangeValue = styled.span<{ isPos: boolean }>`
	display: inline-block;
	text-align: right;
	color: ${(props) =>
		props.isPos ? props.theme.changePos : props.theme.changeNeg};
`;

const PriceValue = styled.span`
	font-size: 2em;
`;

const PriceCard = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.colorPrimary};
	box-sizing: border-box;
	height: 100%;
	padding: 20px;
	color: ${(props) => props.theme.textRPrimary};

	:first-child {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		background-color: ${(props) => props.theme.colorNavBar};
		justify-content: center;
		align-items: center;
		gap: 8px;
		> span:first-child {
			color: ${(props) => props.theme.textRSecondary};
		}
		> span:last-child {
			color: ${(props) => props.theme.textRSecondary};
			font-size: 80%;
			margin-top: 20px;
		}
	}
	:nth-child(n + 2) {
		justify-content: space-between;
		> div > span:first-child {
			font-size: 60%;
			line-height: 1.5;
			color: ${(props) => props.theme.textRSecondary};
		}
		> div > span:last-child {
			font-size: 85%;
		}
		> span {
			font-size: 1.7em;
		}
	}
`;

export default function Price() {
	const { infoData } = useOutletContext<IDetailOutlet>();
	const marketData = infoData.market_data;
	const oneDayPos = marketData.price_change_percentage_24h_in_currency.usd > 0;
	const oneWeekPos = marketData.price_change_percentage_7d_in_currency.usd > 0;
	const oneMonthPos =
		marketData.price_change_percentage_30d_in_currency.usd > 0;
	const oneYearPos = marketData.price_change_percentage_1y_in_currency.usd > 0;

	return (
		<PriceContainer>
			<PriceGrid>
				<PriceCard>
					<span>- Current Price -</span>
					<PriceValue>
						{" "}
						{"$ " + marketData.current_price.usd.toLocaleString("en-US")}{" "}
					</PriceValue>
					<span>
						{" "}
						All time high was {"$" +
							marketData.ath.usd.toLocaleString("en-US")}{" "}
						on {formattedDate(marketData.ath_date.usd.toString())}
					</span>
				</PriceCard>
				<PriceCard>
					<PercentChangeTitleBlock>
						<span>Percent Change</span>
						<span>1 Day</span>
					</PercentChangeTitleBlock>
					<PercentChangeValue isPos={oneDayPos}>
						{marketData.price_change_percentage_24h_in_currency.usd < 0
							? "- " +
							  +Math.abs(
									marketData.price_change_percentage_24h_in_currency.usd
							  ).toFixed(6)
							: marketData.price_change_percentage_24h_in_currency.usd === 0
							? "-"
							: "+ " +
							  +marketData.price_change_percentage_24h_in_currency.usd.toFixed(
									6
							  )}
						%
					</PercentChangeValue>
				</PriceCard>
				<PriceCard>
					<PercentChangeTitleBlock>
						<span>Percent Change</span>
						<span>1 Week</span>
					</PercentChangeTitleBlock>
					<PercentChangeValue isPos={oneWeekPos}>
						{marketData.price_change_percentage_7d_in_currency.usd < 0
							? "- " +
							  +Math.abs(
									marketData.price_change_percentage_7d_in_currency.usd
							  ).toFixed(6)
							: marketData.price_change_percentage_7d_in_currency.usd === 0
							? "-"
							: "+ " +
							  +marketData.price_change_percentage_7d_in_currency.usd.toFixed(
									6
							  )}
						%
					</PercentChangeValue>
				</PriceCard>
				<PriceCard>
					<PercentChangeTitleBlock>
						<span>Percent Change</span>
						<span>1 Month</span>
					</PercentChangeTitleBlock>
					<PercentChangeValue isPos={oneMonthPos}>
						{marketData.price_change_percentage_30d_in_currency.usd < 0
							? "- " +
							  +Math.abs(
									marketData.price_change_percentage_30d_in_currency.usd
							  ).toFixed(6)
							: marketData.price_change_percentage_30d_in_currency.usd === 0
							? "-"
							: "+ " +
							  +marketData.price_change_percentage_30d_in_currency.usd.toFixed(
									6
							  )}
						%
					</PercentChangeValue>
				</PriceCard>
				<PriceCard>
					<PercentChangeTitleBlock>
						<span>Percent Change</span>
						<span>1 Year</span>
					</PercentChangeTitleBlock>
					<PercentChangeValue isPos={oneYearPos}>
						{marketData.price_change_percentage_1y_in_currency.usd < 0
							? "- " +
							  +Math.abs(
									marketData.price_change_percentage_1y_in_currency.usd
							  ).toFixed(6)
							: marketData.price_change_percentage_1y_in_currency.usd === 0
							? "-"
							: "+ " +
							  +marketData.price_change_percentage_1y_in_currency.usd.toFixed(
									6
							  )}
						%
					</PercentChangeValue>
				</PriceCard>
			</PriceGrid>
		</PriceContainer>
	);
}
