import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Charles Darwin", number: '040-123456'}]);
  const [newName, setNewName] = useState("new name....");
  const [newNumber, setNewNumber] = useState("phone number....");

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

  return (
    <>
      <h2>Phonebook</h2>
      {/* ======ADD PERSON FORM=======*/}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* ===========NUMBERS===========*/}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </>
  );
}

export default App;
