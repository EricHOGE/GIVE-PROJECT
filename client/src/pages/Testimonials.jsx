import Background from "../components/Background";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const featuredTestimonial = {
	body: "Depuis mon opération de greffe de cœur, je vis chaque jour comme un cadeau. Je suis infiniment reconnaissant pour cette deuxième chance et je veux partager mon histoire pour donner de l'espoir à ceux qui en ont besoin.",
	author: {
		name: "AnaPerrin",
		imageUrl:
			"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
	},
};
const testimonials = [
	[
		[
			{
				body: "En attente d'une greffe de rein depuis des mois, chaque jour est un défi. Mais je reste positif. Nous sommes tous des guerriers, chacun à sa manière. Ne perdez jamais espoir.",
				author: {
					pseudo: "Bernard_Du06",
					imageUrl: "",
				},
			},
			{
				body: "J'attends une greffe de pancréas. Ce site m'a aidé à comprendre le processus et à connecter avec d'autres personnes vivant la même expérience. Vous n'êtes jamais seul.",
				author: {
					pseudo: "Emeline38",
					imageUrl:
						"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			},
		],

		[
			{
				body: "S'informer, c'est s'armer. Grâce aux informations obtenues ici, je me sens plus préparé pour ma future greffe de poumon. Merci pour ce précieux soutien.",
				author: {
					pseudo: "Sophie_R",
					imageUrl:
						"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			},
			{
				body: "Je suis un survivant de la greffe de poumon. Chaque respiration est un rappel de ce voyage difficile et gratifiant. Puissions-nous tous respirer facilement et pleinement.",
				author: {
					name: "EstelleM",
					imageUrl: "",
				},
			},
		],
	],
	[
		[
			{
				body: "Je suis un donneur vivant. J'ai donné un de mes reins à mon frère et le voir s'épanouir aujourd'hui est la plus grande récompense. N'ayez pas peur de donner.",
				author: {
					pseudo: "DavidT92",
					imageUrl: "",
				},
			},
			{
				body: "Malgré les défis, malgré la peur, malgré les incertitudes... nous restons forts. La greffe, c'est aussi un voyage de résilience et de courage. Ensemble, nous sommes invincibles.",
				author: {
					pseudo: "BrunoLyon",
					imageUrl:
						"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			},
		],
		[
			{
				body: "Ma greffe de foie a été un succès. La vie après la greffe est pleine d'espoir et de nouvelles opportunités. Ne baissez jamais les bras, votre renaissance est au coin de la rue.",
				author: {
					pseudo: "Thierry_33",
					imageUrl:
						"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
			},
			{
				body: "Mon attente pour une greffe de cornée m'a appris la patience et la gratitude pour les petites choses. Je souhaite à tous ceux qui attendent une greffe, de trouver la paix et la patience nécessaires.",
				author: {
					pseudo: "VincentP",
					imageUrl: "",
				},
			},
			{
				body: "Ma fille est en attente d'une greffe de moelle osseuse. Chaque jour, elle me montre ce que signifie vraiment le courage. Je partage notre histoire pour inspirer d'autres parents dans la même situation.",
				author: {
					pseudo: "MaxGrenoble",
					imageUrl: "",
				},
			},
		],
	],
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Testimonials() {
	return (
		<div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
			<Background />

			{/* Titre et phrase d'accroche */}
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl text-center">
					<h2 className="text-lg font-semibold text-primary">
						Les voix du courage
					</h2>
					<p className="mt-2 text-3xl font-bold  text-gray-700 sm:text-4xl">
						" Témoignages Inspirants de Lutte et d'Espoir "
					</p>
				</div>

				{/* Témoignages */}
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-700 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
					{/* témoignage principal */}
					<figure className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
						<blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-700">
							<p>{`“${featuredTestimonial.body}”`}</p>
						</blockquote>
						<figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
							<img
								className="h-10 w-10 flex-none rounded-full bg-gray-50"
								src={featuredTestimonial.author.imageUrl}
								alt=""
							/>
							<div className="flex-auto">
								<div className="font-semibold">
									{featuredTestimonial.author.name}
								</div>
							</div>
						</figcaption>
					</figure>

					{/* témoignages secondaires */}
					{testimonials.map((columnGroup, columnGroupIdx) => (
						<div
							key={columnGroupIdx}
							className="space-y-8 xl:contents xl:space-y-0"
						>
							{columnGroup.map((column, columnIdx) => (
								<div
									key={columnIdx}
									className={classNames(
										(columnGroupIdx === 0 && columnIdx === 0) ||
											(columnGroupIdx === testimonials.length - 1 &&
												columnIdx === columnGroup.length - 1)
											? "xl:row-span-2"
											: "xl:row-start-1",
										"space-y-8"
									)}
								>
									{column.map((testimonial) => (
										<figure
											key={testimonial.author.pseudo}
											className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
										>
											<blockquote className="text-gray-900">
												<p>{`“${testimonial.body}”`}</p>
											</blockquote>
											<figcaption className="mt-6 flex items-center gap-x-4">
												{testimonial.author.imageUrl ? (
													<img
														className="h-10 w-10 rounded-full bg-gray-50"
														src={testimonial.author.imageUrl}
														alt=""
													/>
												) : (
													<UserCircleIcon className="h-10 w-10 rounded-full bg-gray-50" />
												)}
												<div>
													<div className="font-semibold">
														{testimonial.author.name}
													</div>
												</div>
											</figcaption>
										</figure>
									))}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
