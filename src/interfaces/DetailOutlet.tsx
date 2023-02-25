import IPriceInfoData from "./PriceInfoData";
export default interface IDetailOutlet {
	name: string;
	id: string;
	symbol: string;
	priceData: IPriceInfoData;
	curr_theme: string;
}
