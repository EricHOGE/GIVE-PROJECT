import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

// Liste des filtres disponibles
const filtersList = [
	{
		name: "En attente de greffe",
		current: false,
		options: [
			{ value: "oui", checked: false },
			{ value: "non", checked: false },
		],
	},
	{
		name: "Type de greffe",
		current: false,
		options: [
			{ value: "Coeur", checked: false },
			{ value: "foie", checked: false },
			{ value: "poumon", checked: false },
			{ value: "rein", checked: false },
			{ value: "pancréas", checked: false },
			{ value: "intestin", checked: false },
		],
	},
];

export default function FilterBar({
	showFilter,
	setShowFilter,
	filter,
	setFilter,
}) {
	// Fonction pour ajouter une nouvelle valeur de filtre
	function addNewFilterValue(category, value) {
		// Création d'un nouveau filtre avec la valeur du filtre existant
		let newFilter = [...filter];
		// Vérifie si la catégorie existe déjà
		let index = newFilter.findIndex(
			(element) => element.name === category.toLowerCase()
		);
		// Si la catégorie n'existe pas, la créer
		if (index === -1) {
			newFilter.push({ name: category.toLowerCase(), value: [value] });
		} else {
			// Si la catégorie existe, vérifie si la valeur existe
			let indexValue = newFilter[index].value.findIndex(
				(element) => element === value
			);
			// Si la valeur n'existe pas, l'ajoute
			if (indexValue === -1) {
				newFilter[index].value.push(value);
			} else {
				// Si la valeur existe, la supprime
				newFilter[index].value.splice(indexValue, 1);
				// Si la catégorie est vide, la supprime
				if (newFilter[index].value.length === 0) {
					newFilter.splice(index, 1);
				}
			}
		}
		// Définir le nouveau filtre
		setFilter(newFilter);
	}

	// mettre à jour les options de filtre
	useEffect(() => {
		filtersList.forEach((element) => {
			// Vérifie si la catégorie existe dans le filtre
			let index = filter.findIndex(
				(filterElement) => filterElement.name === element.name.toLowerCase()
			);
			// Si la catégorie existe, définir la valeur actuelle à true
			if (index !== -1) {
				element.current = true;
				// Vérifie si les options existent dans le filtre
				element.options.forEach((option) => {
					let indexValue = filter[index].value.findIndex(
						(filterValue) => filterValue === option.value
					);
					// Si l'option existe, définir la valeur vérifiée à true
					option.checked = indexValue !== -1;
				});
			} else {
				// Si la catégorie n'existe pas, définir la valeur actuelle à false
				element.current = false;
				// Définir toutes les valeurs vérifiées à false
				element.options.forEach((option) => {
					option.checked = false;
				});
			}
		});
	}, []);

	return (
		<Transition.Root show={showFilter} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setShowFilter}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-700"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-700"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-700 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-700 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
									<div className="flex h-full flex-col overflow-y-scroll bg-dark py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-base font-semibold leading-6 text-gray-100">
													Rechercher des utilisateurs :
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-dark text-gray-100 hover:text-gray-500 outline-none"
														onClick={() => setShowFilter(false)}
													>
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
											{filtersList.map((filterElement) => (
												<Disclosure
													as="div"
													key={filterElement.name}
													className="border-t border-gray-700"
												>
													{({ open }) => (
														<>
															<h3>
																<Disclosure.Button
																	className={`flex w-full items-center justify-between px-2 py-3 text-gray-100 hover:bg-light ${
																		open && "bg-light"
																	}`}
																	onClick={() => {}}
																>
																	<span className="font-medium text-gray-100">
																		{filterElement.name}
																	</span>
																	<span className="ml-6 flex items-center">
																		{open ? (
																			<MinusIcon
																				className="h-5 w-5"
																				aria-hidden="true"
																			/>
																		) : (
																			<PlusIcon
																				className="h-5 w-5"
																				aria-hidden="true"
																			/>
																		)}
																	</span>
																</Disclosure.Button>
															</h3>
															<Disclosure.Panel className="pl-4 pt-2">
																{filterElement.options.map(
																	(option, optionIdx) => (
																		<div
																			key={option.value}
																			className="flex items-center"
																		>
																			<input
																				id={`filterElement-${filterElement.id}-${optionIdx}`}
																				name={`${filterElement.id}[]`}
																				defaultValue={option.value}
																				type="checkbox"
																				defaultChecked={option.checked}
																				className="h-4 w-4 rounded border-gray-100 accent-primary"
																				onChange={() =>
																					addNewFilterValue(
																						filterElement.name,
																						option.value
																					)
																				}
																			/>
																			<label
																				htmlFor={`filterElement-${filterElement.id}-${optionIdx}`}
																				className="ml-3 min-w-0 flex-1 text-gray-100"
																			>
																				{option.value}
																			</label>
																		</div>
																	)
																)}
															</Disclosure.Panel>
														</>
													)}
												</Disclosure>
											))}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
