const Button = ({ type, label, onClick }) => {
  let bgColor = "#0d6efd";

  switch (type) {
    case "normal":
      bgColor = "#0d6efd";
      break;
    case "danger":
      bgColor = "#dc3545";
      break;
    case "warning":
      bgColor = "#ffc107";
      break;
    case "info":
      bgColor = "#0dcaf0";
      break;
    default:
      bgColor = "#0d6efd";
      break;
  }

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: bgColor,
    borderRadius: "8px",
    dropShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
    border: "none",
    outline: "none",
    marginRight: "5px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
