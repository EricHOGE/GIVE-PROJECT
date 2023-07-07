import PublicHeader from "../components/PublicHeader";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
	return (
		<div className="h-[100vh] max-w-[100vw]">
			<PublicHeader />
			<Outlet />
		</div>
	);
}
