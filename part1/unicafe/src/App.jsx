import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  return (
    <div>
      <h1>statistics </h1>
      {good || neutral  || bad  ? (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {good + neutral + bad}</p>
          <p>
            average{" "}
            {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
          </p>
          <p>positive {(good / (good + neutral + bad)) * 100} %</p>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
