import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await fetch("http://localhost:8000/api/user", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setUser(data);
				} else {
					throw new Error("Failed to fetch user");
				}
			} catch (error) {
				console.error(error);
				localStorage.removeItem("token");
				setIsLoggedIn(false);
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
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
