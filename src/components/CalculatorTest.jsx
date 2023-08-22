import { useState } from "react"

import { fetchSelectedPrice, fetchCurrentPrice } from "../services/fetchDataFromCoingecko"

import Modal from './Modal'

const  CalculatorTest = () => {
  const [coin, setCoin] = useState('')
  const [date, setDate] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')

  const [showModal, setShowModal] = useState(false)

  const [selectedPrice, setSelectedPrice] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)

  const [profitResult, setProfitResult] = useState(null)
  const [lossResult, setLossResult] = useState(null)

  const calculated = async (event) => {
    event.preventDefault()
  
    setShowModal(true)
  
    if (!coin || !date || !investmentAmount) {
      return
    }
  
    try {
      const selectedPriceData = await fetchSelectedPrice(coin, date)
      setSelectedPrice(selectedPriceData)
  
      const currentPriceData = await fetchCurrentPrice(coin)
      setCurrentPrice(currentPriceData)
  
      const coinAmount = investmentAmount / selectedPriceData
      const difference = coinAmount * currentPriceData
  
      if (difference > investmentAmount) {
        setProfitResult(difference)
        setLossResult(null)
        console.log(profitResult); 
      } else if (difference < investmentAmount) {
        setLossResult(investmentAmount - difference)
        setProfitResult(null)
      } else {
        setLossResult(null)
        setProfitResult(null)
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  return (
    <div className="wrapper">
      {
        showModal ? 

        <Modal
          setShowModal={setShowModal}
          profitResult={profitResult}
          lossResult={lossResult}
        />

        :
        
        <form className="form">
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

export default CalculatorTest