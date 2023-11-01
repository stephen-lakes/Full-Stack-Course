import { useState } from "react";

function App() {
  const [person, setPerson] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {person.map((person) => (
        <p>{person.name}</p>
      ))}
    </>
  );
}

export default App;
