import { useState } from "react";
import { Box } from "../../utils/Box";
import { unique } from "../../utils/unique";
import { sort } from "../../utils/sort";
import { grandTotalSum, grandTotalCount } from "../../utils/arrayUtils";
import HeaderContext from "./HeaderContext";
import AliasModal from "./modals/AliasModal";

const Pivot = ({ data, rows, values, setValues }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState("");
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [aliasValue, setAliasValue] = useState("");

  const handleAliasClick = (c) => {
    console.log(c);
    setShowAliasModal(true);
  };

  const hideAliasModal = () => {
    setShowAliasModal(false);
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

  return (
    <>
      {showContextMenu ? (
        <HeaderContext
          top={points.y}
          left={points.x}
          column={column}
          handleAliasClick={handleAliasClick}
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
      <table
        onClick={() => {
          setShowContextMenu(false);
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
                {r}
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
