import { Outlet } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";

export default function ChatLayout() {
	return (
		<div className="h-[100vh] max-w-[100vw]">
			<ChatHeader />
			<Outlet />
		</div>
	);
}
