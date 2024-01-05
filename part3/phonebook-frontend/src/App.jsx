import personService from "./services/persons";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddPeople from "./components/AddPeople";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    const newPerson = { name: newName, number: newNumber };
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to update their number?`
        )
      ) {
        personService
          .update(newPerson, existingPerson.id)
          .then((updatedPerson) =>
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? updatedPerson : p
              )
            )
          )
          .catch(() => showErrorMessage("This person no longer exists"));
      }
    } else {
      personService.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
        showSuccessMessage("Person created");
      });
    }
    setNewName("");
    setNewNumber("");
    setSearch("");
  };

  const handleRemovePersonWithId = (id) => {
    console.log(id);
    if (window.confirm("are you sure you want to delete this person?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const peopleToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Search handleSearchChange={handleSearchChange} value={search} />
      <AddPeople
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <div key={person.name}>
          {person.name} - {person.number}
          <button onClick={() => handleRemovePersonWithId(person.id)}>
            remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
