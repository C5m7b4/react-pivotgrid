import {
  aggregateOptions,
  arrAvg,
  arrCount,
  arrSum,
} from "../../utils/arrayUtils";

const Values = ({ values, setValues }) => {
  const handleSelectChange = (label, e) => {
    const selectedAggregate = values.filter((v) => v.label === label)[0];
    const index = values.findIndex((v) => v.label === label);
    let currentFn = arrSum;
    let currentDescription = "Sum";
    switch (e.target.value) {
      case "Count":
        currentFn = arrCount;
        currentDescription = "Count";
        break;
      case "Sum":
        currentFn = arrSum;
        currentDescription = "Sum";
        break;
      case "Avg":
        currentFn = arrAvg;
        currentDescription = "Avg";
        break;
      default:
        currentFn = arrSum;
        break;
    }
    const newValue = {
      ...selectedAggregate,
      aggregator: currentDescription,
      fn: currentFn,
    };
    let newValues = [...values];
    newValues.splice(index, 1, newValue);
    setValues(newValues);
  };
  return (
    <>
      <div>Values</div>
      <div className="filters-container" id="filter-values">
        {values.map((v, i) => (
          <div
            key={`value-${i}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <span>{v.label}</span>
            <span>
              <select
                value={v.aggregator}
                onChange={(e) => handleSelectChange(v.label, e)}
              >
                {aggregateOptions.map((o, i) => {
                  return (
                    <option key={`option-${i}`} value={o.label}>
                      {o.label}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Values;
