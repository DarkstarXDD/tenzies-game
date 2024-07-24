import React from "react"
import { nanoid } from "nanoid"
import Die from "./components/Die"

export default function App() {
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

  const [dice, setDice] = React.useState(getRandomDice)

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld)
    const isAllSameValue = dice.every((die) => die.value === dice[0].value)
    if (isAllHeld && isAllSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function handleRollClick() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie()
      })
    )
  }

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

      <div className="die-group">{diceElements}</div>
      <button onClick={handleRollClick} className="btn__roll">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
