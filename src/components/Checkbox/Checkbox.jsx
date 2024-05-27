import "./Checkbox.css";

const Checkbox = ({ label, checked }) => {
  return (
    <label className="check-container">
      {label}
      <input type="checkbox" checked={checked} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
