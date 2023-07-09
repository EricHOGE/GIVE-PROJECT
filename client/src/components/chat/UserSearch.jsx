import React, { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Filter from "./Filter";

export default function UserSearch({
	filter,
	setFilter,
	searchText,
	onSearchChange,
}) {
	const [showFilter, setShowFilter] = useState(false);
	return (
		<>
			<div className="flex mx-3 my-4">
				<div className="relative w-full text-gray-600">
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeidth="2"
							viewBox="0 0 24 24"
							className="w-6 h-6 text-gray-300"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</span>
					<input
						type="search"
						className="block w-full px-10 py-2 bg-gray-100 rounded outline-none focus:border-secondary"
						name="search"
						placeholder="Rechercher un utilisateur"
						required
						value={searchText}
						onChange={(e) => onSearchChange(e.target.value)}
					/>

					<span className="absolute inset-y-0 right-0 flex items-center pr-2">
						<FunnelIcon
							className="h-5 w-5 text-gray-400 cursor-pointer"
							aria-hidden="true"
							onClick={() => setShowFilter(!showFilter)}
						/>
					</span>
				</div>
				{filter?.length > 0 && (
					<button
						type="button"
						className="py-1 px-2 text-sm text-gray-100/50"
						onClick={() => {
							setFilter([]);
							onSearchChange("");
						}}
					>
						Supprimer les filtres
					</button>
				)}
			</div>
			{showFilter && (
				<Filter
					filter={filter}
					setFilter={setFilter}
					showFilter={showFilter}
					setShowFilter={setShowFilter}
				/>
			)}
		</>
	);
}
