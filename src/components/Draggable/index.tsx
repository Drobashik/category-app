import {
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  WheelEvent,
} from "react";

type Props = {
  zoom: number;
  position: { x: number; y: number };
  onStartMove: (event: MouseEvent) => void;
  onMoving: (event: MouseEvent) => void;
  onStopMoving: (event: MouseEvent) => void;
  onZoom: (event: WheelEvent) => void;
};

export const Draggable: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  zoom,
  position,
  onStartMove,
  onMoving,
  onStopMoving,
  onZoom,
}) => {
  const positionStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div
      className="draggable-field"
      onPointerLeave={onStopMoving}
      onPointerUp={onStopMoving}
      onPointerMove={onMoving}
      onWheel={onZoom}
    >
      <div
        className="draggable-item"
        onPointerDown={onStartMove}
        style={{ ...positionStyle, transform: `scale(${zoom})` }}
      >
        {children}
      </div>
    </div>
  );
};
