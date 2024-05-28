import { useState } from "react";

import HeaderContext from "./HeaderContext";
import UtilityContext from "./UtilityContext";
import AliasModal from "./modals/AliasModal";
import FormatterModal from "./modals/FormatterModal";
import { formatCurrency } from "../../utils/formatters";
import Thead from "./Thead";
import Tbody from "./Tbody";

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
        <Thead
          rows={rows}
          setShowContextMenu={setShowContextMenu}
          handleSortDirection={handleSortDirection}
          values={values}
          handleContextMenu={handleContextMenu}
        />
        <Tbody rows={rows} data={data} values={values} />
      </table>
    </>
  );
};

export default Pivot;
