const NormalTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, i) => (
            <td key={`thead-${i}`}>{key}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={`tbody - tr - ${i}}`}>
            {Object.values(r).map((v, idx) => (
              <td key={`td-${idx}`}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NormalTable;
