const Search = ({ handleSearchChange, search }) => {
  return (
    <div>
      Search: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default Search;
