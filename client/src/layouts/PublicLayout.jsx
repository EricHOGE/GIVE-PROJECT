import { Outlet, NavLink } from "react-router-dom";

export default function PublicLayout() {
	function toggleMenu() {
		const navLinks = document.querySelector(".nav-links");
		navLinks.classList.toggle("nav-active");
	}
	return (
		<div className="root-layout">
			<header>
				<nav>
					<h1>GIVE</h1>
					<div class="nav-links">
						<NavLink to="/">Accueil</NavLink>
						<NavLink to="temoignages">Témoignages</NavLink>
						<NavLink to="actu">Actualités</NavLink>
						<NavLink to="social">Accéder au réseau social</NavLink>
					</div>
					<button class="menu-toggle" onclick="toggleMenu()">
						&#9776;
					</button>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
