import { useEffect, useState } from "react";
import axios from "axios";
import phonebookService from "./services/phonebook";
import ExchangeRates from "./components/ExchangeRates";
import Countries from "./components/Countries";

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

const Persons = ({ persons, keyword, deleteContact }) => {
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
              {person.name} {person.number}{" "}
              <button onClick={() => deleteContact(person)}>delete</button>
            </p>
          ))}
    </>
  );
};

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <>
      <div className={`${type === "success" ? "success" : "error"}`}>
        {message}
      </div>
    </>
  );
};

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook app, Department of Computer Science of Helsinki 2022</em>
    </div>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((intialContacts) => setPersons(intialContacts));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObject = { name: newName, number: newNumber };

    for (const key in persons) {
      if (persons[key].name === newPersonObject.name) {
        alert(`${newName} is already added to the phonebook`);

        if (persons[key].number !== newPersonObject.number) {
          // alert(
          //   `${newName}'s Phone Number will be updated to ${newPersonObject.number}`
          // );
          phonebookService
            .update(persons[key].id, newPersonObject)
            .then((responseData) => {
              setPersons(
                persons
                  .filter((p) => p.id !== persons[key].id)
                  .concat(newPersonObject)
              );
              setSuccessMessage(`${newPersonObject.name} updated`);
              setTimeout(() => setSuccessMessage(null), 5000);
            })
            .catch((err) => {
              setErrorMessage(
                `Note is not saved to the server '${newPersonObject.name}' was already removed from the server`
              );
            });
          setTimeout(() => setErrorMessage(null), 5000);
          setErrorMessage(null);
        }
        setNewName("");
        setNewNumber("");

        return;
      }
    }

    phonebookService
      .create(newPersonObject)
      .then((responseData) => setPersons(persons.concat(responseData)));

    setNewName("");
    setNewNumber("");
    setSuccessMessage(`Added ${newPersonObject.name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const deleteContact = (contactObj) => {
    if (window.confirm(`Delete ${contactObj.name} ?`)) {
      phonebookService.deleteContact(contactObj.id);
      setSuccessMessage(`${contactObj.name} deleted`);
      setTimeout(() => setSuccessMessage(null), 5000);
      setPersons(persons.filter((person) => person.id !== contactObj.id));
    }
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
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

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
      <Persons
        keyword={keyword}
        persons={persons}
        deleteContact={deleteContact}
      />

      <Footer />
      <Countries />
    </>
  );
}

export default App;
