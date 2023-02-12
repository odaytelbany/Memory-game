import React from 'react'
import './SingleCard.css'
function SingleCard({card, handleChoice, fliped, disabled}) {
  const clickHandler = () => {
    if (!disabled){
      return handleChoice(card)
    }
  }
  return (
    <div className='card'>
        <div className={fliped ? "fliped" : ""}>
            <img className='front' src={card.src} alt="front" />
            <img className='back' src="/img/cover.png" alt="back" onClick={clickHandler}/>
        </div>
    </div>
  )
}

export default SingleCard