const BASE_URL = `https://api.coinpaprika.com/v1`;
const CRYPTO_COMPARE_HIST_URL = `https://min-api.cryptocompare.com/data/v2/histoday?`;
const CRYPTO_COMPARE_PRICE_URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD`;

const NICO_API = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;

export function fetchCryptos() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCryptoInfo(cryptoId: string) {
	return fetch(`${BASE_URL}/coins/${cryptoId}`).then((response) =>
		response.json()
	);
}

export function fetchCryptoTickers(cryptoId: string) {
	return fetch(`${BASE_URL}/tickers/${cryptoId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinHistory(cryptoSymbol: string) {
	//const endDate = Math.floor(Date.now() / 1000);
	//const startDate = endDate - 60 * 60 * 24 * 7; //one week ago
	//console.log("endDate: ", endDate, "startDate: ", startDate);
	const limit = 20;
	return fetch(
		`${CRYPTO_COMPARE_HIST_URL}fsym=${cryptoSymbol}&tsym=USD&limit=${limit}`
	).then((response) => response.json());
}

export function fetchAllCoinPrice(cryptoSymbols: string | undefined) {
	return fetch(
		`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=USD`
	).then((response) => response.json());
}

//`${CRYPTO_COMPARE_URL}/?fsym=${cryptoSymbol}&tsym=USD&limit=20`
