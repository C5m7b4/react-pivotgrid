import { useState } from "react";
import { Box } from "../../utils/Box";
import { unique } from "../../utils/unique";
import { sort } from "../../utils/sort";
import { grandTotalSum, grandTotalCount } from "../../utils/arrayUtils";
import HeaderContext from "./HeaderContext";
import UtilityContext from "./UtilityContext";
import AliasModal from "./modals/AliasModal";
import FormatterModal from "./modals/FormatterModal";
import { formatCurrency } from "../../utils/formatters";

const Pivot = ({ data, rows, setRows, values, setValues }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showUtilityContext, setShowUtilityContext] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState("");
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [showFormatterModal, setShowFormatterModal] = useState(false);
  const [aliasValue, setAliasValue] = useState("");
  const [formatterValue, setFormatterValue] = useState("");

  const handleAliasClick = () => {
    setShowAliasModal(true);
    setShowContextMenu(false);
  };

  const handleFormatterClick = () => {
    setShowFormatterModal(true);
    setShowContextMenu(false);
  };

  const hideAliasModal = () => {
    setShowAliasModal(false);
  };

  const hideFormatterModal = () => {
    setShowFormatterModal(false);
  };

  const handleContextMenu = (e, c) => {
    e.preventDefault();
    setPoints({ x: e.pageX, y: e.pageY });
    setColumn(c);
    setShowContextMenu(true);
  };

  const handleAliasChange = (e) => {
    setAliasValue(e.target.value);
  };

  const handleFormatterChange = (e) => {
    setFormatterValue(e.target.value);
  };

  const handleAliasConfirm = () => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const pos = values.findIndex((v) => v.label === column);
    const newValues = [...values];
    newValues.splice(pos, 2, { ...selectedValue, alias: aliasValue });
    setValues(newValues);
    setShowContextMenu(false);
    setShowAliasModal(false);
    setColumn("");
    setAliasValue("");
  };

  const handleFormatterConfirm = () => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const pos = values.findIndex((v) => v.label === column);
    const newValues = [...values];
    let formatter = formatCurrency;
    // *************************
    // put switch statement here to add more formatters
    switch (formatterValue) {
      case "Currency":
        formatter = formatCurrency;
        break;
      default:
        formatter = formatCurrency;
        break;
    }
    newValues.splice(pos, 2, { ...selectedValue, formatter: formatter });
    setValues(newValues);
    setShowContextMenu(false);
    setShowFormatterModal(false);
    setColumn("");
    setFormatterValue("");
  };

  const handleSortDirection = (e, c) => {
    const selectedRow = rows.filter((r) => r.label === c.label)[0];
    const pos = rows.findIndex((r) => r.label === c.label);
    const newRow = {
      ...selectedRow,
      direction: selectedRow.direction === "asc" ? "desc" : "asc",
    };
    const newRows = [...rows];
    newRows.splice(pos, 2, newRow);
    setRows(newRows);
    setPoints({ x: e.pageX, y: e.pageY });
    setColumn(c);
    setShowUtilityContext(true);
  };

  return (
    <>
      {showContextMenu ? (
        <HeaderContext
          top={points.y}
          left={points.x}
          column={column}
          handleAliasClick={handleAliasClick}
          handleFormatterClick={handleFormatterClick}
        />
      ) : null}
      {showUtilityContext ? (
        <UtilityContext
          top={points.y}
          left={points.x}
          column={column}
          rows={rows}
          data={data}
          hide={() => setShowUtilityContext(false)}
        />
      ) : null}
      {showAliasModal ? (
        <AliasModal
          isShowing={showAliasModal}
          hide={hideAliasModal}
          title={"Set Alias"}
          column={column}
          value={aliasValue}
          onChange={handleAliasChange}
          confirm={handleAliasConfirm}
        />
      ) : null}
      {showFormatterModal ? (
        <FormatterModal
          isShowing={showFormatterModal}
          hide={hideFormatterModal}
          title={"Set Formatter"}
          column={column}
          onChange={handleFormatterChange}
          confirm={handleFormatterConfirm}
        />
      ) : null}
      <table
        onClick={() => {
          setShowContextMenu(false);
          // setShowUtilityContext(false);
        }}
      >
        <thead>
          <tr>
            {rows.map((r, i) => (
              <th
                key={`th-${i}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowContextMenu(false);
                }}
              >
                <span> {r.label}</span>
                <span onClick={(e) => handleSortDirection(e, r)}>
                  {r.direction == "asc" ? (
                    <ion-icon name="arrow-round-down"></ion-icon>
                  ) : (
                    <ion-icon name="arrow-round-up"></ion-icon>
                  )}
                </span>
              </th>
            ))}
            {values.map((v, idx) => (
              <th
                key={`th-v-${idx}`}
                onContextMenu={(e) => {
                  handleContextMenu(e, v.label);
                }}
              >
                {v.alias ? v.alias : `${v.aggregator} of ${v.label}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            console.log("rendering rows");
            const filtered = Box(data)
              .map((x) => unique(x, row.label))
              .map((x) => sort(x, row.label))
              .map((x) =>
                x.filter((y) => {
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
                <tr key={`tr-td-${i}-${idx}`}>
                  {Object.keys(record).map((k, index) => {
                    if (k === row.label) {
                      return <td key={`fd-r-${idx}-${index}`}>{record[k]}</td>;
                    }
                  })}
                  {values.map((v, index) => {
                    const sumOfCell = v.fn(
                      data,
                      row.label,
                      record[row.label],
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
          <tr style={{ borderTop: "2px solid black" }}>
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
              return (
                <td key={`gt-${index}`} style={{ fontWeight: "bold" }}>
                  {total}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Pivot;
