import React, { useState, useContext } from "react";
import "./auth.scss";
import FormInput from "../../components/FormInput";
import ApiRequest from "../../lib/ApiRequest";
import AuthProvider from "../../contexts/AuthContext";

const Login = () => {
	const { setIsLoggedIn } = useContext(AuthProvider);
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
			const response = await ApiRequest(
				"POST",
				"http://localhost:8080/login",
				{},
				credentials
			);

			console.log(response);

			if (response.status >= 400) {
				throw new Error(`Error occurred: ${response.status}`);
			} else {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				setIsLoggedIn(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container-register">
			<form onSubmit={handleSubmit} className="register-form">
				<FormInput
					type={"email"}
					name={"email"}
					label={"Email"}
					onChange={handleChange}
					value={credentials.email}
				/>

				<FormInput
					type={"password"}
					name={"password"}
					label={"Mot de passe"}
					onChange={handleChange}
					value={credentials.password}
				/>

				<button type="submit">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;
