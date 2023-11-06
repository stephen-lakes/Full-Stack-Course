import { useEffect, useState } from "react";
import axios from 'axios';

const Filter = ({ keyword, handleKeywordChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={keyword} onChange={handleKeywordChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

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

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("new name....");
  const [newNumber, setNewNumber] = useState("phone number....");
  const [keyword, setKeyword] = useState("");

  const hook = () => {
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newNumber };

    for (const key in persons) {
      if (JSON.stringify(persons[key]) === JSON.stringify(newPersonObject)) {
        alert(`${newName} is already added to the phonebook`);
        return;
      }
    }
    setPersons(persons.concat(newPersonObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>

      {/* ======SEARCH FIELD=======*/}
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange} />

      {/* ======ADD PERSON FORM=======*/}
      <h3>Add a new </h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      {/* ===========NUMBERS===========*/}
      <h3>Numbers</h3>
      <Persons keyword={keyword} persons={persons} />
    </>
  );
}

export default App;
