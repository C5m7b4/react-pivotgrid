// import {useState} from 'react'
import { doesRowExist } from "../../../utils/arrayUtils";

const Rows = ({ rows, setRows }) => {
  const handleDrop = (e) => {
    e.target.classList.remove("dragging");
    const fieldType = e.dataTransfer.getData("fieldType");
    const newRow = {
      label: fieldType,
      direction: "asc",
    };

    const isExisting = doesRowExist(rows, "label", fieldType);
    if (isExisting.found) {
      const copy = rows.filter((r) => r.label != fieldType);
      const afterElement = getDragAfterElement(
        document.getElementById("filtered-rows"),
        e.clientY
      );

      if (afterElement) {
        const pos = rows.findIndex((r) => (r.label = afterElement.innerHTML));
        copy.splice(pos, 0, newRow);
        setRows(copy);
      }
    } else {
      const newRows = [...rows, newRow];
      setRows(newRows);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.style.border = "2px solid #009879";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData("fieldType", fieldType.label);
    e.target.style.border = "1px solid #009879";
    e.target.style.opacity = 0.8;
    e.target.classList.add("dragging");
  };

  const handleDragLeave = (e) => {
    e.target.style.border = null;
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll(".draggable-item:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };
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
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, r)}
            onDragLeave={(e) => handleDragLeave(e)}
            key={`row-${i}`}
            className="draggable-item"
          >
            {r.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Rows;
