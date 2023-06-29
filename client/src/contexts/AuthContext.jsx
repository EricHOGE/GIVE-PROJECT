import { createContext, useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await apiRequest("GET", "/getuser", {}, {}, true);
				if (response.status === 200) {
					setUser(response.data);
					console.log("response fetchUser", response.data);
				} else {
					throw new Error("Failed to fetch user");
				}
			} catch (error) {
				console.error(error);
				// localStorage.removeItem("token");
				// setIsLoggedIn(false);
			}
		};

		if (isLoggedIn) {
			fetchUser();
		}
	}, [isLoggedIn]);

	const contextValue = {
		isLoggedIn,
		setIsLoggedIn,
		user,
		setUser,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
