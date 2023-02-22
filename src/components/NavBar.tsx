import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
	return (
		<header>
			<ul>
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/detail"}>Detail</Link>
				</li>
			</ul>
		</header>
	);
}
