import "./HeaderContext.css";

const HeaderContext = ({ top, left, column, handleAliasClick }) => {
  const style = {
    border: "1px solid black",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={style}>
      <div style={{ minHeight: "5px" }}>&nbsp;</div>
      <div className="header-element" onClick={() => handleAliasClick(column)}>
        Create alias
      </div>
      <div className="header-element">Add Formatter</div>
    </div>
  );
};

export default HeaderContext;
