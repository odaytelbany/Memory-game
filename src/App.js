import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css'
  const cardsImages = [
    {src: "/img/helmet-1.png", matched: false},
    {src: "/img/potion-1.png", matched: false},
    {src: "/img/ring-1.png", matched: false},
    {src: "/img/scroll-1.png", matched: false},
    {src: "/img/shield-1.png", matched: false},
    {src: "/img/sword-1.png", matched: false}
  ]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // const [win, setWin] = useState(false);

  // shuffle
  const shuffle = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card,id: Math.random()}))
    setCards(shuffledCards);
    setTurns(0);
  }
  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }
  // Compare selected two cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src){
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        setTimeout(() => {resetTurn()},1000);
      }else{
        setTimeout(() => {resetTurn()},1000);
      }
    }
  }, [choiceOne, choiceTwo])
  // Reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false)
    setTurns(prev => prev + 1);
  }

  // automatic new game
  useEffect(() => {
    shuffle()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="cards">
        {
          cards.map((card) => (
            <SingleCard 
               key={card.id}
               card={card}
               handleChoice = {handleChoice}
               fliped={card === choiceOne || card === choiceTwo || card.matched}
               disabled = {disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App