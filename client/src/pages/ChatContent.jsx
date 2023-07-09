import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { uniqBy } from "lodash";
import apiRequest from "../lib/apiRequest";
import UserSearch from "../components/chat/UserSearch";
import UserList from "../components/chat/UserList";
import ChatArea from "../components/chat/ChatArea";
import MessageInput from "../components/chat/MessageInput";

async function fetchUsers(user, onlinePeople, setOfflinePeople) {
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
}

async function fetchData(selectedUserId, setMessages) {
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
}

export default function ChatContent() {
	const [ws, setWs] = useState(null);
	const [onlinePeople, setOnlinePeople] = useState({});
	const [offlinePeople, setOfflinePeople] = useState({});
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [newMessageText, setNewMessageText] = useState("");
	const [messages, setMessages] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filter, setFilter] = useState([]);
	const { user } = useContext(AuthContext);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		connectToWs();
	}, []);

	function connectToWs() {
		const token = localStorage.getItem("token");

		// Connexion au serveur
		const ws = new WebSocket(`ws://localhost:8000/chat?token=${token}`);
		setWs(ws);

		// Réception des messages
		ws.addEventListener("message", handleMessage);
		// Fermeture de la connexion
		ws.addEventListener("close", () => {
			setTimeout(() => {
				connectToWs();
			}, 1000);
		});
	}

	// Afficher les personnes connectées
	function showOnlinePeople(peopleArray) {
		const people = {};
		peopleArray.forEach(({ id, pseudo }) => {
			people[id] = pseudo;
		});
		setOnlinePeople(people);
	}

	// Afficher les messages
	function handleMessage(ev) {
		const messageData = JSON.parse(ev.data);
		if ("online" in messageData) {
			showOnlinePeople(messageData.online);
		} else if ("text" in messageData) {
			setMessages((prev) => [...prev, { ...messageData }]);
		}
	}

	// Envoyer un message
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

	// Scroll automatiquement vers le bas de la page
	useEffect(() => {
		const div = messagesEndRef.current;
		if (div) {
			div.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [messages]);

	// Récupère les utilisateurs offline
	useEffect(() => {
		fetchUsers(user, onlinePeople, setOfflinePeople);
	}, [onlinePeople, user]);

	// Récupère les messages
	useEffect(() => {
		fetchData(selectedUserId, setMessages);
	}, [selectedUserId]);

	// Supprime l'utilisateur actuel de la liste des utilisateurs en ligne
	const onlinePeopleExclActualUser = user ? { ...onlinePeople } : {};
	if (user) {
		delete onlinePeopleExclActualUser[user._id];
	}

	// Supprime les doublons
	const messagesWithoutDupes = uniqBy(messages, "_id");

	return (
		<div className="container mx-auto">
			<div className="min-w-full border rounded lg:grid lg:grid-cols-3">
				{/* Colonne de gauche "users"*/}
				<div className="border-r border-gray-300 lg:col-span-1">
					{/* Header "Recherche" */}
					<UserSearch
						filter={filter}
						setFilter={setFilter}
						searchText={searchText}
						onSearchChange={setSearchText}
					/>

					{/* Liste des utilisateurs */}
					<UserList
						onlinePeople={onlinePeopleExclActualUser}
						offlinePeople={offlinePeople}
						onUserClick={setSelectedUserId}
						selectedUserId={selectedUserId}
					/>
				</div>
				{/* Colonne de droite "chat" */}
				<div className="hidden lg:col-span-2 lg:block">
					<div className="w-full">
						{/* Discussion */}
						<ChatArea
							selectedUserId={selectedUserId}
							messages={messagesWithoutDupes}
							user={user}
							messagesEndRef={messagesEndRef}
						/>
						{/* Ecrire un nouveau message */}
						{!!selectedUserId && (
							<MessageInput
								newMessageText={newMessageText}
								onNewMessageTextChange={setNewMessageText}
								onSend={sendMessage}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
