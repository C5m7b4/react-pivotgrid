const Rows = ({ rows, setRows }) => {
  const handleDrop = (e) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    const newRow = {
      label: fieldType,
      direction: "asc",
    };
    const newRows = [...rows, newRow];
    setRows(newRows);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};
  return (
    <>
      <div>Rows</div>
      <div
        className="filters-container"
        id="filtered-rows"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {rows.map((r, i) => (
          <div key={`row-${i}`}>{r.label}</div>
        ))}
      </div>
    </>
  );
};

export default Rows;
