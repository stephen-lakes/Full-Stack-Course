import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Charles Darwin" }]);
  const [newName, setNewName] = useState("new name....");

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = { name: newName };

    for (const key in persons) {
      if (JSON.stringify(persons[key]) === JSON.stringify(newPersonObject)) {
        alert(`${newName} is already added to the phinebook`);
        return;
      }
    }
    setPersons(persons.concat(newPersonObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
          <button type="submit">add</button>
        </div>
      </form>

      {/* ===========NUMBERS===========*/}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </>
  );
}

export default App;
