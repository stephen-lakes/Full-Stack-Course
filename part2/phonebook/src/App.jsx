import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", notes.length, "notes");

  return (
    <>
      <Note notes={notes} />
    </>
  );
}

export default App;
