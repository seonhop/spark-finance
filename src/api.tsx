export function fetchCryptos() {
	return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
		response.json()
	);
}
