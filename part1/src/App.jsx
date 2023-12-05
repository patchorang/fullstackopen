const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ exercise1, exercise2, exercise3 }) => {
  return (
    <div>
      <Part part={exercise1.part} exercises={exercise1.num} />
      <Part part={exercise2.part} exercises={exercise2.num} />
      <Part part={exercise2.part} exercises={exercise3.num} />
    </div>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        exercise1={{ part: part1, num: exercises1 }}
        exercise2={{ part: part2, num: exercises2 }}
        exercise3={{ part: part3, num: exercises3 }}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
