import Values from "./Values";

const Configurator = ({ data, rows, filters, columns, values, setValues }) => {
  return (
    <div className="configurator">
      <h3 style={{ margin: "10px 12px" }}>PivotTable Fields</h3>
      <div>
        <div className="search-input">
          <input type="text" placeholder="search" />
        </div>
        <div className="fields-container" id="fields-container">
          {Object.keys(data[0]).map((r, i) => (
            <div key={`field-${i}`}>
              <input type="checkbox" />
              <label>{r}</label>
            </div>
          ))}
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
              <div>Rows</div>
              <div className="filters-container" id="filtered-rows">
                {rows.map((r, i) => (
                  <div key={`row-${i}`}>{r}</div>
                ))}
              </div>
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
