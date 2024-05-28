const Thead = ({
  rows,
  setShowContextMenu,
  handleSortDirection,
  values,
  handleContextMenu,
}) => {
  return (
    <thead>
      <tr>
        <th style={{ width: "25px" }}></th>
        {rows.map((r, i) => {
          if (i > 0) {
            // only print out the first row becuase everything else will be nested
            return;
          }
          return (
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
          );
        })}
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
  );
};

export default Thead;
