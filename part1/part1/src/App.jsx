import { useState } from 'react'

const Part = (props) => {
  return (
    <div>
      {props.name} {props.exercises}
    </div>
  )
}

const Header = (props) => {
  return (
    <p>
      <h1>{props.title}</h1>
    </p>
  )
}

const Content = (props) => {
  return (
    <p>
      <Part name={props.title} exercises={props.exercises} />
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      <p>Number of exercises {props.total}</p>
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content title={part1} exercises={exercises1} />
      <Content title={part2} exercises={exercises2} />
      <Content title={part3} exercises={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
