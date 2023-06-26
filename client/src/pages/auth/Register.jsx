import React, { useState } from "react";
import ApiRequest from "../../lib/ApiRequest";
import AuthProvider from "../../contexts/AuthContext";
import "./auth.scss";
import FormInput from "../../components/FormInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Register = () => {
	const { setIsLoggedIn } = useContext(AuthProvider);

	const [credentials, setCredentials] = useState({
		firstname: "",
		lastname: "",
		pseudo: "",
		email: "",
		password: "",
		dateOfBirth: "",
		isWaiting: "",
		transplant: "",
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
				"http://localhost:8080/register",
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
					type={"text"}
					name={"firstname"}
					label={"Prénom"}
					onChange={handleChange}
					value={credentials.firstname}
				/>

				<FormInput
					type={"text"}
					name={"lastname"}
					label={"Nom"}
					onChange={handleChange}
					value={credentials.lastname}
				/>

				<FormInput
					type={"text"}
					name={"pseudo"}
					label={"Pseudo"}
					onChange={handleChange}
					value={credentials.pseudo}
				/>

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

				<FormInput
					type={"date"}
					name={"dateOfBirth"}
					label={"Date de naissance"}
					shrinkLabel={true}
					onChange={handleChange}
					value={credentials.dateOfBirth}
				/>

				<FormControlLabel
					className="checkbox"
					control={<Checkbox />}
					label="êtes-vous en attente de greffe ?"
				/>

				<Select
					value={credentials.transplant}
					onChange={handleChange}
					displayEmpty
					inputProps={{ "aria-label": "Without label" }}
				>
					<MenuItem value=""></MenuItem>
					<MenuItem value="heart">Coeur</MenuItem>
					<MenuItem value="liver">Foie</MenuItem>
					<MenuItem value="kidney">Rein</MenuItem>
					<MenuItem value="lung">Poumon</MenuItem>
					<MenuItem value="pancreas">Pancréas</MenuItem>
					<MenuItem value="intestine">Intestin</MenuItem>
				</Select>

				<button type="submit">S'inscrire</button>
			</form>
		</div>
	);
};

export default Register;
