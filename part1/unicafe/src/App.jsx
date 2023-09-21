import { useState } from "react";

const Statisitcs = (props) => {
  const { good, neutral, bad } = props;

  return (
    <div>
      <h1>statisitcs</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>
        average {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
      </p>
      <p>positive {(good / (good + neutral + bad)) * 100} %</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(1);

  return (
    <div>
      <h1>give feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      <Statisitcs good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
