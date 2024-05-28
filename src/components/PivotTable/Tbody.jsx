import { Box } from "../../utils/Box";
import { unique } from "../../utils/unique";
import { sort } from "../../utils/sort";
import GT from "./body/GT";
import TableRow from "./body/TableRow";

const Tbody = ({ rows, values, data }) => {
  return (
    <tbody>
      {rows.map((row, i) => {
        // if there are more than one row specified, skip all remaining rows so they can be
        // nested inside the parent row
        if (i > 0) {
          return;
        }
        // get all unique records for the first row
        const filtered = Box(data)
          .map((x) => unique(x, row.label))
          .map((x) => sort(x, row.label))
          .map((x) =>
            x.filter((y) => {
              // only render rows that are in the inclusion list if there is on
              // this way the user can opt to see only the records that they want to see
              // and not any others
              if (row.inclusions) {
                return row.inclusions.includes(y[row.label]);
              } else {
                return y[row.label];
              }
            })
          )
          .fold((x) => x);

        return filtered.map((record, idx) => {
          return (
            <TableRow
              key={`tr-${idx}`}
              i={i}
              idx={idx}
              data={data}
              values={values}
              row={row}
              rows={rows}
              record={record}
            />
          );
        });
      })}
      <GT values={values} data={data} />
    </tbody>
  );
};

export default Tbody;
