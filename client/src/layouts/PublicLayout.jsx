import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<PublicHeader />
			<Outlet />
			<Footer />
		</div>
	);
}
