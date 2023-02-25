import React from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "./components/Header";
import styled from "styled-components";
import { lightTheme, darkTheme } from "./components/theme";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800&display=swap');
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, menu, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	main, menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure,
	footer, header, hgroup, main, menu, nav, section {
		display: block;
	}
	/* HTML5 hidden-attribute fix for newer browsers */
	*[hidden] {
		display: none;
	}
	body {
	line-height: 1;
	}
	menu, ol, ul {
	list-style: none;
	}
	blockquote, q {
	quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
	content: '';
	content: none;
	}
	table {
	border-collapse: collapse;
	border-spacing: 0;
	}
	* {
		box-sizing: border-box;
	}
	body {
		font-family: 'Open Sans', sans-serif;
		background-color: ${(props) => props.theme.colorBg};
		

	}
	a {
		text-decoration: none;
		color: inherit;
	}
	#root {
		display: flex;
		flex-direction: row;		
	}
`;

const NavBar = styled.div`
	display: flex;
	padding: 24px 40px;
	color: ${(props) => props.theme.textRPrimary ?? props.theme.textPrimary};
	width: 20vw;
	height: 100%;
	position: fixed;
	background-color: ${(props) => props.theme.colorNavBar};
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const NavBarContainer = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 50px;
`;

const NavBarItem = styled.li`
	margin-bottom: 30px;
	font-size: 16px;
	color: "black";
`;

const Logo = styled.h1`
	font-weight: 400;
	font-size: 20px;
`;

const Toggle = styled.button`
	border: none;
	width: 100%;
	overflow: visible;
	border: ${(props) => props.theme.colorPrimary} 1px solid;
	border-radius: 20px;
	padding: 12px;

	background-color: ${(props) => props.theme.colorBg};
	color: ${(props) => props.theme.textPrimary};
`;

function Root() {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};
	return (
		<>
			<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
				<GlobalStyle />
				<NavBar>
					<Logo>SPARK FINANCE</Logo>

					<Toggle onClick={toggleTheme}>Switch Theme</Toggle>
				</NavBar>
				<Outlet context={{ curr_theme: theme }} />
			</ThemeProvider>
		</>
	);
}

export default Root;

{
	/* <NavBarContainer>
<NavBarItem>Stocks</NavBarItem>
<NavBarItem>Cryptos</NavBarItem>
</NavBarContainer>
 */
}
