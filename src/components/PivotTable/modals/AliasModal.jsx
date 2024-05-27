import ReactDOM from "react-dom";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./AliasModal.css";

const AliasModal = ({
  isShowing,
  hide,
  title,
  column,
  value,
  onChange,
  confirm,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-alias">
              <div className="modal-header">
                <span className="modal-header-title">{title}</span>
                <span className="modal-header-close-box">
                  <button
                    type="button"
                    className="modal-header-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </span>
              </div>
              <div className="modal-body">
                <div>
                  <p>Set an alias for {column}</p>
                  <Input value={value} onChange={onChange} />
                </div>
                <div className="modal-buttons">
                  <Button label="Cancel" type="warning" onClick={hide} />
                  <Button label="OK" type="normal" onClick={confirm} />
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default AliasModal;
