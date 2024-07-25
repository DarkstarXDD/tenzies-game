import Die1 from "../assets/images/die-1.svg"
import Die2 from "../assets/images/die-2.svg"
import Die3 from "../assets/images/die-3.svg"
import Die4 from "../assets/images/die-4.svg"
import Die5 from "../assets/images/die-5.svg"
import Die6 from "../assets/images/die-6.svg"

export default function Die(props) {
  const dieImages = [Die1, Die2, Die3, Die4, Die5, Die6]
  return (
    <button
      onClick={() => props.holdDice(props.id)}
      className={`${props.isHeld ? "die is-held" : "die"}`}
    >
      <img src={dieImages[props.value - 1]} alt="" />
    </button>
  )
}
