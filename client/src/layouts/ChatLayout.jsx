import { Outlet } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import Footer from "../components/Footer";

export default function ChatLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<ChatHeader />
			<Outlet />
			<Footer />
		</div>
	);
}
