async function ApiRequest(
	method,
	url,
	headers = {},
	body = {},
	needAuth = false
) {
	// Initialize options
	let options = {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
	};

	// Check if the user needs to be authenticated
	if (needAuth) {
		let token = localStorage.getItem("token");

		if (!token) {
			window.location.replace("/");
			throw new Error("No authentication token found");
		}

		options.headers["Authorization"] = `Bearer ${token}`;
	}

	// If the method is not GET, set the options to the headers and body
	if (method !== "GET") {
		options.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, options);

		// Check if response is ok
		if (!response.ok) {
			throw new Error(`HTTP error, status = ${response.status}`);
		}

		let data;
		if (response.headers.get("content-type")?.includes("application/json")) {
			data = await response.json();
		} else {
			data = await response.text();
		}

		return {
			data: data,
			status: response.status,
		};
	} catch (error) {
		console.error(`Request failed: ${error.message}`);
		return {
			data: null,
			status: 500,
			error: error.message,
		};
	}
}

export default ApiRequest;
