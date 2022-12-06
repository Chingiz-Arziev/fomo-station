import {useState} from "react";

import axios from "axios";

import Modal from './Modal'

function Calculator() {
  const [coin, setCoin] = useState('')
  const [date, setDate] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')

  const [selectedPrice, setSelectedPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  const [profitResult, setProfitResult] = useState('')
  const [lossResult, setLossResult] = useState('')

  const [showModal, setShowModal] = useState(null)

  const getSelectedPrice = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date.split("-").reverse().join("-")}`)
    const data = await response.data.market_data.current_price.usd
    setSelectedPrice(data)
  }

  const getCurrentPrice = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
    const data = await (Object.values(response.data)[0].usd)
    setCurrentPrice(data)
  }

  const calculated = (e) => {
    e.preventDefault()

    getSelectedPrice().then()
    getCurrentPrice().then()

    if(coin && date && investmentAmount) {
      setShowModal(true)
      const coinAmount = (investmentAmount / selectedPrice)
      const difference = coinAmount * currentPrice

      if(difference > investmentAmount) {
        setProfitResult(difference.toFixed(2))
      }

      if(difference < investmentAmount) {
        setLossResult((investmentAmount - difference).toFixed(2))
      }
    }
  }

  return (
    <div className="wrapper">
      {showModal ?
        <Modal
          setShowModal={setShowModal}
          profitResult={profitResult}
          lossResult={lossResult}
        />

        :

        <form action="" className="form">
          <h1>GET SOME FOMO</h1>
          <input
            onChange={(e) => setCoin(e.target.value)}
            type="text"
            placeholder="bitcoin, ethereum"
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="date"
          />
          <input
            onChange={(e) => setInvestmentAmount(e.target.value)}
            type="number"
            placeholder="Amount in $"
          />
          <button onClick={calculated}>CALCULATE</button>
        </form>
      }
    </div>
  )
}

export default Calculator