import axios from "axios"

export const fetchSelectedPrice = async (coin, date) => {
	const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date.split("-").reverse().join("-")}`)
	const data = await response.data.market_data.current_price.usd
	return data
}

export const fetchCurrentPrice = async (coin) => {
	const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
	const data = await (Object.values(response.data)[0].usd)
	return data
}