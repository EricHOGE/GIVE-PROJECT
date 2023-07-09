import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
	return (
		<>
			<h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-primary mt-16">
				Politique de confidentialité
			</h1>

			<div className="flex flex-col items-center justify-center mt-14">
				<div className="max-w-2xl w-full space-y-8  text-justify">
					<p>
						Bienvenue sur le site "GIVE", votre réseau social dédié à l'entraide
						et au partage. Nous attachons une grande importance à la protection
						de vos données personnelles et nous nous engageons à respecter votre
						vie privée. Cette Politique de Confidentialité explique comment nous
						collectons, utilisons et protégeons vos informations personnelles
						lorsque vous utilisez notre site web.
					</p>
					<h2 className="text-2xl font-bold text-gray-600">
						Collecte des informations
					</h2>
					<p className="text-gray-600">
						Nous collectons des informations lorsque vous vous inscrivez sur
						notre site, lorsque vous vous connectez à votre compte, lorsque vous
						partagez des informations sur votre santé, et également lorsque vous
						visitez notre site. Les informations collectées incluent votre nom,
						votre adresse e-mail, votre date de naissance, et des informations
						relatives à votre santé.
					</p>

					<h2 className="text-2xl font-bold text-gray-600">
						Utilisation des informations
					</h2>
					<p className="text-gray-600">
						Toutes les informations que nous recueillons auprès de vous peuvent
						être utilisées pour :
					</p>
					<ul className="list-disc list-inside text-gray-600">
						<li>
							Personnaliser votre expérience et répondre à vos besoins
							individuels
						</li>
						<li>Fournir un contenu publicitaire personnalisé</li>
						<li>Améliorer notre site web</li>
						<li>
							Améliorer le service client et vos besoins de prise en charge
						</li>
						<li>Vous contacter par e-mail</li>
						<li>Administrer un concours, une promotion, ou une enquête</li>
					</ul>

					<h2 className="text-2xl font-bold text-gray-600">
						Confidentialité du commerce en ligne
					</h2>
					<p className="text-gray-600">
						Nous sommes les seuls propriétaires des informations recueillies sur
						ce site. Vos informations personnelles ne seront pas vendues,
						échangées, transférées, ou données à une autre entreprise pour
						n'importe quelle raison, sans votre consentement, en dehors de ce
						qui est nécessaire pour répondre à une demande et/ou une
						transaction.
					</p>

					<h2 className="text-2xl font-bold text-gray-600">
						Divulgation à des tiers
					</h2>
					<p className="text-gray-600">
						Nous ne vendons, n'échangeons et ne transférons pas vos informations
						personnelles identifiables à des tiers. Cela ne comprend pas les
						tiers de confiance qui nous aident à exploiter notre site web ou à
						mener nos affaires, tant que ces parties conviennent de garder ces
						informations confidentielles.
					</p>

					<h2 className="text-2xl font-bold text-gray-600">
						Protection des informations
					</h2>
					<p className="text-gray-600">
						Nous mettons en œuvre une variété de mesures de sécurité pour
						préserver la sécurité de vos informations personnelles. Nous
						utilisons un cryptage à la pointe de la technologie pour protéger
						les informations sensibles transmises en ligne. Nous protégeons
						également vos informations hors ligne. Seuls les employés qui ont
						besoin d'effectuer un travail spécifique (par exemple, la
						facturation ou le service à la clientèle) ont accès aux informations
						personnelles identifiables. Les ordinateurs et serveurs utilisés
						pour stocker des informations personnelles identifiables sont
						conservés dans un environnement sécurisé.
					</p>

					<h2 className="text-2xl font-bold text-gray-600">Consentement</h2>
					<p className="text-gray-600">
						En utilisant notre site, vous consentez à notre politique de
						confidentialité. Si vous avez des questions concernant cette
						politique de confidentialité, vous pouvez nous contacter à{" "}
						<a href="" className="text-primary hover:underline">
							contact@give.com
						</a>
						.
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center mt-4">
				<Link to="/">
					<button className="px-4 py-2 mt-4 text-lg font-bold text-center text-white bg-gradient-to-tr from-white to-primary hover:bg-gradient-to-r hover:from-primary hover:to-white transition delay-150 rounded-full">
						Fermer la fenêtre
					</button>
				</Link>
			</div>
		</>
	);
}
