import { useState, useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
	const { setIsLoggedIn } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState("");
	const [credentials, setCredentials] = useState({
		firstname: "",
		lastname: "",
		pseudo: "",
		email: "",
		password: "",
		dateOfBirth: "",
		isWaiting: false,
		transplant: "",
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;

		if (type === "checkbox") {
			setCredentials({ ...credentials, [name]: checked });
		} else {
			setCredentials({ ...credentials, [name]: value });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await apiRequest(
				"POST",
				"/register",
				{},
				credentials,
				false
			);
			console.log("response register", response);
			if (response.status === 201) {
				localStorage.setItem("token", response.data.token);
				setIsLoggedIn(true);
				window.location.href = "/chat";
			} else {
				setErrorMessage(
					"L'inscription a échoué. Veuillez vérifier vos identifiants."
				);
			}
		} catch (err) {
			console.error(err);
			setErrorMessage(`Une erreur est survenue: ${err.message}`);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Inscris toi
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<FormInput
						id="firstname"
						name="firstname"
						type="text"
						autoComplete="firstname"
						labelText="Prénom"
						isRequired={true}
						onChange={handleChange}
						value={credentials.firstname}
					/>
					<FormInput
						id="lastname"
						name="lastname"
						type="text"
						autoComplete="lastname"
						labelText="Nom"
						isRequired={true}
						onChange={handleChange}
						value={credentials.lastname}
					/>
					<FormInput
						id="pseudo"
						name="pseudo"
						type="text"
						autoComplete="pseudo"
						labelText="Pseudo"
						isRequired={true}
						onChange={handleChange}
						value={credentials.pseudo}
					/>
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
					<FormInput
						id="dateOfBirth"
						name="dateOfBirth"
						type="date"
						autoComplete="dateOfBirth"
						labelText="Date de naissance"
						isRequired={false}
						onChange={handleChange}
						value={credentials.dateOfBirth}
					/>
					<div className="relative flex items-start pb-4 pt-3.5">
						<div className="min-w-0 flex-1 text-sm leading-6">
							<label htmlFor="candidates" className="font-medium text-gray-900">
								Êtes-vous en attente de greffe ?
							</label>
						</div>
						<div className="ml-3 flex h-6 items-center">
							<input
								id="isWaiting"
								name="isWaiting"
								type="checkbox"
								onChange={handleChange}
								value={credentials.isWaiting}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="transplant"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							De quelle greffe avez-vous besoin ?
						</label>
						<select
							id="transplant"
							name="transplant"
							onChange={handleChange}
							value={credentials.transplant}
							className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option value="Coeur">Coeur</option>
							<option value="Foie">Foie</option>
							<option value="Rein">Rein</option>
							<option value="Poumons">Poumons</option>
							<option value="Pancréas">Pancréas</option>
							<option value="Intestin">Intestin</option>
						</select>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							S'inscrire
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
					Déjà inscrit{" "}
					<Link
						to="/login"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Connecte-toi
					</Link>
				</p>
			</div>
		</div>
	);
}
