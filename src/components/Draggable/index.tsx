import { FunctionComponent, PropsWithChildren } from "react";
import { usePositionContext } from "../../context/positionContext";
import { useDragging } from "../../hooks/useDragging";
import { useZoom } from "../../hooks/useZoom";

export const Draggable: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { elementPosition } = usePositionContext();

  const { zoom, changeZoom } = useZoom();

  const { dragStart, dragging, dragStop } = useDragging();

  const positionStyle = {
    left: `${elementPosition.x}px`,
    top: `${elementPosition.y}px`,
  };

  return (
    <div
      className="draggable-field"
      onPointerLeave={dragStop}
      onPointerUp={dragStop}
      onPointerMove={dragging}
      onWheel={changeZoom}
    >
      <div
        className="draggable-item"
        onPointerDown={dragStart}
        style={{ ...positionStyle, transform: `scale(${zoom})` }}
      >
        {children}
      </div>
    </div>
  );
};
