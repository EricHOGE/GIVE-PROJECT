import Avatar from "./Avatar";

export default function Contact({ id, onClick, pseudo, selected, online }) {
	return (
		<div
			onClick={() => onClick(id)}
			className={
				"relative flex items-center gap-6 transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none" +
				(selected ? " bg-gray-100" : "")
			}
			key={id}
		>
			{selected && (
				<div
					style={{ position: "absolute", left: 0 }}
					className="w-1 bg-gray-300 h-14 rounded-r-md"
				></div>
			)}
			<div className="flex gap-2 pl-4 py-2 items-center">
				<Avatar online={online} pseudo={pseudo} userId={id} />
				<span className="text-gray-800">{pseudo}</span>
			</div>
		</div>
	);
}
