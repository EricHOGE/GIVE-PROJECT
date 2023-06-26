import { NavLink, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import "./auth.scss";

export default function Auth() {
	return (
		<div className="auth">
			<header>
				<h1>Bienvenue sur le réseau social "GIVE"</h1>
				<p>
					Connectez-vous ou créez-vous un compte si cela n'est pas déjà fait !
				</p>
				<div className="auth-buttons">
					<NavLink to="register">Inscription</NavLink>
					<div className="separator">|</div>
					<NavLink to="login">Connexion</NavLink>
				</div>
			</header>
			<main>
				<Routes>
					<Route index element={<Register />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</main>
		</div>
	);
}
