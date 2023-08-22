import React from "react";

const Modal = ({ setShowModal, profitResult, lossResult }) => {

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="modal">
    {
      profitResult
      
      ?

      <div>
      <h3>To the moon bitch!
        <br/> Your Profit is:
        <br/> {profitResult}$
      </h3>
      <iframe
        src="https://gifer.com/embed/YQDj"
        width="150"
        height="150"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>

    :

    <div>
        <h3>Go to the factory asshole!
          <br/> Your loss is:
          <br/> {lossResult}$
        </h3>
        <iframe
          src="https://gifer.com/embed/7Emh"
          width="150"
          height="150"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>  
    }            

      <button onClick={closeModal}>one more fomo?</button>
    </div>
  )
}

export default Modal