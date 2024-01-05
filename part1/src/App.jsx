import { useState } from "react";

const Button = ({ handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);

const StatLine = ({ label, value }) => (
  <tr>
    <td>{label} </td>
    <td>{value} </td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  const getAverage = () => {
    return good + (bad * -1) / (good + neutral + bad);
  };

  const getPositive = () => {
    return (good / (good + neutral + bad)) * 100 + "%";
  };

  if (good + bad + neutral === 0) {
    return <div>No feedback yet</div>;
  }
  return (
    <table>
      <tbody>
        <StatLine label="Good" value={good} />
        <StatLine label="Neutral" value={neutral} />
        <StatLine label="Bad" value={bad} />
        <StatLine label="average" value={getAverage()} />
        <StatLine label="positvie" value={getPositive()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)}>Good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>Bad</Button>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
