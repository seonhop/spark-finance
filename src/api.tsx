const BASE_URL = `https://api.coinpaprika.com/v1`;
const CRYPTO_COMPARE_HIST_URL = `https://min-api.cryptocompare.com/data/v2/histoday?`;
const CRYPTO_COMPARE_PRICE_URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD`;

const NICO_API = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;

export function fetchCryptos() {
	console.log(`${BASE_URL}/coins`);
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCryptosFromCoinGecko() {
	return fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`
	).then((response) => response.json());
}

export function fetchCryptoInfo(cryptoId: string) {
	return fetch(
		`https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false`
	).then((response) => response.json());
}

export function fetchCryptoTickers(cryptoId: string) {
	return fetch(`${BASE_URL}/tickers/${cryptoId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinHistory(cryptoId: string, days: number) {
	//const endDate = Math.floor(Date.now() / 1000);
	//const startDate = endDate - 60 * 60 * 24 * 7; //one week ago
	//console.log("endDate: ", endDate, "startDate: ", startDate);
	return fetch(
		`https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc?vs_currency=usd&days=${days}
		`
	).then((response) => response.json());
}

export function fetchAllCoinPrice(cryptoSymbols: string | undefined) {
	const link = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=USD`;
	console.log(link);
	return fetch(
		`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=USD`
	).then((response) => response.json());
}

//`${CRYPTO_COMPARE_URL}/?fsym=${cryptoSymbol}&tsym=USD&limit=20`
