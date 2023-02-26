import IInfoData from "./InfoData";
import IPriceInfoData from "./PriceInfoData";
export default interface IDetailOutlet {
	name: string;
	id: string;
	symbol: string;
	curr_theme: string;
	infoData: IInfoData;
}
