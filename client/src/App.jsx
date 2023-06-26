import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AuthProvider from "./contexts/AuthContext";

// Layout
import PublicLayout from "./layouts/PublicLayout";
// import ChatLayout from "./layouts/ChatLayout";
import UserLayout from "./layouts/UserLayout";

// Pages
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import Actu from "./pages/Actu";
import Auth from "./pages/auth/Auth";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

	useEffect(() => {
		function checkAuth() {
			setIsLoggedIn(!!localStorage.getItem("token"));
		}

		window.addEventListener("storage", checkAuth);

		return () => {
			window.removeEventListener("storage", checkAuth);
		};
	}, []);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<PublicLayout />}>
				<Route index element={<Home />} />
				<Route path="temoignages" element={<Testimonials />} />
				<Route path="actu" element={<Actu />} />
				<Route path="social/*" element={<Auth />} />
				<Route
					path="/give-chat"
					element={isLoggedIn ? <UserLayout /> : <Navigate to="/social/*" />}
				/>
			</Route>
		)
	);
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
