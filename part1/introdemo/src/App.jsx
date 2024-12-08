import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Counter = ({ count }) => {
  return <div>{count}</div>
}

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Counter count={counter} />
      <Button onClick={() => setCounter(counter + 1)} text="add" />
      <Button onClick={() => setCounter(counter - 1)} text="minus" />
      <Button onClick={() => setCounter(0)} text="0" />
    </div>
  )
}

export default App
