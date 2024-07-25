export default function Score(props) {
  function formatTime(time) {
    const date = new Date(time * 1000)
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return (
    <div className="score">
      <p className="time">Time: {formatTime(props.time)} </p>
      <p className="rolls">Rolls: {props.rolls}</p>
    </div>
  )
}
