import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

interface IPrice {
	name: string;
}

export default function Price() {
	const { name } = useOutletContext<IPrice>();
	return <span>{name}</span>;
}
