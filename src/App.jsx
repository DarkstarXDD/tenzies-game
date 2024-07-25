import React from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Score from "./components/Score"
import Die from "./components/Die"

export default function App() {
  const [isActive, setIsActive] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [rolls, setRolls] = React.useState(0)
  const [dice, setDice] = React.useState(getRandomDice)
  const [tenzies, setTenzies] = React.useState(false)

  function generateNewDie() {
    let randomNumber = Math.ceil(Math.random() * 6)
    return {
      id: nanoid(),
      value: randomNumber,
      isHeld: false,
    }
  }

  function getRandomDice() {
    let randomDice = []
    for (let i = 0; i < 10; i++) {
      randomDice.push(generateNewDie())
    }
    return randomDice
  }

  function holdDice(id) {
    if (!tenzies) {
      setIsActive(true)
    }
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function handleRollClick() {
    if (!tenzies) {
      if (!isActive) {
        setIsActive(true)
      }
      setRolls((prevRoll) => prevRoll + 1)
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTime(0)
      setIsActive(true)
      setRolls(0)
      setTenzies(false)
      setDice(getRandomDice())
    }
  }

  React.useEffect(() => {
    let intervalId

    if (isActive && !tenzies) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isActive, tenzies])

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld)
    const isAllSameValue = dice.every((die) => die.value === dice[0].value)
    if (isAllHeld && isAllSameValue) {
      setTenzies(true)
    }
  }, [dice])

  const diceElements = dice.map((currentDie) => (
    <Die
      key={currentDie.id}
      id={currentDie.id}
      value={currentDie.value}
      isHeld={currentDie.isHeld}
      holdDice={holdDice}
    />
  ))

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <Score rolls={rolls} time={time} />

      <div className="die-group">{diceElements}</div>
      <button onClick={handleRollClick} className="btn__roll">
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti width={window.innerWidth} />}
    </main>
  )
}
