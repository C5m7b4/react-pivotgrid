import { useRef } from "react";
import PanelHeader from "./PanelHeader";
import { createPortal } from "react-dom";
import Resizer from "./Resizer";
import { Direction } from "./Direction";
import "./Panel.css";

const Panel = ({ isOpen, children, parent = document.body }) => {
  const panelRef = useRef(null);

  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (direction, movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;
      case Direction.Top:
        resizeTop();
        break;
      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;
      case Direction.Right:
        resizeRight();
        break;
      case Direction.Bottom:
        resizeBottom();
        break;
      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;
      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;
      case Direction.Left:
        resizeLeft();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <>
              <div className="portal-panel" ref={panelRef}>
                <Resizer onResize={handleResize} />
                <PanelHeader onDrag={handleDrag} />
                <div className="panel__content">{children}</div>
              </div>
            </>,
            parent
          )
        : null}
    </>
  );
};

export default Panel;
