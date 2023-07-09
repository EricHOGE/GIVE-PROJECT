import React from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import Contact from "../Contact";

export default function UserList({
	onlinePeople,
	offlinePeople,
	onUserClick,
	selectedUserId,
}) {
	return (
		<div className="overflow-auto h-[32rem]">
			<div className="flex my-2 mb-2 ml-6 text-lg font-bold text-gray-600 gap-2">
				<ChatBubbleLeftRightIcon className="block h-6 w-6" />
				<h2>Chats</h2>
			</div>

			<div className="overflow-auto h-[32rem]">
				{Object.keys(onlinePeople).map((id) => (
					<Contact
						key={id}
						id={id}
						online={true}
						pseudo={onlinePeople[id]}
						onClick={() => onUserClick(id)}
						selected={selectedUserId === id}
					/>
				))}
				{Object.keys(offlinePeople).map((id) => (
					<Contact
						key={id}
						id={id}
						online={false}
						pseudo={offlinePeople[id].pseudo}
						onClick={() => onUserClick(id)}
						selected={selectedUserId === id}
					/>
				))}
			</div>
		</div>
	);
}
