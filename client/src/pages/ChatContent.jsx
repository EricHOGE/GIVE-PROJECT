import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";
import { uniqBy } from "lodash";
import apiRequest from "../lib/apiRequest";
import Contact from "../components/Contact";

export default function ChatContent() {
	const [ws, setWs] = useState(null);
	const [onlinePeople, setOnlinePeople] = useState({});
	const [offlinePeople, setOfflinePeople] = useState({});
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [newMessageText, setNewMessageText] = useState("");
	const [messages, setMessages] = useState([]);
	const [searchText, setSearchText] = useState("");
	const { user } = useContext(AuthContext);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		connectToWs();
	}, []);

	function connectToWs() {
		const token = localStorage.getItem("token");
		const ws = new WebSocket(`ws://localhost:8000/chat?token=${token}`);
		setWs(ws);
		ws.addEventListener("message", handleMessage);
		ws.addEventListener("close", () => {
			setTimeout(() => {
				connectToWs();
			}, 1000);
		});
	}

	function showOnlinePeople(peopleArray) {
		const people = {};
		peopleArray.forEach(({ id, pseudo }) => {
			people[id] = pseudo;
		});
		setOnlinePeople(people);
	}

	function handleMessage(ev) {
		const messageData = JSON.parse(ev.data);
		if ("online" in messageData) {
			showOnlinePeople(messageData.online);
		} else if ("text" in messageData) {
			setMessages((prev) => [...prev, { ...messageData }]);
		}
	}

	function sendMessage(e) {
		e.preventDefault();
		if (!user) {
			console.error("No user is logged in");
			return;
		}
		ws.send(
			JSON.stringify({
				recipient: selectedUserId,
				text: newMessageText,
			})
		);
		setNewMessageText("");
		setMessages((prev) => [
			...prev,
			{
				text: newMessageText,
				sender: user._id,
				recipient: selectedUserId,
				_id: Date.now(),
			},
		]);
	}

	useEffect(() => {
		const div = messagesEndRef.current;
		if (div) {
			div.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [messages]);

	// Récupère les utilisateurs offline
	useEffect(() => {
		const fetchUsers = async () => {
			if (!user) {
				return;
			}
			try {
				const response = await apiRequest("GET", "/getusers", {}, {}, true);
				console.log(" tous les users => ", response.data);
				if (response.status === 200) {
					const offlinePeopleArr = response.data
						.filter((p) => p._id !== user._id)
						.filter((p) => !Object.keys(onlinePeople).includes(p._id));
					const offlinePeople = {};
					offlinePeopleArr.forEach((p) => {
						offlinePeople[p._id] = p;
					});
					console.log("offlinePeople => ", offlinePeople);
					setOfflinePeople(offlinePeople);
				} else {
					console.log("error");
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchUsers();
	}, [onlinePeople, user]);

	useEffect(() => {
		const fetchData = async () => {
			if (selectedUserId) {
				try {
					const response = await apiRequest(
						"GET",
						`/messages/${selectedUserId}`,
						{},
						{},
						true
					);

					if (response.status === 200) {
						setMessages(response.data);
					} else {
						console.log("error");
					}
				} catch (err) {
					console.error(err);
				}
			}
		};

		fetchData();
	}, [selectedUserId]);

	const onlinePeopleExclActualUser = user ? { ...onlinePeople } : {};
	if (user) {
		delete onlinePeopleExclActualUser[user._id];
	}

	const messagesWithoutDupes = uniqBy(messages, "_id");

	return (
		<div className="container mx-auto">
			<div className="min-w-full border rounded lg:grid lg:grid-cols-3">
				{/* Colonne de gauche "users"*/}
				<div className="border-r border-gray-300 lg:col-span-1">
					{/* Header "Recherche" */}
					<div className="mx-3 my-4">
						<div className="relative text-gray-600">
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
								className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
								name="search"
								placeholder="Rechercher un utilisateur"
								required
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
					</div>

					{/* Liste des utilisateurs */}
					<div className="overflow-auto h-[32rem]">
						<div className="flex my-2 mb-2 ml-6 text-lg font-bold text-gray-600 gap-2">
							<ChatBubbleLeftRightIcon className="block h-6 w-6" />
							<h2>Chats</h2>
						</div>

						<div className="overflow-auto h-[32rem]">
							{Object.keys(onlinePeopleExclActualUser).map((id) => (
								<Contact
									key={id}
									id={id}
									online={true}
									pseudo={onlinePeopleExclActualUser[id]}
									onClick={() => setSelectedUserId(id)}
									selected={selectedUserId === id}
								/>
							))}
							{Object.keys(offlinePeople).map((id) => (
								<Contact
									key={id}
									id={id}
									online={false}
									pseudo={offlinePeople[id].pseudo}
									onClick={() => setSelectedUserId(id)}
									selected={selectedUserId === id}
								/>
							))}
						</div>
					</div>
				</div>
				{/* Colonne de droite "chat" */}
				<div className="hidden lg:col-span-2 lg:block">
					<div className="w-full">
						{/* Discussion */}
						<div className="relative w-full p-6 overflow-y-auto h-[40rem]">
							{!selectedUserId && (
								<div className="flex h-full items-center justify-center ">
									<div className="text-gray-300 text-lg">
										&larr; Cliquer sur un utilisateur pour afficher la
										conversation
									</div>
								</div>
							)}

							{!!selectedUserId && (
								<div className="relative h-full">
									<div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
										{messagesWithoutDupes.map((message, index) => (
											<div
												key={index}
												className={
													message.sender === user._id
														? "text-right"
														: "text-left"
												}
											>
												<div
													className={
														"text-left inline-block p-2 my-2 rounded-md " +
														(message.sender === user._id
															? "bg-blue-500 text-white"
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
						{/* Ecrire un nouveau message */}
						{!!selectedUserId && (
							<form
								className="flex items-center justify-between w-full p-3 border-t border-gray-300"
								onSubmit={sendMessage}
							>
								{/* Insérer un emoji */}
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
								{/* Ajouter pièce jointe */}
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
										/>
									</svg>
								</button>

								<input
									type="text"
									value={newMessageText}
									onChange={(e) => setNewMessageText(e.target.value)}
									placeholder="Message"
									className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
									name="message"
								/>
								{/* Bouton vocal */}
								{/* <button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									/>
								</svg>
							</button> */}
								<button type="submit">
									<svg
										className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
									</svg>
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

{
	/* Header "Personne à qui on parle" */
}
{
	/* <div className="relative flex items-center p-3 border-b border-gray-300">
							<img
								className="object-cover w-10 h-10 rounded-full"
								src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
								alt="username"
							/>
							<span className="block ml-2 font-bold text-gray-600">Emma</span>
							<span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
						</div> */
}

{
	/* <ul className="space-y-2">
								<li className="flex justify-start">
									<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
										<span className="block">Hi</span>
									</div>
								</li>
								<li className="flex justify-end">
									<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
										<span className="block">Hiiii</span>
									</div>
								</li>
								<li className="flex justify-end">
									<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
										<span className="block">how are you?</span>
									</div>
								</li>
								<li className="flex justify-start">
									<div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
										<span className="block">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										</span>
									</div>
								</li>
							</ul> */
}
