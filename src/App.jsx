import React from "react"
import Die from "./components/Die"

export default function App() {
  function getRandomNumbers() {
    let randomNumbers = []
    let randomNumber = 0

    for (let i = 0; i < 10; i++) {
      randomNumber = Math.ceil(Math.random() * 6)
      randomNumbers.push(randomNumber)
    }
    return randomNumbers
  }

  const [dieNumbers, setDieNumbers] = React.useState(getRandomNumbers)

  const dice = dieNumbers.map((dieNumber) => <Die value={dieNumber} />)

  function handleRollClick() {
    setDieNumbers(getRandomNumbers())
  }

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="die-group">{dice}</div>
      <button onClick={handleRollClick} className="btn__roll">
        Roll
      </button>
    </main>
  )
}
