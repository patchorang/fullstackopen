const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name}</p>
      <p>{friends[1].name}</p>
    </div>
  )
}

export default App
