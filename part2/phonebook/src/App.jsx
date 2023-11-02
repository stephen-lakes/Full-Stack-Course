import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Charles Darwin", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("new name....");
  const [newNumber, setNewNumber] = useState("phone number....");
  const [keyword, setKeyword] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newNumber };

    for (const key in persons) {
      if (JSON.stringify(persons[key]) === JSON.stringify(newPersonObject)) {
        alert(`${newName} is already added to the phinebook`);
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

      <div>
        filter shown with:{" "}
        <input value={keyword} onChange={handleKeywordChange} />
      </div>
      <br /><br />

      {/* ======ADD PERSON FORM=======*/}
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

      {/* ===========NUMBERS===========*/}
      <h2>Numbers</h2>
      {keyword
        ? persons
            .filter((person) => person.name === keyword)
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
}

export default App;
