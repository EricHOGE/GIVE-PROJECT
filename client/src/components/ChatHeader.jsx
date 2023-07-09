import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";

const navigation = [
	{ name: "Accueil", to: "/", current: true },
	{ name: "Témoignages", to: "/temoignages", current: false },
	{ name: "Actualités", to: "/actu", current: false },
];
const userNavigation = [
	{ name: "Mon profil", to: "/profil", current: false },
	{ name: "Me déconnecter", to: "/", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ChatHeader() {
	const { user, logout } = useContext(AuthContext);
	const actualPath = useLocation().pathname;
	navigation.map((item) => {
		item.current = actualPath === item.to;
	});
	userNavigation.map((item) => {
		item.current = actualPath === item.to;
	});

	return (
		<>
			{/* Lorsque le menu mobile est ouvert, ajoute la classe `overflow-hidden` à l'élément `body` pour éviter les barres de défilement doubles */}
			<Popover
				as="header"
				className={({ open }) =>
					classNames(
						open ? "fixed inset-0 z-40 overflow-y-auto" : "",
						"bg-white shadow-sm lg:static lg:overflow-y-visible"
					)
				}
			>
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
							<div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
								<div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
									<div className="flex flex-shrink-0 items-center">
										<a href="#">
											<img className="h-16 w-auto" src={logo} alt="give" />
										</a>
									</div>
								</div>
								<div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
									{/* Bouton du menu mobile */}
									<Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
										<span className="sr-only">Open menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Popover.Button>
								</div>
								{/**********************************  Partie du menu pour les écrans larges ********************************/}
								<div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-10">
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
									{/* Icone notifications écrans larges */}
									<a
										href="#"
										className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</a>

									{/* Menu déroulant du profil */}
									<Menu as="div" className="relative ml-5 flex-shrink-0">
										<div>
											<Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
												<span className="sr-only">Open user menu</span>
												<Avatar
													userId={user?._id}
													pseudo={user?.pseudo}
													online={true}
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												{userNavigation.map((item) => (
													<Menu.Item key={item.name}>
														{({ active }) => (
															<a
																href={item.href}
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
																onClick={
																	item.name === "Me déconnecter"
																		? () => logout()
																		: null
																}
															>
																{item.name}
															</a>
														)}
													</Menu.Item>
												))}
											</Menu.Items>
										</Transition>
									</Menu>

									{/* Bouton publier un témoignage */}
									<a
										href="#"
										className="ml-6 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
									>
										Publier un témoignage
									</a>
								</div>
							</div>
						</div>

						{/**********************************  Partie du menu pour les écrans mobiles ********************************/}
						<Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
							{/* Navigation page */}
							<div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										aria-current={item.current ? "page" : undefined}
										className={classNames(
											item.current
												? "bg-gray-100 text-gray-900"
												: "hover:bg-gray-50",
											"block rounded-md py-2 px-3 text-base font-medium"
										)}
									>
										{item.name}
									</Link>
								))}
							</div>

							{/* Informations utilisateur */}
							<div className="border-t border-gray-200 pb-3 pt-4">
								<div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
									<div className="flex-shrink-0">
										<Avatar
											userId={user?._id}
											pseudo={user?.pseudo}
											online={true}
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-gray-800">
											{user?.firstname} {user?.lastname}
										</div>
										<div className="text-sm font-medium text-gray-500">
											{user?.email}
										</div>
									</div>
									<button
										type="button"
										className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
									{userNavigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
											onClick={
												item.name === "Me déconnecter" ? () => logout() : null
											}
										>
											{item.name}
										</a>
									))}
								</div>
							</div>
						</Popover.Panel>
					</>
				)}
			</Popover>
		</>
	);
}
