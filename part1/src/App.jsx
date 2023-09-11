const Hello = (props) => {
  console.log(props);
  return [
    <p>
      Hello {props.name}, you are {props.age} years old
    </p>,
  ];
};

const Footer = () => {
  return (
    <>
      Greeting app created by{" "}
      <a href="https://github.com/stephen-lakes">stephen</a>
    </>
  );
};
const App = () => {
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
    "Peter",
    "Maya",
  ];

  return (
    <div>
      <p>A paragraph</p>
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>
      <Hello name="Emmanuel" />
      <Hello name="Toyo" />
      <Footer />
    </div>
  );
};

export default App;
