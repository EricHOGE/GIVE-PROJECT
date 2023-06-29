import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Contexts
import AuthProvider from "./contexts/AuthContext";

// Layout
import PublicLayout from "./layouts/PublicLayout";
import ChatLayout from "./layouts/ChatLayout";

// Pages
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import Actu from "./pages/Actu";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChatContent from "./pages/ChatContent";

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
			<>
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<Home />} />
					<Route path="temoignages" element={<Testimonials />} />
					<Route path="actu" element={<Actu />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/chat" element={<ChatLayout />}>
					<Route index element={<ChatContent />} />
				</Route>
			</>
		)
	);
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
