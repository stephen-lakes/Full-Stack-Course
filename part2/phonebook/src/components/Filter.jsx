const Filter = ({ keyword, handleKeywordChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={keyword} onChange={handleKeywordChange} />
    </div>
  );
};

export default Filter;
