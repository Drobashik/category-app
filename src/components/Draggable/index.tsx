import { FunctionComponent, MouseEvent, PropsWithChildren } from "react";

type Props = {
  position: { x: number; y: number };
  onStartMove: (event: MouseEvent) => void;
  onMoving: (event: MouseEvent) => void;
  onStopMoving: (event: MouseEvent) => void;
};

export const Draggable: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  position,
  onStartMove,
  onMoving,
  onStopMoving,
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
    >
      <div
        className="draggable-item"
        onPointerDown={onStartMove}
        style={positionStyle}
      >
        {children}
      </div>
    </div>
  );
};
