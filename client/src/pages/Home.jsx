import React from "react";
import mockuptest from "../assets/mockuptest.jpg";
import Background from "../components/Background";

export default function Home() {
	return (
		<div className="relative isolate bg-white py-20">
			<Background />
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<h2 className="text-3xl text-center font-bold tracking-tight text-gray-600 sm:text-4xl">
					Vous vous sentez seul dans l'attente d'une greffe d'organe ?
				</h2>
				<h2 className="text-3xl text-center font-bold tracking-tight text-gray-600 sm:text-4xl mt-8">
					Vous cherchez des informations et du soutien ?
				</h2>
				<div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
					<div className="w-full lg:max-w-lg lg:flex-auto">
						<img
							src={mockuptest}
							alt=""
							className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
						/>
					</div>
					<div className="w-full lg:max-w-xl lg:flex-auto text-justify">
						<p className="mt-6 text-xl font-bold leading-8 text-gray-600 text-center">
							Brisez l'isolement et rencontrez des personnes qui partagent votre
							expérience.
						</p>
						<p className="mt-6 text-xl leading-8 text-gray-600">
							Rejoignez Give.com, le réseau social dédié à la greffe d'organes,
							et échangez avec des membres de la communauté qui vivent votre
							quotidien et comprennent vos enjeux.
						</p>
						<p className="mt-10 text-xl leading-8 text-gray-600 text-center">
							Partagez vos expériences, vos doutes, vos victoires et vos
							questions.
						</p>

						<p className="mt-6 text-md text-gray-400 leading-8">
							Que vous soyez en attente de greffe, que vous ayez déjà subi une
							transplantation, ou que vous souhaitiez simplement vous informer
							et discuter, Give.com est votre espace de partage et d'entraide.
						</p>
						<div className="mt-8 flex border-t border-gray-100 pt-8">
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-secondary"
							>
								Accéder au réseau social <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
