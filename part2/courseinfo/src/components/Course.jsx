const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <p>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total parts={parts} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  return <>{parts[0].exercises + parts[1].exercises + parts[2].exercises}</>;
};

const Part = () => {
  return <></>;
};

export default Course;
