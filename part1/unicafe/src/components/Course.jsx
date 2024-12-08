const Course = ({ name, course }) => {
  const partsList = course.parts.map((p) => {
    return (
      <div key={p.id}>
        {p.name} {p.exercises}
      </div>
    )
  })

  const numExercises = course.parts.reduce((acc, val) => acc + val.exercises, 0)

  return (
    <div>
      <h1>{name}</h1>
      <div>{partsList}</div>
      <div>num exercises: {numExercises}</div>
    </div>
  )
}

export default Course
