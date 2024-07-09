import { FunctionComponent, PropsWithChildren, WheelEvent } from "react";
import { usePositionContext } from "../../context/positionContext";
import { useDragging } from "../../hooks/useDragging";
import { DRAGGABLE_ITEM_ID } from "../../constants";

type Props = {
  zoom: number;
  onZoomWheel: (event: WheelEvent) => void;
};

export const Draggable: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  zoom,
  onZoomWheel,
}) => {
  const { elementPosition } = usePositionContext();

  const { dragStart, dragging, dragStop } = useDragging();

  const draggableStyles = {
    left: `${elementPosition.x}px`,
    top: `${elementPosition.y}px`,
    scale: `${zoom}`,
  };

  return (
    <div
      className="draggable-field"
      onPointerLeave={dragStop}
      onPointerUp={dragStop}
      onPointerMove={dragging}
      onWheel={onZoomWheel}
    >
      <div
        className="draggable-item"
        id={DRAGGABLE_ITEM_ID}
        onPointerDown={dragStart}
        style={draggableStyles}
      >
        {children}
      </div>
    </div>
  );
};
