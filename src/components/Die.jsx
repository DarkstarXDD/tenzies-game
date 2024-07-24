export default function Die(props) {
  return (
    <button
      onClick={() => props.holdDice(props.id)}
      className={`${props.isHeld ? "die is-held" : "die"}`}
    >
      {props.value}
    </button>
  )
}
