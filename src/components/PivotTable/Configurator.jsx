import Values from "./dropTargets/Values";
import Fields from "./dropTargets/Fields";
import Rows from "./dropTargets/Rows";

const Configurator = ({ data, rows, setRows, values, setValues }) => {
  return (
    <div className="configurator">
      <h3 style={{ margin: "10px 12px" }}>PivotTable Fields</h3>
      <div>
        <div className="search-input">
          <input type="text" placeholder="search" />
        </div>
        <div className="fields-container" id="fields-container">
          <Fields data={data} rows={rows} values={values} />
        </div>
        <div style={{ margin: "10px 12px" }}>
          <div style={{ margin: "10px 12px" }}>
            Drag fields between areas below:
          </div>
          <div className="configuration-columns">
            <div
              style={{
                borderRight: "1px solid black",
                paddingRight: "10px",
              }}
            >
              <div>Filters</div>
              <div className="filters-container"></div>
              <Rows rows={rows} setRows={setRows} />
            </div>
            <div
              style={{
                borderRight: "1px solid black",
                paddingRight: "10px",
              }}
            >
              <div>Columns</div>
              <div className="filters-container"></div>
              <Values values={values} setValues={setValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
