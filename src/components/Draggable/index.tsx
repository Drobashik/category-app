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
  return (
    <div
      className="draggable-field"
      onMouseLeave={onStopMoving}
      onMouseUp={onStopMoving}
      onMouseMove={onMoving}
    >
      <div
        className="draggable-item"
        onMouseDown={onStartMove}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
