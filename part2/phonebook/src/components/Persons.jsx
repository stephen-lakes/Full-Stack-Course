const Persons = ({ persons, keyword }) => {
  return (
    <>
      {keyword
        ? persons
            .filter(
              (person) => person.name.toLowerCase() === keyword.toLowerCase()
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};

export default Persons;
