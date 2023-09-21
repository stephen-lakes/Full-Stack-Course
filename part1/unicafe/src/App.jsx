import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = () => {
  return (
    <div>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  return (
    <div>
      <h1>statistics </h1>
      {good || neutral || bad ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine
              text="average"
              value={
                (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
              }
            />
            <StatisticLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100 + " %"}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(5);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
