import "./Input.css";

const Input = ({ value, onChange }) => {
  return (
    <div className="input-wrapper">
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
