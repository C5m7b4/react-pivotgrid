import { useState, useEffect } from "react";

const Fields = ({ data, rows, values }) => {
  const [usedFields, setUsedFields] = useState([]);

  useEffect(() => {
    const valueFields = values.map((v) => v.label);
    setUsedFields([...rows, ...valueFields]);
  }, [rows, values]);

  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData("fieldType", fieldType);
    e.dataTransfer.effectAllowed = "copyMove";
    e.target.style.border = "1px solid #009879";
    e.target.style.opacity = 0.8;
  };

  const handleCheck = () => {};

  return (
    <>
      {Object.keys(data[0]).map((r, i) => (
        <div
          className="draggable-item"
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
          <label className="draggable-item">{r}</label>
        </div>
      ))}
    </>
  );
};

export default Fields;
