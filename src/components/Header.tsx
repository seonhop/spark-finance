import { Link } from "react-router-dom";

export default function Header() {
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
