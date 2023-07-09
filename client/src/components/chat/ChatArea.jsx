export default function ChatArea({
	selectedUserId,
	messages,
	user,
	messagesEndRef,
}) {
	return (
		<div className="relative w-full p-6 overflow-y-auto h-[40rem]">
			{!selectedUserId && (
				<div className="flex h-full items-center justify-center ">
					<div className="text-gray-300 text-lg">
						&larr; Cliquer sur un utilisateur pour afficher la conversation
					</div>
				</div>
			)}

			{!!selectedUserId && (
				<div className="relative h-full">
					<div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
						{messages.map((message, index) => (
							<div
								key={index}
								className={
									message.sender === user._id ? "text-right" : "text-left"
								}
							>
								<div
									className={
										"text-left inline-block p-2 my-2 rounded-md " +
										(message.sender === user._id
											? "bg-secondary text-white"
											: "bg-gray-200")
									}
								>
									{message.text}
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>
			)}
		</div>
	);
}
