import { useState, useEffect } from "react";

const Fields = ({ data, rows, values }) => {
  const [usedFields, setUsedFields] = useState([]);

  useEffect(() => {
    const valueFields = values.map((v) => v.label);
    setUsedFields([...rows, ...valueFields]);
  }, [rows, values]);
  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData("fieldType", fieldType);
  };

  const handleCheck = () => {};

  return (
    <>
      {Object.keys(data[0]).map((r, i) => (
        <div
          key={`field-${i}`}
          draggable
          onDragStart={(e) => handleDragStart(e, r)}
        >
          <input
            type="checkbox"
            style={{ backgroundColor: "#009879" }}
            checked={usedFields.includes(r) ? "checked" : ""}
            onChange={handleCheck}
          />
          <label>{r}</label>
        </div>
      ))}
    </>
  );
};

export default Fields;
