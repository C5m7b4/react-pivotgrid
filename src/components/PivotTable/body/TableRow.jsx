import { useState, useEffect } from "react";
import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";
// import { sort } from "../../../utils/sort";

const TableRow = ({ i, idx, record, values, data, row, rows }) => {
  const [expanded, setExpanded] = useState(true);
  const [subrows, setSubrows] = useState([]);

  useEffect(() => {
    getSubrows(row.label, record[row.label], rows[i + 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const getSubrows = (field, value, subvalue) => {
    if (!subvalue) return [];
    const subkey = subvalue.label;
    const result = Box(data)
      .map((x) => x.filter((y) => y[field] == value))
      .map((x) => unique(x, subkey))
      .fold((x) => x);
    setSubrows(result);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  const getSubValuesSum = (key1, value1, key2, value2, aggregateKey) => {
    const result = Box(data)
      .map((x) => x.filter((y) => y[key1] == value1))
      .map((x) => x.filter((y) => y[key2] == value2))
      .map((x) =>
        x.reduce((acc, cur) => {
          return acc + cur[aggregateKey];
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  const getSubValueCount = (key1, value1, key2, value2) => {
    const result = Box(data)
      .map((x) => x.filter((y) => y[key1] == value1))
      .map((x) => x.filter((y) => y[key2] == value2))
      .map((x) =>
        x.reduce((acc) => {
          return acc + 1;
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  return (
    // find out if there are any subrows for this row
    <>
      <tr key={`tr-td-${i}-${idx}`}>
        {subrows.length > 0 ? (
          <td className="sub-row-indicator" onClick={toggle}>
            <ion-icon name="add-circle-outline"></ion-icon>
          </td>
        ) : (
          <td></td>
        )}
        {Object.keys(record).map((k, index) => {
          if (k === row.label) {
            return <td key={`fd-r-${idx}-${index}`}>{record[k]}</td>;
          }
        })}

        {/* render out all value filter fields */}
        {values.map((v, index) => {
          const sumOfCell = v.fn(data, row.label, record[row.label], v.label);
          return (
            <td key={`tr-td-${i}-${idx}-${index}`}>
              {v.formatter ? v.formatter(sumOfCell) : sumOfCell}
            </td>
          );
        })}
      </tr>
      {expanded &&
        subrows.map((sr, index) => {
          return (
            <tr key={`sr-${i}-${idx}-${index}`}>
              <td></td>
              {Object.keys(sr).map((k, index) => {
                if (k === rows[i + 1]?.label) {
                  return (
                    <td key={`sr-r-${idx}-${index}`}>
                      {`${sr[k]} - ${sr["Order ID"]}`}
                    </td>
                  );
                }
              })}
              {values.map((v, idx2) => {
                let sum = 0;
                if (v.aggregator == "Sum") {
                  sum = getSubValuesSum(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1].label,
                    sr[rows[1].label],
                    v.label
                  );
                } else if (v.aggregator == "Count") {
                  sum = getSubValueCount(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1].label,
                    sr[rows[1].label]
                  );
                }

                return (
                  <td key={`sr-v-${i}-${idx}-${idx2}`}>
                    {v.formatter ? v.formatter(sum) : sum}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};

export default TableRow;
