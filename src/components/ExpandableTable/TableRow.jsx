import { useState } from "react";

export const TableRow = ({ item, columns, renderExpanderRow }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((old) => !old);

  const row = (
    <tr>
      <th>
        {item.isExpandable ? (
          <button onClick={handleToggle}>Toggle</button>
        ) : null}
      </th>
      {columns.map((col, i) => (
        <td key={`td-${i}`}>{col.renderCell(item)}</td>
      ))}
    </tr>
  );
  if (isExpanded) {
    return (
      <>
        {row}
        <tr>
          <td colSpan={columns.length + 1}>{renderExpanderRow?.(item)}</td>
        </tr>
      </>
    );
  }
  return row;
};
