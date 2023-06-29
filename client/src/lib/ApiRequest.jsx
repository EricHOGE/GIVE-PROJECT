/**
 * Factorized function to fetch data from the API
 * @param method
 * @param url
 * @param headers
 * @param body
 * @param needAuth
 * @returns {Promise<{data: any, status: number}|number|{data: any}>}
 */

export default async function fetchFromApi(
	method,
	url,
	headers = {},
	body = {},
	needAuth = false
) {
	let baseUrl = "http://localhost:8000/api"; //"http://localhost:8000";
	/* Define the options */
	let options = {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
	};

	/* Check if the user needs to be authenticated */
	if (needAuth) {
		let token = localStorage.getItem("token");

		if (!token) {
			window.location.replace("/");
		}

		options.headers["Authorization"] = `Bearer ${token}`;
	}

	// If the method is GET, set the options to the headers
	if (method !== "GET") {
		// If the method is not GET, set the options to the headers and body
		options.body = JSON.stringify(body);
	}

	const response = await fetch(baseUrl + url, options);

	// If the response is greater than 400, return the status
	// Else return the data and the status
	if (response.status >= 400) {
		return response.status;
	} else {
		const data = await response.json();

		return {
			data: data,
			status: response.status,
		};
	}
}
