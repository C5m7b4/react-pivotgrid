import { TableRow } from "./TableRow";

const ExpandableTable = ({ columns, items, renderExpanderRow }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {columns.map((col, i) => (
            <th key={`th-${i}`}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <TableRow
            key={i}
            item={item}
            columns={columns}
            renderExpanderRow={renderExpanderRow}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ExpandableTable;
