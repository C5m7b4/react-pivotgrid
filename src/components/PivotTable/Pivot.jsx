import { Box } from "../../utils/Box";
import { unique } from "../../utils/unique";
import { sort } from "../../utils/sort";
import { grandTotalSum, grandTotalCount } from "../../utils/arrayUtils";

const Pivot = ({ data, rows, values }) => {
  return (
    <table>
      <thead>
        <tr>
          {rows.map((r, i) => (
            <th key={`th-${i}`}>{r}</th>
          ))}
          {values.map((v, idx) => (
            <th key={`th-v-${idx}`}>
              {v.alias ? v.alias : `${v.aggregator} of ${v.label}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((rowDescription, i) => {
          const filteredData = Box(data)
            .map((x) => unique(x, rowDescription))
            .map((x) => sort(x, rowDescription))
            .fold((x) => x);
          return filteredData.map((record, idx) => {
            return (
              <tr key={`tr-td-${i}-${idx}`}>
                {Object.keys(record).map((k, index) => {
                  if (k === rowDescription) {
                    return <td key={`fd-r-${idx}-${index}`}>{record[k]}</td>;
                  }
                })}
                {values.map((v, index) => {
                  const sumOfCell = v.fn(
                    data,
                    rowDescription,
                    record[rowDescription],
                    v.label
                  );
                  return (
                    <td key={`tr-td-${i}-${idx}-${index}`}>
                      {v.formatter ? v.formatter(sumOfCell) : sumOfCell}
                    </td>
                  );
                })}
              </tr>
            );
          });
        })}
        <tr>
          <td>Grand Total</td>
          {values.map((v, index) => {
            let total = 0;
            switch (v.aggregator) {
              case "Count":
                total = grandTotalCount(data);
                break;
              case "Sum":
                total = grandTotalSum(data, v.label);
                break;
              default:
                total = grandTotalSum(data, v.label);
                break;
            }
            return <td key={`gt-${index}`}>{total}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Pivot;
