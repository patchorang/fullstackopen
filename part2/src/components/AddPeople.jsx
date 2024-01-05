const AddPeople = ({
  handleAddPerson,
  handleNameChange,
  handleNumberChange,
  newNumber,
  newName,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        phone number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPeople;
