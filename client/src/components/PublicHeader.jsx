import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navigation = [
	{ name: "Accueil", to: "/", current: true },
	{ name: "Témoignages", to: "/temoignages", current: false },
	{ name: "Actualités", to: "/actu", current: false },
];

export default function PublicHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const actualPath = useLocation().pathname;

	navigation.map((item) => {
		item.current = actualPath === item.to;
	});

	return (
		<header className="bg-gradient-to-t from-white to-[#31529476]">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">GIVE</span>
						<img className="h-16 w-auto" src={logo} alt="give" />
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.to}
							className={
								(item.current
									? "bg-secondary text-gray-100"
									: "text-gray-700 hover:bg-secondary hover:text-gray-100") +
								" rounded-md px-3 py-2 text-sm font-medium"
							}
						>
							{item.name}
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Link
						to="/login"
						className="text-md font-semibold text-gray-700 flex items-center"
					>
						Accéder au réseau social
					</Link>
					<Link to="/login" className="flex items-center">
						<ChatBubbleLeftRightIcon className=" h-8 pl-3 text-gray-700 " />
					</Link>
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<img className="h-16 w-auto" src={logo} alt="give" />
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className="py-6">
								<Link
									to="/login"
									className="text-md font-semibold  text-gray-100"
								>
									Accéder au réseau social{" "}
									<span aria-hidden="true">&rarr;</span>
								</Link>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
