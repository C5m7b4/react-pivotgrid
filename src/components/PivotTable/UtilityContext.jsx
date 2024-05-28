import { useState, useEffect } from "react";
import Input from "../Input/Input";
import { Box } from "../../utils/Box";
import { unique } from "../../utils/unique";
import { sort } from "../../utils/sort";
import "./HeaderContext.css";
import Button from "../Button/Button";

const UtilityContext = ({ top, left, column, rows, data, hide }) => {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [inclusions, setInclusions] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    resetFilteredRows();
  }, []);

  useEffect(() => {}, [inclusions, reset]);

  const resetFilteredRows = () => {
    const filtered = Box(data)
      .map((x) => unique(x, column.label))
      .map((x) => sort(x, column.label))
      .fold((x) => x);
    setFilteredRows(filtered);
  };

  const style = {
    border: "1px solid black",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)",
    padding: "8px 13px",
  };

  const onChange = (e) => {
    if (e.target.value.length === 0) {
      resetFilteredRows();
      return;
    }
    const newlyFilteredRows = filteredRows.filter(
      (r) => r[column.label] == e.target.value
    );
    setFilteredRows(newlyFilteredRows);
  };

  const handleSelect = (e, c) => {
    if (c == "all") {
      setInclusions([]);
      column.inclusions = [];
    } else {
      if (e.target.checked) {
        if (!inclusions.includes(c)) {
          inclusions.push(c);
          setReset(!reset);
          column.inclusions = inclusions;
        }
      } else if (!e.target.checked) {
        if (inclusions.includes(c)) {
          const pos = inclusions.findIndex((r) => r === c);
          const inclusionsCopy = [...inclusions];
          inclusionsCopy.splice(pos, 1);
          column.inclusions = inclusionsCopy;
          setInclusions(inclusionsCopy);
          setReset(!reset);
        }
      }
    }
  };

  return (
    <div style={style}>
      <div className="header-element">Sort from Largest to Smallest</div>
      <div className="header-element">Sort from Smallest to Largest</div>
      <div>
        <label>Search</label>
        <Input onChange={onChange} />
      </div>
      <div className="field-list-utility">
        <div>
          <input
            type="checkbox"
            checked={inclusions.length === 0}
            onChange={(e) => handleSelect(e, "all")}
          />
          <label>Select All</label>
        </div>
        {filteredRows.map((r, i) => {
          return (
            <div key={`r-u-${i}`}>
              <input
                type="checkbox"
                checked={inclusions.includes(r[column.label])}
                onChange={(e) => handleSelect(e, r[column.label])}
              />
              <label>{r[column.label]}</label>
            </div>
          );
        })}
      </div>
      <div className="utility-buttons">
        <Button label="OK" onClick={hide} />
      </div>
    </div>
  );
};

export default UtilityContext;
