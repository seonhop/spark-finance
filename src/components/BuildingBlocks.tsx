import styled from "styled-components";

export const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Grid = styled.div`
	display: grid;
`;

export const Container = styled(FlexBox)`
	margin-left: 20vw;
	color: ${(props) => props.theme.textPrimary};
	padding: 40px 20px;
	flex: 1;
`;

export const Block = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: ${(props) => props.theme.colorBlock};
	padding: 20px;
	border-radius: 4px;
`;

export const Image = styled.img`
	src: ${(props) => props.src};
`;
