export default function Avatar({ userId, pseudo, online }) {
	const colors = [
		"bg-blue-300",
		"bg-green-300",
		"bg-purple-300",
		"bg-red-300",
		"bg-teal-300",
		"bg-yellow-300",
		"bg-pink-300",
	];
	const userIdBase10 = parseInt(userId, 16);
	const colorIndex = userIdBase10 % colors.length;
	const color = colors[colorIndex];
	const firsLetterPseudo = pseudo ? pseudo[0] : "";

	return (
		<div
			className={
				"w-10 h-10 relative rounded-full flex items-center justify-center " +
				color
			}
		>
			<div className="text-center font-bold opacity-70">{firsLetterPseudo}</div>
			{online && (
				<div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0 border-2 border-white"></div>
			)}
			{!online && (
				<div className="absolute w-3 h-3 bg-gray-400 rounded-full bottom-0 right-0 border-2 border-white"></div>
			)}
		</div>
	);
}
