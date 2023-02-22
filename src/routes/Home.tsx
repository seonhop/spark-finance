import styled from "styled-components";

const Title = styled.h1`
	color: ${(props) => props.theme.textPrimary};
`;

function Home() {
	return <Title>Tracker</Title>;
}

export default Home;
