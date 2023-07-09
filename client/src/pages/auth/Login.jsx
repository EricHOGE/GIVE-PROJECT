import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import logoCircle from "../../assets/logoCircle.png";

export default function Login() {
	const [errorMessage, setErrorMessage] = useState("");

	// Vérifie si l'utilisateur est déjà connecté
	if (localStorage.getItem("token")) {
		window.location.href = "/chat";
		return null;
	}

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await apiRequest("POST", "/login", {}, credentials);
			console.log(response);
			if (response.status === 201) {
				console.log(response.data.token);
				localStorage.setItem("token", response.data.token);
				// setIsLoggedIn(true);
				// await fetchUser();
				window.location.href = "/chat";
			} else {
				setErrorMessage(
					"La connexion a échoué. Veuillez vérifier vos identifiants."
				);
			}
		} catch (err) {
			console.error(err);
			setErrorMessage(`Une erreur est survenue: ${err.message}`);
		}
	};

	return (
		<div className="flex flex-1 flex-col  px-6 py-14 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img className="mx-auto h-14" src={logoCircle} alt="GIVE" />
				<h2 className="mt-4 text-center text-2xl font-semibold  text-primary">
					Connexion
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<FormInput
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						labelText="Email"
						isRequired={true}
						onChange={handleChange}
						value={credentials.email}
					/>

					<FormInput
						id="password"
						name="password"
						type="password"
						autoComplete="password"
						labelText="Mot de passe"
						isRequired={true}
						onChange={handleChange}
						value={credentials.password}
					/>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
						>
							Connexion
						</button>
					</div>
					<div className="w-1/2 relative">
						{errorMessage && (
							<div
								className="absolute w-full flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
								role="alert"
							>
								{errorMessage}
							</div>
						)}
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Tu n'as pas encore de compte ?{" "}
					<Link
						to="/register"
						className="font-semibold leading-6 text-primary hover:text-secondary focus:text-secondary"
					>
						Inscris-toi
					</Link>
				</p>
			</div>
		</div>
	);
}
