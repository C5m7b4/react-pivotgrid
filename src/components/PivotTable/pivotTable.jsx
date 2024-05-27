import { useState, useEffect } from "react";
import NormalTable from "./NormalTable";
import Pivot from "./Pivot";
import Configurator from "./Configurator";
import { data } from "../../data";
import { arrAvg, arrCount, arrSum } from "../../utils/arrayUtils";
import { formatCurrency } from "../../utils/formatters";
import "./pivotTable.css";

const PivotTable = () => {
  const [usedField, setUsedfield] = useState([]);
  // const [rows, setRows] = useState(["Customer"]);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  // const [values, setValues] = useState([
  //   {
  //     label: "Rev",
  //     fn: arrSum,
  //     aggregator: "Sum",
  //     alias: "Revenue",
  //     formatter: formatCurrency,
  //   },
  //   { label: "Order ID", fn: arrCount, aggregator: "Count" },
  // ]);
  const [usePivot, setUsePivot] = useState(true);

  useEffect(() => {}, []);
  return (
    <div>
      <h3>Pivot Table Example</h3>

      <div style={{ marginBottom: "10px" }}>
        <div>Total Records: {data.length}</div>
        <div>Total Columns: {Object.keys(data[0]).length}</div>
      </div>

      <div>
        <button
          id="btnPivot"
          onClick={() => {
            setUsePivot(!usePivot);
          }}
        >
          {usePivot ? "UnPivot" : "Pivot"}
        </button>
        <button id="arrsum">ArrSum</button>
      </div>

      <div className="table-container">
        {usePivot ? (
          <Pivot
            data={data}
            rows={rows}
            values={values}
            setValues={setValues}
          />
        ) : (
          <NormalTable data={data} />
        )}
        {usePivot ? (
          <Configurator
            data={data}
            rows={rows}
            setRows={setRows}
            filters={filters}
            columns={columns}
            values={values}
            setValues={setValues}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PivotTable;
