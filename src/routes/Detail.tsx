import { useParams } from "react-router-dom";

export default function Detail() {
	const { assetId } = useParams();
	console.log(assetId);
	return <h1>Detail</h1>;
}
